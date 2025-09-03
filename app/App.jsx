import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Counter from "./Counter";
import Button from "./Component/button";

export default function App() {
  const [count, setCount] = useState(1);
  

  return (
    <View style={{ marginTop: 50, alignItems: "center" }}>
      <Counter value={count} setCount={setCount}
       />
      
      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Current value in parent: {count}
      </Text>
    </View>
  );
}
