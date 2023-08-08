import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useRouter } from "expo-router";

export function LogoScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();

    // After the logo fades in, start the fade-out animation and navigate to the login page
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }).start(() => {
        router.replace("/login"); // Navigate to the login page
      });
    }, 2000); // Adjust the delay before fade-out and navigation
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.Image
        source={require("../../assets/logo.png")}
        style={{
          opacity: fadeAnim,
          transform: [{ scale: fadeAnim }],
          width: 100,
          height: 100,
        }}
      />
      <Animated.Text
        style={{
          opacity: fadeAnim,
          transform: [{ scale: fadeAnim }],
          marginTop: 10,
          fontSize: 16,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        PotPal
      </Animated.Text>
    </View>
  );
}
