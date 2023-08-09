import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";

const Rating = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.ratingTitle}>Rate your experience!</Text>

      <Image
        source={require("./assets/profile.png")}
        style={styles.profileImage}
      />

      <Text style={styles.name}>
        Anna Doe <Text style={styles.ratingText}>4.7</Text>
      </Text>
      <View style={styles.ratingContainer}>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={5}
          selectedStar={(rating) => {}}
          fullStarColor="#155A03"
          starSize={24}
          containerStyle={{ width: 140 }}
          marginTop={3}
        />
      </View>
      <Text style={styles.history}>Feedback</Text>
      <View style={styles.historyContainer}>
        <View style={styles.historyItem}></View>

        <View style={styles.commentBox}></View>
      </View>

      <TextInput style={styles.namePH} placeholder=" Enter your feedback " />
      <TextInput style={styles.namePH} placeholder="  " />
      <TextInput style={styles.namePH} placeholder="  " />
      <TextInput style={styles.namePH} placeholder="  " />
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.editButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  ratingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },

  namePH: {
    fontSize: 14,
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

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 3,
  },

  historyContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  profileContainer: {
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

  ratingText: {
    fontSize: 12,
  },
  editButton: {
    width: 100,
    height: 25,
    backgroundColor: "#155A03",
    justifyContent: "center",
    alignItems: "center",

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

export default Rating;
