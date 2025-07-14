import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { Asset } from "expo-asset";
// @ts-ignore
import background from "@/assets/images/squares-background.png";


export default function RootLayout() {

    useEffect(() => {
        // preload image background to avoid flicker
        Asset.loadAsync(background);
    }, []);


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
