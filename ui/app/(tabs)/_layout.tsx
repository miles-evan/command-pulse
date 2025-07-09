import { Tabs } from "expo-router";
import React, { createContext } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import TabTitle from "@/components/TabTitle";
import CheckAuthentication from "@/components/CheckAuthentication";
import { GlobalStateContext } from "@/utils/GlobalStateContext";


const globalState = {};


export default function TabLayout() {
	
	return (
		<SafeAreaProvider>
			<GlobalStateContext.Provider value={globalState}>
				<CheckAuthentication>
					
					<Tabs
						initialRouteName="announcements/index"
						screenOptions={{
							headerShown: false,
							tabBarActiveTintColor: Colors.accent,
							tabBarInactiveTintColor: Colors.veryHard,
							tabBarStyle: {
								height: 100,
								paddingTop: 10,
								paddingBottom: 10,
								paddingLeft: 10,
								paddingRight: 10,
							},
						}}
					>
						
						<Tabs.Screen
							name="incident-reports/index"
							options={{
								title: "Incidents",
								tabBarIcon: ({ color, size }) => (
									<Ionicons name="document-outline" size={size+5} color={color} />
								),
								tabBarLabel: ({ color }) => (
									<TabTitle color={color}>Incidents</TabTitle>
								),
							}}
						/>
						
						<Tabs.Screen
							name="messaging/index"
							options={{
								title: "Messaging",
								tabBarIcon: ({ color, size }) => (
									<MaterialIcons name="chat-bubble-outline" size={size+5} color={color} />
								),
								tabBarLabel: ({ color }) => (
									<TabTitle color={color}>Messaging</TabTitle>
								),
							}}
						/>
						
						<Tabs.Screen
							name="announcements/index"
							options={{
								title: "Announcements",
								tabBarIcon: ({ color, size }) => (
									<MaterialIcons name="campaign" size={size+6} color={color} />
								),
								tabBarLabel: ({ color }) => (
									<TabTitle color={color}>Board</TabTitle>
								),
							}}
						/>
						
						<Tabs.Screen
							name="schedule/index"
							options={{
								title: "Schedule",
								tabBarIcon: ({ color, size }) => (
									<Feather name="calendar" size={size+4} color={color} />
								),
								tabBarLabel: ({ color }) => (
									<TabTitle color={color}>Schedule</TabTitle>
								),
							}}
						/>
						
						<Tabs.Screen
							name="pay-cycles/index"
							options={{
								title: "Pay cycles",
								tabBarIcon: ({ color, size }) => (
									<MaterialIcons name="attach-money" size={size+5} color={color} />
								),
								tabBarLabel: ({ color }) => (
									<TabTitle color={color}>Pay cycles</TabTitle>
								),
							}}
						/>
					
					</Tabs>
					
				</CheckAuthentication>
			</GlobalStateContext.Provider>
		</SafeAreaProvider>
	
	);
}
