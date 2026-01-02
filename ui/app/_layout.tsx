import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { Asset } from "expo-asset";
// @ts-ignore
import background from "@/assets/images/squares-background.png";
// @ts-ignore
import logo from "@/assets/images/logo.png";



export default function RootLayout() {

    useEffect(() => {
        // preload images to avoid flicker
        Asset.loadAsync(background);
        Asset.loadAsync(logo);
    }, []);


    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="(tabs)"/>
                <Stack.Screen name="+not-found"/>
            </Stack>
        </SafeAreaProvider>
    );

}
