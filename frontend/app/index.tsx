import { Stack } from "expo-router";
import { YStack } from "tamagui";
import { LogoScreen } from "../src/components/Logo";

export default () => {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LogoScreen />
    </YStack>
  );
};
