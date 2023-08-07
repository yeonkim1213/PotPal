import { Stack } from "expo-router";
import { Button, YStack } from "tamagui";
import { useRouter } from "expo-router";

export default () => {
  const router = useRouter();

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#ddf"
    >
      <Stack.Screen options={{ title: "Home" }} />
      <Button
        href="/login"
        onPress={() => router.replace("/login")}
        style={{ margin: 10 }}
      >
        Click Me
      </Button>
      <Button href="/login" onPress={() => router.replace("/postform")}>
        Make a post form!
      </Button>
    </YStack>
  );
};
