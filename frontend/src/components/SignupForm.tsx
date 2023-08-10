import { useState } from "react";
import { Alert } from "react-native";
import { Anchor, Button, Input, Paragraph, XStack, YStack } from "tamagui";
import { useMutation } from "@tanstack/react-query";
import { sendSignup } from "../api/sendSignup";
import { useRouter } from "expo-router";
import { ChevronLeft } from "@tamagui/lucide-icons";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signup } = useMutation(
    () => sendSignup({ name, email, password }),
    {
      onSuccess: (data) => {
        if (data.success) {
          router.replace("/");
        } else {
          Alert.alert("Sign up Failed", data.message);
        }
      },
      onError: (error) => {
        Alert.alert("Error", String(error));
      },
    },
  );

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
      <YStack padding="$3"></YStack>

      <ChevronLeft onPress={() => router.replace("/login")}></ChevronLeft>

      <YStack space={4}>
        <Paragraph size="$6" fontWeight="800">
          Create your account
        </Paragraph>
        <Paragraph size="$2" padding="$1">
          Enter your email address and set a password.
        </Paragraph>
      </YStack>

      <YStack space={4}>
        <Input
          size="$4"
          value={name}
          onChangeText={(value) => setName(value)}
          autoCorrect={false}
          returnKeyType="done"
          placeholder="Name"
        />
      </YStack>
      <YStack space={4}>
        <Input
          size="$5"
          value={email}
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          fontSize="$4"
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
          onSubmitEditing={() => signup()}
          fontSize="$4"
          placeholder="Password"
        />
      </YStack>
      <XStack justifyContent="center">
        <Button
          width="50%"
          borderRadius="$10"
          theme="green"
          onPress={() => signup()}
        >
          Sign up
        </Button>
      </XStack>

      <YStack padding="$17"></YStack>

      <XStack justifyContent="center" space={4}>
        <Anchor href="/login" onPress={() => router.replace("/login")}>
          Already have an account?
        </Anchor>
      </XStack>
    </YStack>
  );
}
