import { FlatList, TextInput, Text, View, StyleSheet } from "react-native";
import Transaction from "./Transaction.js";
import { YStack } from "tamagui";
import Menu from "./menu";
import React from "react";
import { Image } from "expo-image";
import { convertDateToString } from "./post";

//Update to use data from the API
export default function Message(props) {
  const [avatar, setAvatar] = React.useState("");
  const [name, setName] = React.useState("");
  console.log("Message");
  React.useEffect(() => {
    const fetchUserData = async (id) => {
      const resp = await fetch(
        "https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString(),
      );
      const data = await resp.json();
      setAvatar(data.avatar);
      setName(data.name);
    };
    fetchUserData(props.id);
  }, []);

  console.log(avatar);
  console.log(name);
  return (
    <View style={styles.transactionBox}>
      <Text
        style={{
          marginTop: 3,
          marginRight: 3,
          marginLeft: "auto",
          fontSize: 10,
          color: "#5A5A5A",
        }}
      >
        {props.date}
        {/* {convertDateToString(props.date)}  */}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: avatar }}
          style={{
            aspectRatio: 1,
            borderRadius: 20,
            width: 40,
            marginLeft: 5,
            shadowOpacity: 0.3,
          }}
        ></Image>
        <View style={{ flexDirection: "column", marginLeft: 6 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              marginLeft: 5,
              marginTop: 0,
            }}
          >
            {name}
          </Text>

          <Text style={{ color: "#5A5A5A", marginLeft: 5, marginTop: 10 }}>
            {props.mostRecentMessage}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionBox: {
    marginBottom: 5,
    width: "auto",
    height: 70,
    borderRadius: 10,
    borderColor: "#155A03",
    borderWidth: 0.5,
  },
});
