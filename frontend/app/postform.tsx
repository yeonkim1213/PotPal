import { Stack } from "expo-router";

import PostForm from "../src/components/PostForm.js";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <PostForm />
    </>
  );
};
