import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";


export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    //contentStyle: { backgroundColor: "transparent" },
                    //animation: "none",
                }}
            >
                <Stack.Screen name="(tabs)"/>
                <Stack.Screen name="+not-found"/>
            </Stack>
        </SafeAreaProvider>
    );
}
