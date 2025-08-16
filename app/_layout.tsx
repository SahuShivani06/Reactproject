import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import "./globals.css";

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      setInitialRoute(refreshToken ? "home" : "login");
    };
    checkAuth();
  }, []);

  if (!initialRoute) {
    // Show a loading spinner while checking auth
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Stack initialRouteName={initialRoute} />;
}