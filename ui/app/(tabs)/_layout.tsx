import { Tabs } from "expo-router";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {SafeAreaProvider} from "react-native-safe-area-context";


export default function TabLayout() {
	return (
		<SafeAreaProvider>
			
			<Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
				
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="home" size={size} color={color} />
						),
					}}
				/>
			
			</Tabs>
			
		</SafeAreaProvider>
	
	);
}
