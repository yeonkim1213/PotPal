import { Stack } from "expo-router";
import { YStack } from "tamagui";
import Menu from "../src/components/menu";

import TransactionPage from "../src/components/TransactionPage";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <TransactionPage id={1}></TransactionPage>
    </>
  );
};
