import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Button from "./Component/button";


export default function Counter({value,setCount=() =>{}}) {
  
const handleClick = (value) => { 
  console.log(1);
  if(value==1){ setCount(prev => prev + 1) } 
  else { setCount(prev => prev - 1)}
}
  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Count: {value}</Text>
       <Button text="Increment" onPress={() => handleClick(1)}/>
       <Button text="Decrement" onPress={() => handleClick(0)}/>


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
  countText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});