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

import { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function OTP() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const inputs = Array.from({ length: 6 }, () => useRef<TextInput>(null));

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, idx: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);

      if (value && idx < 5) {
        inputs[idx + 1].current?.focus();
      }
      if (!value && idx > 0) {
        inputs[idx - 1].current?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs[idx - 1].current?.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (!otpValue) {
      setError("OTP is required.");
      return;
    }
    if (!/^\d{6}$/.test(otpValue)) {
      setError("Enter a valid 6-digit OTP.");
      return;
    }
    setError("");
    alert("OTP Verified ✅ : " + otpValue);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setOtp(["", "", "", "", "", ""]);
    inputs[0].current?.focus();
    setTimer(30);
    alert("OTP Resent! 📩");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">

      <Pressable className="absolute top-12 left-6 flex-row items-center">
        <Text className="text-lg text-gray-800">← Back</Text>
      </Pressable>

      <View className="bg-blue-100 p-4 rounded-full mb-4">
        <Text className="text-2xl">📱</Text>
      </View>

      <Text className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</Text>
      <Text className="text-gray-600 text-center mb-6">
        Enter the 6-digit code sent to{" "}
        <Text className="font-semibold text-blue-600">+91 98876****77</Text>
      </Text>

      <View className="bg-white rounded-2xl shadow p-6 w-full items-center border border-gray-200">
        <Text className="text-gray-700 text-base mb-3">Enter OTP</Text>
        <View className="flex-row justify-center mb-2 w-full">
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={inputs[idx]}
              className="border border-gray-300 rounded-lg w-10 h-12 mx-1 text-center text-xl focus:border-blue-500 bg-gray-50"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={value => handleChange(value, idx)}
              onKeyPress={e => handleKeyPress(e, idx)}
              placeholder="-"
              placeholderTextColor="#94a3b8"
              autoFocus={idx === 0}
            />
          ))}
        </View>

        {error ? (
          <Text className="text-red-500 text-sm mb-2 text-center w-full">
            {error}
          </Text>
        ) : null}

        <Pressable
          className="bg-green-500 rounded-lg px-4 py-3 w-full items-center active:bg-green-600 mt-2"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-semibold">
            Verify & Continue
          </Text>
        </Pressable>

        <Pressable className="mt-4">
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