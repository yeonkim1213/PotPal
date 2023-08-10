//Home page, will only display most recent post as of now!!
import { Stack, useSearchParams } from "expo-router";
import Post from "../src/components/Post.js";
import { YStack } from "tamagui";

export default () => {
  const params = useSearchParams();
  console.log(params);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <YStack
        flex={1}
        justifyContent="flex-start"
        alignItems="stretch"
        px={16}
        pt={16}
        pb={24}
        space={20}
        backgroundColor="white"
      >
        <YStack padding="$3"></YStack>
        <Post
          itemName={params.itemName}
          image={params.image}
          brandName={params.brandName}
          price={params.price}
          startDate={params.startDate}
          endDate={params.endDate}
          condition={params.condition}
          username={params.username}
          profileImage={params.profileImage}
          rating={params.rating}
          distance={params.distance}
        ></Post>
      </YStack>
    </>
  );
};
