import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { Anchor, Button, Input, XStack, YStack } from "tamagui";
import { useMutation } from "@tanstack/react-query";
import { sendLogin } from "../api/sendLogin";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login } = useMutation(() => sendLogin(email, password), {
    onSuccess: (data) => {
      if (data.success) {
        router.replace("home");
      } else {
        Alert.alert("Login Failed", data.message);
      }
    },
    onError: (error) => {
      Alert.alert("Error", String(error));
    },
  });
  return (
    <YStack
      flex={1}
      justifyContent="flex-start"
      alignItems="stretch"
      px={16}
      pt={16}
      pb={24}
      space={20}
      backgroundColor="white"
    >
      <YStack padding="$13" alignItems="center" justifyContent="center">
        <XStack alignItems="center" justifyContent="center">
          <Image
            source={require("../../assets/logo.png")}
            style={styles.imageStyle}
          />
        </XStack>
      </YStack>

      <YStack space={4}>
        <Input
          size="$5"
          value={email}
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          fontSize="$3"
          placeholder="Email"
        />
      </YStack>
      <YStack space={4}>
        <Input
          size="$5"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          returnKeyType="go"
          onSubmitEditing={() => login()}
          fontSize="$3"
          placeholder="Password"
        />
      </YStack>
      <XStack justifyContent="center">
        <Button
          width="50%"
          borderRadius="$10"
          theme="green"
          onPress={() => login()}
        >
          Log in
        </Button>
      </XStack>
      <XStack justifyContent="center" space={4}>
        <Anchor onPress={() => router.replace("/forgotpassword")}>
          Forgot password?
        </Anchor>
      </XStack>
      <YStack padding="$10"></YStack>
      <Button
        space="$10"
        size="$4"
        borderRadius="$6"
        borderColor="green"
        href="/signup"
        onPress={() => router.replace("/signup")}
      >
        Create new account
      </Button>
      <XStack justifyContent="center">
        <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>PotPal</Text>
      </XStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
