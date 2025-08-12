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


// retrieves and shows list of announcements and shift requests
export default function AnnouncementsList({ isFocused=true, sendMessageRef, style }) {
	
	const [announcements, setAnnouncements] = useState([]); // from newest to oldest
	const [isLoading, setIsLoading] = useState(false);
	sendMessageRef.current = sendMessage;
	const [numNewMessages, setNumNewMessages] = useState(false);
	const globalState = useGlobalState();
	
	
	
	useEffect(() => {
		if(!isFocused) return;
		setAnnouncements([]);
		loadAnnouncements();
	}, [isFocused, numNewMessages]);
	
	
	function loadAnnouncements() {
		if(isLoading) return;
		
		// I know this is weird, but its necessary to sync a stale "prev" with fetched data
		setAnnouncements(prev => {
			setIsLoading(true);
			
			(async () => {
				let response = await announcementService.get(
					prev.length === 0? new Date() : prev[prev.length - 1].timeSent,
					0,
					15,
				);
				const { announcements: newAnnouncements } = response.body;
				setAnnouncements([...prev, ...newAnnouncements]);
				
				setIsLoading(false);
			})();
			
			return prev; // don't update announcements, this was just used to get the most up-to-date value (prev)
		});
	}
	
	
	async function sendMessage(message) {
		const messageId = await announcementService.send(message);
		const messageObj = {
			messageId,
			userId: globalState.userId,
			firstName: globalState.firstName,
			lastName: globalState.lastName,
			timeSent: new Date(),
			message,
			numLikes: 0,
		}
		setAnnouncements(prev => [messageObj, ...prev])
	}
	
	
	return (
		<View style={style}>
			<Animated.FlatList
				data={announcements}
				keyExtractor={announcement => announcement.messageId}
				renderItem={({ item: announcement, index }) => {
					const disconnectedFromAboveMessage = index === announcements.length - 1
						|| announcement.userId !== announcements[index + 1].userId
						|| announcement.timeSent - announcements[index + 1].timeSent > 1000 * 2
					return (
						<View>
							<Message
								message={ announcement }
								withNameAndTime={disconnectedFromAboveMessage}
							/>
							<If condition={disconnectedFromAboveMessage}>
								<Gap size={15}/>
							</If>
						</View>
					)
				}}
				keyboardDismissMode="on-drag"
				inverted
				onEndReached={() => {
					if(announcements.length > 0)
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