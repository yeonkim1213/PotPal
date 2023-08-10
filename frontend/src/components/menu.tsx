import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function Menu() {
  let newItem = {
    date: "2023-08-05T06:55:04.654Z",
    name: "Chandler3",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/522.jpg",
    item: "Practical Concrete Bike",
    itemImage: "https://loremflickr.com/640/480/food",
    location: "Brando Summit",
    condition: "condition 11",
    id: "11",
  };

  const router = useRouter();
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        // alignSelf: "stretch",
        height: 77,
        position: "absolute",
        bottom: 0,
        zIndex: -1,
        marginBottom: 15,
        marginTop: 20,
      }}
    >
      <ImageBackground
        source={require("../../assets/menu.png")}
        resizeMode="cover"
      >
        {/* Menu bar */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Home Icon */}
          <TouchableHighlight
            style={{ justifyContent: "flex-end" }}
            onPress={() => router.replace("/home")}
            underlayColor="transparent"
          >
            <View style={styles.menuIcon}>
              <Octicons name="home" size={24} color="#155A03" />
              <Text style={{ color: "#155A03" }}>Home</Text>
            </View>
          </TouchableHighlight>

          {/* Activity Icon */}
          <TouchableHighlight
            style={{ justifyContent: "flex-end" }}
            onPress={() => {
              console.log("Pressed");
              router.replace("/activity");
            }}
            underlayColor="transparent"
          >
            <View style={styles.menuIcon}>
              <Octicons name="history" size={24} color="#155A03" />
              <Text style={{ color: "#155A03" }}>Activity</Text>
            </View>
          </TouchableHighlight>

          {/* Add Post Icon */}
          <TouchableHighlight
            onPress={() => {
              console.log("Pressed");
              router.replace("/postform");
            }}
            underlayColor="transparent"
          >
            <View style={styles.menuIcon}>
              <Ionicons
                style={{ paddingBottom: "10%" }}
                name="add-circle-outline"
                size={35}
                color="#155A03"
              />
            </View>
          </TouchableHighlight>

          {/* Inbox Icon */}
          <TouchableHighlight
            style={{ justifyContent: "flex-end" }}
            onPress={() => {
              router.replace("/inbox");
              console.log("Pressed");
            }}
            underlayColor="transparent"
          >
            <View style={styles.menuIcon}>
              <Octicons name="inbox" size={24} color="#155A03" />
              <Text style={{ color: "#155A03" }}>Inbox</Text>
            </View>
          </TouchableHighlight>

         {/* Account Icon */}
         <TouchableHighlight
            style={{ justifyContent: "flex-end" }}
            onPress={() => {
              console.log("Pressed");
              router.replace("/myprofile");
            }}
            underlayColor="transparent"
          >
            <View style={styles.menuIcon}>
              <Octicons name="person" size={24} color="#155A03" />
              <Text style={{ color: "#155A03" }}>Account</Text>
            </View>
          </TouchableHighlight>
        </View>
        {/* <Image source={require('../assets/menu.png')} style={{width: '100%', height: 77, position: 'absolute', bottom: 0, zIndex: -1}}/> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    color: "#155A03",
    textDecorationColor: "#155A03",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Menu;
