import { Stack } from "expo-router";

import PostForm from "../src/components/PostForm";
import Message from "../src/components/Message";
import MessagingPage from "../src/components/MessagingPage";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <MessagingPage></MessagingPage>
    </>
  );
};
