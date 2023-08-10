// import { useState } from "react";
import { Button, Input, Paragraph, XStack, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { ChevronLeft } from "@tamagui/lucide-icons";

export function ForgotPasswordForm() {
  const router = useRouter();

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
          Change your password
        </Paragraph>
        <Paragraph size="$2" padding="$1">
          Enter your email address.
        </Paragraph>
        <YStack padding="$2"></YStack>
        <Input
          size="$5"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          fontSize="$3"
          placeholder="Email"
        />
      </YStack>
      <XStack justifyContent="center">
        <Button
          width="50%"
          borderRadius="$10"
          theme="green"
          href="/requestreset"
          onPress={() => router.replace("/requestreset")}
        >
          Request reset
        </Button>
      </XStack>
    </YStack>
  );
}
