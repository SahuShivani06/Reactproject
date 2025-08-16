// import { useEffect,useRef, useState } from "react";
// import { Image, Pressable, Text, TextInput, View } from "react-native";

// export default function OTP() {
//   const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const inputs = Array.from({ length: 6 }, () => useRef<TextInput>(null));

//   const handleChange = (value: string, idx: number) => {
//     if (/^\d?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[idx] = value;
//       setOtp(newOtp);
//       // Auto-focus next input
//       if (value && idx < 5) {
//         inputs[idx + 1].current?.focus();
//       }
//       // If cleared, stay or move to previous
//       if (!value && idx > 0) {
//          inputs[idx - 1].current?.focus();
//       }
//     }
//   };

//   const handleKeyPress = (e: any, idx: number) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) {
//       inputs[idx - 1].current?.focus();
//     }
//   };
//   const handleSubmit = () => {
//     // Validation: must be 6 digits, not empty
//     const otpValue = otp.join("");
//     if (!otpValue) {
//       setError("OTP is required.");
//       return;
//     }
//     if (!/^\d{6}$/.test(otpValue)) {
//       setError("Enter a valid 6-digit OTP.");
//       return;
//     }
//     setError("");
//     // Proceed with OTP verification logic
//   };

//   return (
//     <View className="flex-1 justify-center items-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
//       <View className="bg-cyan-200 rounded-2xl shadow-lg p-8 w-72 items-center">
//         <View className="mb-6">
//           <View className="bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500 rounded-full p-2 items-center justify-center">
//             <View className="bg-white rounded-full p-2">
//               <Image source={require("../assets/images/react-logo.png")} alt="Logo" style={{ width: 56, height: 56 }} />
//             </View>
//           </View>
//         </View>
//         <Text className="text-2xl font-bold font-serif text-blue-600 mb-6">OTP Verification</Text>
//         <Text className="text-base text-gray-700 mb-4">Enter the 6-digit OTP</Text>
//         <View className="flex-row justify-center mb-2 w-full">
//           {otp.map((digit, idx) => (
//             <TextInput
//               key={idx}
//               ref={inputs[idx]}
//               className="border border-gray-300 rounded-lg w-10 h-12 mx-1 text-center text-xl focus:border-blue-500 focus:ring-2 focus:ring-violet-200 bg-gray-50"
//               keyboardType="number-pad"
//               maxLength={1}
//               value={digit}
//               onChangeText={value => handleChange(value, idx)}
//               onKeyPress={e => handleKeyPress(e, idx)}
//               placeholder="-"
//               placeholderTextColor="#94a3b8"
//               autoFocus={idx === 0}
//             />
//           ))}
//         </View>
//         {error ? (
//           <Text className="text-red-500 text-sm mb-4 text-center w-full">{error}</Text>
//         ) : null}
//         <Pressable
//           className="bg-blue-500 rounded-lg px-4 py-3 w-full items-center active:bg-blue-600"
//           onPress={handleSubmit}
//         >
//           <Text className="text-white text-lg font-semibold">Verify</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function OTP() {
  // ...existing code...
  const handleChangeMobile = () => {
    router.replace("/login");
  };
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = params.phone as string;

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string) => {
    // Only allow numbers, max 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async () => {
    if (!otp) {
      setError("OTP is required.");
      return;
    }
    if (!/^\d{4}$/.test(otp)) {
      setError("Enter a valid 4-digit OTP.");
      return;
    }
    setError("");
    setLoading(true);
    console.log("OTP entered:", otp);
    try {
      const response = await fetch(
        "http://65.0.135.170/user_auth/users/verify_otp/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone_number: phone, otp_code: otp }),
        }
      );
      console.log("API response status:", response.status);

      const data = await response.json();
      console.log(data, "DATA");
      if (data.data.tokens?.refresh) {
        await AsyncStorage.setItem("refreshToken", data.data.tokens.refresh);
        router.replace("/home");
        console.log("Api response:", data);
      } else {
        console.log("API error response:", data);
        setError(data?.detail || "Invalid OTP. Please try again.");
      }
    } catch (e) {
      console.log("Network error:", e);
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setOtp("");
    setTimer(30);
    alert("OTP Resent! 📩");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/*
      <Pressable className="absolute top-12 left-6 flex-row items-center">
        <Text className="text-lg text-gray-800">← Back</Text>
      </Pressable>
      */}

      <View className="bg-blue-100 p-4 rounded-full mb-4">
        <Text className="text-2xl">📱</Text>
      </View>

      <Text className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</Text>
      <Text className="text-gray-600 text-center">
        Enter the 6-digit code sent to
      </Text>
      <Text className="text-base text-gray-700 font-bold text-center mb-6">
        +91 {phone}
      </Text>

      <View className="bg-white rounded-2xl shadow p-6 w-full items-center border border-gray-200">
        <Text className="text-gray-700 text-base font-semibold mb-3 text-left w-full">
          Enter OTP
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full text-lg text-center focus:border-blue-500 bg-gray-50"
          keyboardType="number-pad"
          maxLength={4}
          value={otp}
          onChangeText={handleChange}
          placeholder="- - - -"
          placeholderTextColor="#94a3b8"
          autoFocus
          textAlign="center"
        />

        {error ? (
          <Text className="text-red-500 text-sm mb-2 text-center w-full">
            {error}
          </Text>
        ) : null}

        <Pressable
          className="bg-green-400 rounded-2xl px-4 py-3 w-full items-center active:bg-green-500 mt-2"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-lg font-medium">
            {loading ? "Verifying..." : "Verify & Continue"}
          </Text>
        </Pressable>

        <Pressable className="mt-4" onPress={handleChangeMobile}>
          <Text className="text-blue-600 font-medium">
            Change Mobile Number
          </Text>
        </Pressable>
      </View>

      <Pressable onPress={handleResend} disabled={timer > 0} className="mt-4">
        <Text
          className={`${
            timer > 0 ? "text-gray-400" : "text-blue-600"
          } font-medium`}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </Text>
      </Pressable>
    </View>
  );
}
