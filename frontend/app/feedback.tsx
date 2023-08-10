import { Stack } from "expo-router";

import Feedback from "../src/components/feedbackpage";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Feedback />
    </>
  );
};
