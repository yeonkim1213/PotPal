// import { useState } from "react";
import { Paragraph, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { ChevronLeft } from "@tamagui/lucide-icons";

export function RequestResetForm() {
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
          Please check your inbox
        </Paragraph>
      </YStack>
    </YStack>
  );
}
