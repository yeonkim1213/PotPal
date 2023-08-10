import { Stack } from "expo-router";

import PostForm from "../src/components/PostForm";
import Menu from "../src/components/menu";

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
