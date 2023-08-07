import { Stack } from "expo-router";

import TransactionPage from "../src/components/TransactionPage";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <TransactionPage name="Elsa"></TransactionPage>
    </>
  );
};
