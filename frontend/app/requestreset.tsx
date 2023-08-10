import { Stack } from "expo-router";

import { RequestResetForm } from "../src/components/RequestResetForm";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <RequestResetForm />
    </>
  );
};
