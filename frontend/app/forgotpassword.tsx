import { Stack } from "expo-router";

import { ForgotPasswordForm } from "../src/components/ForgotPasswordForm";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ForgotPasswordForm />
    </>
  );
};
