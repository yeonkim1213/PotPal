import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>My Profile</Text>
      <Image
        source={require("./assets/profile.png")}
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
          marginTop={3}
        />
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("ProfileEdit")}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <Text style={styles.history}>History</Text>
      <View style={styles.historyContainer}>
        <View style={styles.historyItem}></View>
        <Image
          source={require("./assets/pot.png")}
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
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("Rating")}
      >
        <Text style={styles.editButtonText}>Rating</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  historyItem: {
    flexDirection: "row",
    alignItems: "center",
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

  editButtonText: {
    color: "white",
    fontSize: 14,
  },

  history: {
    marginTop: 27,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default Profile;
