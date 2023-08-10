import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import Menu from "../src/components/menu";
import Myprofileedit from "../src/components/myprofileeditpage";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Myprofileedit />
      <Menu />
    </>
  );
};
