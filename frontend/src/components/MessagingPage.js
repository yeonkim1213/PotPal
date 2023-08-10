import { Text, View, StyleSheet, FlatList } from "react-native";
import { YStack } from "tamagui";
import Menu from "./menu";
import React from "react";
import Message from "./Message.js";

//Update to use data from the API
let yesterdayDate = new Date();
const messagingData = [
  { userID: 2, mostRecentMessage: "See you soon!", date: "5/17/23" },
  {
    userID: 3,
    mostRecentMessage: "I loved the pan! Thank you so much.",
    date: "1/12/23",
  },
];

//avatar
//name
//date messaged

export default function MessagingPage(props) {
  return (
    <YStack
      flex={1}
      justifyContent="flex-start"
      alignItems="stretch"
      space={50}
      backgroundColor="white"
    >
      <YStack padding="$3"></YStack>
      <View>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            marginBottom: 15,
            marginLeft: 16,
          }}
        >
          Your messages
        </Text>
        <FlatList
          alwaysBounceVertical={false}
          data={messagingData}
          renderItem={(itemData) => {
            return (
              <Message
                id={itemData.item.userID}
                mostRecentMessage={itemData.item.mostRecentMessage}
                date={itemData.item.date}
              ></Message>
            );
          }}
        ></FlatList>
      </View>

      <View style={{ marginTop: "auto" }}>
        <Menu></Menu>
      </View>
    </YStack>
  );
}
