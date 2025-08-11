import { useEffect, useState } from "react";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import * as announcementService from "@/services/announcementService.js";
import Message from "./Message.jsx";
import Animated, { LinearTransition } from "react-native-reanimated";
import If from "@/components/general-utility-components/If.jsx";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";


// retrieves and shows list of announcements and shift requests
export default function AnnouncementsList({ isFocused=true }) {
	
	const [announcements, setAnnouncements] = useState([]); // from newest to oldest
	const [isLoading, setIsLoading] = useState(false);
	
	
	useEffect(() => {
		if(!isFocused) return;
		setAnnouncements([]);
		loadAnnouncements();
	}, [isFocused]);
	
	
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
	
	
	return (
		<View style={{ width: "90%", marginHorizontal: "auto" }}>
			<Animated.FlatList
				data={announcements}
				keyExtractor={announcement => announcement.messageId}
				renderItem={({ item: announcement, index }) => {
					const disconnectedFromAboveMessage = index === announcements.length - 1
						|| announcement.userId !== announcements[index + 1].userId
						|| announcement.timeSent - announcements[index + 1].timeSent > 1000 * 2
					return (
						<>
							<Message
								message={ announcement }
								withNameAndTime={disconnectedFromAboveMessage}
								inverted
							/>
							<If condition={disconnectedFromAboveMessage}>
								<Gap size={15}/>
							</If>
						</>
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
					<Gap size={150}/>
				)}
				ItemSeparatorComponent={<Gap size={5}/>}
				itemLayoutAnimation={LinearTransition}
			/>
		</View>
	);
	
}