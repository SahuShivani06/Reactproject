import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("refreshToken");
    router.replace("/login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-black mb-6">Welcome Home!</Text>
      <Text className="text-lg text-gray-600 mb-8">You are authenticated.</Text>
      <Pressable
        className="bg-red-500 rounded-lg px-4 py-3 w-full items-center active:bg-red-600"
        onPress={handleLogout}
      >
        <Text className="text-white text-lg font-medium">Logout</Text>
      </Pressable>
    </View>
  );
}
