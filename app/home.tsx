import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  // const handleLogout = async () => {
  //   await AsyncStorage.removeItem("refreshToken");
  //   router.replace("/login");
  // };

  // return (
  //   // <View className="flex-1 justify-center items-center bg-white px-6">
  //   //   <Text className="text-3xl font-bold text-black mb-6">Welcome Home!</Text>
  //   //   <Text className="text-lg text-gray-600 mb-8">You are authenticated.</Text>
  //   //   <Pressable
  //   //     className="bg-red-500 rounded-lg px-4 py-3 w-full items-center active:bg-red-600"
  //   //     onPress={handleLogout}
  //   //   >
  //   //     <Text className="text-white text-lg font-medium">Logout</Text>
  //   //   </Pressable>
  //   // </View>
  // );

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <View className="bg-blue-200 p-4 rounded-full mb-4 ">
          <Text className="text-3xl">🎯</Text>
        </View>

        <Text className="text-xl font-bold text-black mb-4 text-center">
          Tell us about yourself
        </Text>

        <Text className="text-gray-700 text-center mb-8">
            Help us personalize your experience
        </Text>
         
        <View className="bg-white rounded-2xl shadow p-6 mb-5 w-full border border-gray-200">
          <Pressable className="flex-row items-center">
            <View className="bg-green-100 rounded-2xl p-3">
              <Text className="text-2xl">🎓</Text>
            </View>

            <View className="flex-col">
              <Text className="ml-3 text-base items-center text-semibold text-lg text-gray-900"> I'm a Student</Text>
            <Text className="ml-4 text-base items-center text-sm text-gray-600">Looking for coaching for myself</Text>
            </View>
          </Pressable>
        </View>

        <View className="bg-white rounded-2xl shadow p-6 mb-6 w-full border border-gray-200">
          <Pressable className="flex-row items-center">
            <View className="bg-blue-100 rounded-2xl p-3">
              <Text className="text-2xl">👥</Text>
            </View>

            <View className="flex-col">
              <Text className="ml-3 text-base items-center text-semibold text-lg text-gray-900"> I'm a Parent</Text>
            <Text className="ml-4 text-base items-center text-sm text-gray-600">Looking for coaching for my child</Text>
            </View>
          </Pressable>
        </View>

        <Text className="text-gray-500 text-center text-xs"> You can change this later in your profile settings</Text>
    </View>
  )
}
