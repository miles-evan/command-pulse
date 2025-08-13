import { useEffect, useState } from "react";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import * as announcementService from "@/services/announcementService.js";
import Message from "./Message.jsx";
import Animated, { LinearTransition } from "react-native-reanimated";
import If from "@/components/general-utility-components/If.jsx";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import LinearAnimatedView from "@/components/general-utility-components/LinearAnimatedView.jsx";
import * as shiftService from "@/services/shiftService.js";
import ShiftRequestCard from "@/components/announcements-and-messaging/ShiftRequestCard.jsx";


// retrieves and shows list of announcements and shift requests
export default function AnnouncementsList({ isFocused=true, sendMessageRef, style }) {
	
	// from newest to oldest
	let [announcements, setAnnouncements] = useState([]);
	let [shiftRequests, setShiftRequests] = useState([]);
	let [mergedBoard, setMergedBoard] = useState([]); // announcements and shift requests
	
	const [isLoading, setIsLoading] = useState(false);
	sendMessageRef.current = sendMessage;
	const globalState = useGlobalState();
	
	
	
	useEffect(() => {
		if(!isFocused) return;
		
		// doesn't actually change state, but makes it so when it fetches, it doesn't append
		announcements = [];
		shiftRequests = [];
		mergedBoard = [];
		
		loadAnnouncements();
	}, [isFocused]);
	
	
	async function loadAnnouncements() {
		try {
			if(isLoading) return;
			setIsLoading(true);
			
			const startDate = mergedBoard.length === 0? new Date() : mergedBoard[mergedBoard.length - 1].timeSent;
			
			let response = await announcementService.get(startDate, 0, 15);
			const { announcements: newAnnouncements } = response.body;
			setAnnouncements([...announcements, ...newAnnouncements]); // using stale value on purpose (so no duplicates)
			
			const endDate = newAnnouncements.length === 0?
				new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 7)
				: newAnnouncements[newAnnouncements.length - 1].timeSent;
			response = await shiftService.getShiftRequests(endDate, startDate); // dates swapped because we're fetching in reverse
			const { shiftRequests: newShiftRequests } = response.body;
			setShiftRequests([...shiftRequests, ...newShiftRequests]); // using stale value on purpose (so no duplicates)
			
			const newMerged = [...newAnnouncements, ...newShiftRequests].sort((a, b) => b.timeSent - a.timeSent);
			
			setMergedBoard([...mergedBoard, ...newMerged]) // using stale values on purpose (so no duplicates)
			setIsLoading(false);
		} catch(e) {
			console.log(e);
		}
	}
	
	
	async function sendMessage(message) {
		const { messageId } = (await announcementService.send(message)).body;
		const messageObj = {
			messageId,
			userId: globalState.userId,
			firstName: globalState.firstName,
			lastName: globalState.lastName,
			timeSent: new Date(),
			message,
			numLikes: 0,
		};
		setAnnouncements(prev => [messageObj, ...prev]);
		setMergedBoard(prev => [messageObj, ...prev]);
	}
	
	
	return (
		<View style={style}>
			<Animated.FlatList
				data={mergedBoard}
				keyExtractor={boardItem => boardItem.messageId ?? boardItem.shiftRequestId}
				renderItem={({ item: boardItem, index }) => {
					const disconnectedFromAboveMessage =
						"shiftRequestId" in boardItem
						|| index === mergedBoard.length - 1
						|| "shiftRequestId" in mergedBoard[index + 1]
						|| boardItem.userId !== mergedBoard[index + 1].userId
						|| boardItem.timeSent - mergedBoard[index + 1].timeSent > 1000 * 60 * 2;
					
					return (
						<View>
							<If condition={disconnectedFromAboveMessage}>
								<Gap size={15}/>
							</If>
							{"messageId" in boardItem? (
								<Message
									message={boardItem}
									withNameAndTime={disconnectedFromAboveMessage}
								/>
							) : (
								<ShiftRequestCard shiftRequest={boardItem}/>
							)}
						</View>
					);
				}}
				keyboardDismissMode="on-drag"
				inverted
				onEndReached={() => {
					if(mergedBoard.length > 0)
						loadAnnouncements();
				}}
				onEndReachedThreshold={0.5}
				ListFooterComponent={() => (
					<LoadingText invisible={!isLoading}/>
				)}
				ListHeaderComponent={() => (
					<Gap size={20}/>
				)}
				ItemSeparatorComponent={<Gap size={5}/>}
				itemLayoutAnimation={LinearTransition}
			/>
		</View>
	);
	
}