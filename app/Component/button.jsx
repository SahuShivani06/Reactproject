import React,{useState} from "react";
import {View,TouchableOpacity,Text,StyleSheet} from "react-native";

export default function Button({text,onPress=() =>{}}) {

    return(
        <View>
         <TouchableOpacity 
                style={styles.button} 
                onPress={onPress}
              >
                <Text style={styles.buttonText}>
                {text}
                </Text>
              </TouchableOpacity>
        
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