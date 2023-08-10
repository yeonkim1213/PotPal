import { Stack } from "expo-router";

import { LoginForm } from "../src/components/LoginForm";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LoginForm />
    </>
  );
};

// const blurhash="";
// <message></message>
// <message
//   name="Anna"
//   mostRecentMessage="I'm right by the swings"
//   date="2/19/22"
//   avatar={blurhash}
// />
