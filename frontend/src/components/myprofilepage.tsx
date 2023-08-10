import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import StarRating from "react-native-star-rating";
import { useRouter } from "expo-router";

export default function Myprofile() {
  const router = useRouter();
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.profileTitle}>My Profile</Text>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Anna Doe</Text>
        <Text style={styles.location}>Salt Lake City, Utah</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}> 5.0 </Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={5}
            selectedStar={(rating) => {}}
            fullStarColor="#155A03"
            starSize={18}
            containerStyle={{ width: 90 }}
          />
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            console.log("Pressed");
            router.replace("/myprofileedit");
          }}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <Text style={styles.history}>History</Text>
        <View style={styles.historyBiggerContainer}>
          <View style={styles.historyContainer}>
            <View style={styles.historyItem}></View>
            <Image
              source={require("../../assets/toaster.png")}
              style={styles.historyItemImage}
            />
            <View style={styles.commentBox}>
              <Text style={styles.itemName}>Toaster</Text>
              <Text style={styles.returndate}>Return in 14 hours</Text>
              <TouchableOpacity
                style={styles.returned}
                onPress={() => {
                  console.log("Pressed");
                  router.replace("/feedback");
                }}
              >
                <Text style={styles.return}>Returned</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.historyContainer}>
            <View style={styles.historyItem}></View>
            <Image
              source={require("../../assets/pot.png")}
              style={styles.historyItemImage}
            />
            <View style={styles.commentBox}>
              <Text style={styles.itemName}>Cooking Pot</Text>
              <Text style={styles.date}>April 15, 2023</Text>
              <View style={styles.ratingHContainer}>
                <Text style={styles.ratingHText}>4.0 </Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={4}
                  selectedStar={(rating) => {}}
                  fullStarColor="#155A03"
                  starSize={8}
                  containerStyle={{ width: 40 }}
                />
              </View>
              <Text style={styles.comment}>Great! I loved it!</Text>
            </View>
          </View>
          <View style={styles.historyContainerTwo}>
            <View style={styles.historyItem}></View>
            <Image
              source={require("../../assets/pan.png")}
              style={styles.historyItemImage}
            />
            <View style={styles.commentBox}>
              <Text style={styles.itemName}>Baking Pan</Text>
              <Text style={styles.date}>March 13, 2023</Text>
              <View style={styles.ratingHContainer}>
                <Text style={styles.ratingHText}>2.0 </Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={2}
                  selectedStar={(rating) => {}}
                  fullStarColor="#155A03"
                  starSize={8}
                  containerStyle={{ width: 40 }}
                />
              </View>
              <Text style={styles.comment}>The lender was hard to </Text>
              <Text style={styles.comment}>contact and the pan</Text>
              <Text style={styles.comment}>condition was not good</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginBottom: 80,
  },
  returned: {
    width: 135,
    height: 25,
    backgroundColor: "#155A03",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 20,
    border: "2px solid #155A03",
    background: "#155A03",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  },
  return: { color: "white", fontSize: 14 },

  editButton: {
    width: 100,
    height: 25,
    backgroundColor: "#155A03",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 20,
    border: "2px solid #155A03",
    background: "#155A03",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  },

  editButtonText: { color: "white", fontSize: 14 },
  historyBiggerContainer: {},
  historyContainer: {
    flexDirection: "row",
    marginTop: 30,
  },

  historyContainerTwo: {
    flexDirection: "row",
    marginTop: 30,
  },

  historyItem: {
    flexDirection: "row",

    marginVertical: 10,
  },

  historyItemImage: {
    width: 160,
    height: 100,
    borderRadius: 25,
    alignSelf: "center",
  },

  commentBox: {
    marginLeft: 10,
    flexDirection: "column",
  },

  date: {
    fontSize: 9,
    marginTop: 3,
    marginLeft: 50,
  },

  returndate: {
    color: "red",
    fontSize: 9,
    marginTop: 8,
    marginLeft: 50,
  },

  itemName: {
    fontSize: 16,
    marginTop: 7,
    fontWeight: "bold",
  },

  ratingHText: {
    fontSize: 9,
  },

  ratingHContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 3,
    marginLeft: 55,
  },

  comment: {
    fontSize: 11,
    fontStyle: "italic",
  },

  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    marginTop: 100,
  },

  profileTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 42.5,
    marginTop: 15,
    marginBottom: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 3,
  },

  location: {
    fontSize: 14,
    marginTop: 2,
    marginBottom: 4,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 3,
  },

  ratingText: {
    fontSize: 14,
  },

  history: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },
});
