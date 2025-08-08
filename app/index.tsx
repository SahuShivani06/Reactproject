import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-extrabold font-serif mb-6 text-black">Login</Text>

      <TextInput
        placeholder="Email or Phone number"
        className="w-full max-w-sm h-12 border border-gray-300 rounded-md px-4 mb-4"
        placeholderTextColor="#999"
      />

       <View className="w-full max-w-sm h-12 border border-gray-300 rounded-md px-4 mb-6 flex-row items-center justify-between">
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
          className="flex-1 text-black"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text className="text-blue-600 font-medium">
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity className="bg-blue-600 rounded-md w-full max-w-sm h-12 justify-center items-center">
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
