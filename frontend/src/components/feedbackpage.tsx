import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
} from "react-native";
import { useRouter } from "expo-router";

import Svg, { Polygon } from "react-native-svg";

const Star = ({ isActive = false, size = 40 }) => {
  const points = "50,0 61,35 100,38 70,59 82,100 50,75 18,100 30,59 0,38 39,35";
  const fill = isActive ? "#155A03" : "#E0E0E0";
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon points={points} fill={fill} />
    </Svg>
  );
};

const StarRow = ({ count }) => (
  <View style={{ flexDirection: "row" }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} isActive={n <= count} />
    ))}
  </View>
);

const Feedback = () => {
  const [rating, setRating] = useState(1);

  const calculateRatingBasedOnGesture = (xPosition) => {
    let newRating = Math.ceil(xPosition / 50);
    if (newRating < 1) newRating = 1;
    if (newRating > 5) newRating = 5;
    return newRating;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt) => {
        let newRating = calculateRatingBasedOnGesture(
          evt.nativeEvent.locationX,
        );
        setRating(newRating);
      },
      onPanResponderRelease: (evt) => {
        let newRating = calculateRatingBasedOnGesture(
          evt.nativeEvent.locationX,
        );
        setRating(newRating);
      },
    }),
  ).current;
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.ratingTitle}>Rate your experience!</Text>

      <Image
        source={require("../../assets/lender.png")}
        style={styles.profileImage}
      />

      <Text style={styles.name}>
        James Ellery <Text style={styles.ratingText}>4.7</Text>
      </Text>

      <View style={styles.ratingContainer} {...panResponder.panHandlers}>
        <StarRow count={rating} />
      </View>

      <Text style={styles.feedback}>Feedback</Text>

      <TextInput
        style={styles.feedbackInput}
        placeholder="Type your feedback here..."
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          console.log("Pressed");
          router.replace("/myprofile");
        }}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackInput: {
    marginTop: 15,
    marginBottom: 30,
    borderColor: "#155A03",
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    height: 130,
    textAlignVertical: "top",
    padding: 13,
    paddingTop: 13,
  },

  feedback: {
    marginTop: 27,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },
  container: {
    marginTop: 100,
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  ratingTitle: {
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

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 3,
  },

  ratingText: {
    fontSize: 12,
  },
  submitButton: {
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

  submitText: {
    color: "white",
    fontSize: 14,
  },
});

export default Feedback;
