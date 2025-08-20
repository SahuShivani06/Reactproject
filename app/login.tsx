// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { Image, Pressable, Text, TextInput, View } from "react-native";

// export default function Login() {
//   const [number, setNumber] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = () => {
//     // Validation: only numbers, not empty, 10 digits
//     if (!number) {
//       setError("Mobile number is required.");
//       return;
//     }
//     if (!/^\d{10}$/.test(number)) {
//       setError("Enter a valid 10-digit mobile number.");
//       return;
//     }
//     setError("");
//     router.push("./otp");
//   };

//   return (
//     <View className="flex-1 justify-center items-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
//       <View className="bg-cyan-200 rounded-2xl shadow-lg p-6 w-80 items-center">
//         <View className="mb-6">
//           <View className="bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500 rounded-full p-2 items-center justify-center">
//             <View className="bg-white rounded-full p-2">
//               <Image source={require("../assets/images/react-logo.png")} style={{ width: 56, height: 56 }} />
//             </View>
//           </View>
//         </View>
//         <Text className="text-2xl font-bold font-serif text-blue-600 mb-4">Login</Text>
//         <Text className="w-full text-gray-700 mb-4 text-center">Enter your mobile number</Text>
//         <TextInput
//           className="border border-gray-300 rounded-lg px-4 py-3 mb-2 w-full text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//           keyboardType="number-pad"
//           maxLength={10}
//           value={number}
//           onChangeText={text => {
//             // Only allow numbers
//             if (/^\d*$/.test(text)) {
//               setNumber(text);
//             }
//           }}
//           placeholder="Mobile Number"
//           placeholderTextColor="#94a3b8"
//         />
//         {error ? (
//           <Text className="text-red-500 text-sm mb-4 text-center w-full">{error}</Text>
//         ) : null}
//         <Pressable
//           className="bg-blue-500 rounded-lg px-4 py-3 w-full items-center active:bg-blue-600"
//           onPress={handleSubmit}
//         >
//           <Text className="text-white text-lg font-semibold">Submit</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function Login() {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!number) {
      setError("Mobile number is required.");
      return;
    }
    if (!/^\d{10}$/.test(number)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        "http://65.0.135.170/user_auth/users/send_otp/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone_number: number }),
        }
      );
      if (response.ok) {
        router.push({ pathname: "/otp", params: { phone: number } });
      } else {
        const data = await response.json();
        setError(data?.detail || "Failed to send OTP.");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <View className="flex-1 justify-center items-center bg-white px-4">
        <View className="bg-lime-200 p-4 rounded-full mb-4">
          <Text className="text-3xl">📚</Text>
        </View>

        <Text className="text-2xl font-bold text-black mb-4 text-center">
          Welcome to CoachFinder
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          Choose your preferred login method
        </Text>

        <View className="bg-white rounded-2xl shadow p-6 w-full border border-gray-200">
          {/* <View className="mb-6">
        </View> */}
        <Pressable 
            className="flex-row items-center bg-white rounded-2xl p-3 mb-3 w-full border border-gray-200">
              <Ionicons name="logo-google" size={20} color="#DB4437"/>
              <Text className="ml-3 text-base items-center text-gray-900">Continue with Google</Text>
            </Pressable>

            <Pressable 
            className="flex-row items-center bg-white rounded-2xl p-3 mb-3 w-full border border-gray-200">
              <Ionicons name="logo-facebook" size={20} color="#1877F2"/>
              <Text className="ml-3 text-base text-gray-900">Continue with Facebook</Text>
            </Pressable>
            
            <Pressable 
            className="flex-row items-center bg-white rounded-2xl p-3 mb-8 w-full border border-gray-200">
              <Ionicons name="logo-instagram" size={20} color="#C13584"/>
              <Text className="ml-3 text-base text-gray-900">Continue with Instagram</Text>
            </Pressable>

            <View className="flex-row items-center w-full my-4 mb-8">
              <View className="flex-1 h-px bg-gray-300"/>
              <Text className="px-1 text-s text-gray-500">
                OR CONTINUE WITH MOBILE 
              </Text>
              <View className="flex-1 h-px bg-gray-300"/>
            </View>

          <Text className="text-gray-800 font-semibold mb-3 text-left">
            Mobile Number
          </Text>
          <View className="flex-row items-center mb-4 border border-gray-300 rounded-lg bg-white">
            <View className="px-4 py-3 justify-center items-center">
              <Text className="text-base text-gray-700 font-semibold">+91</Text>
            </View>
            <View className="h-8 w-px bg-gray-300 mx-1" />
            <TextInput
              className="flex-1 px-4 py-3 text-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              keyboardType="number-pad"
              maxLength={10}
              value={number}
              onChangeText={(text) => {
                if (/^\d*$/.test(text)) {
                  setNumber(text);
                }
              }}
              placeholder="Mobile Number"
              placeholderTextColor="#999"
            />
          </View>
          {error ? (
            <Text className="text-red-500 text-sm mb-4 text-center w-full">
              {error}
            </Text>
          ) : null}
          <Pressable
            className="bg-green-400 rounded-2xl px-4 py-3 w-full items-center active:bg-green-500"
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className="text-white text-lg font-medium">
              {loading ? "Sending..." : "Send OTP"}
            </Text>
          </Pressable>
          <View className="mb-6"></View>
          <Text
            className="w-full items-center"
            style={{
              fontSize: 10,
              color: "#6B7280",
              marginBottom: 2,
              paddingVertical: 4,
              textAlign: "center",
              letterSpacing: 0.1,
            }}
          >
            By continuing, you agree to our Terms of Service & Privacy Policy
          </Text>
        </View>
      </View>
    </>
  );
}
