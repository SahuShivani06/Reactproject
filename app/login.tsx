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
import { Image, Text, View, TextInput, Pressable } from "react-native";

export default function Login() {
  const [number, setNumber] = useState("");
  const [error, setError ] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!number) {
      setError("Mobile number is required.");
      return;
    }
    if (!/^\d{10}$/.test(number)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    router.push("/otp");
  };

  return(
  <><View className="bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500 rounded-full p-2 items-center justify-center">
      <View className="bg-lime-100 rounded-full p-2">
        <Image source={require("../assets/images/book.png")} style={{ width: 30, height: 30 }} />
      </View>
    </View>
    <Text className="text-2xl font-bold font-serif text-black p-8 mb-2">Welcome to CoachFinder</Text>
    <Text className="w-full text-gray-700 mb-4 text-center">Enter your mobile number to get started</Text>
    <View className="flex-1 justify-center item-center bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500">
      <View className="bg-white rounded-2xl shadow-lg p-6 w-80 items-center">
        <View className="mb-6">
        </View>
            <Text className="w-full text-gray-800 mb-2 text-left">Mobile Number</Text>
            <TextInput 
               className="border border-gray-300 rounded-lg px-4 py-3 mb-2 w-full text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
               keyboardType="number-pad"
               maxLength={10}
               value={number}
               onChangeText={text => {
                if (/^\d*$/.test(text)) {
                  setNumber(text);
                }
               }}
               placeholder="Mobile Number"
               placeholderTextColor="#999"
               />
               {error ? (
                <Text className="text-red-500 text-sm mb-4 text-center w-full">{error}</Text>
               ) : null}
               <Pressable
                 className="bg-blue-500 rounded-lg px-4 py-3 w-full items-center active:bg-lime-100"
                 onPress={handleSubmit}
                 >
                  <Text className="text-white text-lg font-medium">Send OTP</Text>
                 </Pressable>
                 <Text className="w-full mb-2 py-2 text-gray-700 items-center">By continuing, you agree to our Terms of Service & Privacy Policy</Text>
      </View>
    </View>
    </>
  );
}