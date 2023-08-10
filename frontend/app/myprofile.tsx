import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import Myprofile from "../src/components/myprofilepage";
import Menu from "../src/components/menu";

export default () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Myprofile />
      <Menu />
    </>
  );
};
