import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function Myprofileedit() {
  const [image, setImage] = useState(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.myprofile}>My Profile</Text>
      <Image
        source={require("../../assets/profile.png")}
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.editbutton} onPress={pickImage}>
        <Text style={styles.edittext}>Edit picture</Text>
      </TouchableOpacity>
      <View style={styles.editContainer}>
        <Text style={styles.name}>Name</Text>
        <TextInput style={styles.namePH} placeholder="Anna Doe" />
        <Text style={styles.city}>City</Text>
        <TextInput style={styles.cityPH} placeholder="Salt Lake City" />
        <Text style={styles.state}>State</Text>
        <TextInput style={styles.statePH} placeholder="Utah" />
      </View>
      <TouchableOpacity
        style={styles.savebutton}
        onPress={() => {
          console.log("Pressed");
          router.replace("/myprofile");
        }}
      >
        <Text style={styles.savetext}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    marginTop: 100,
  },

  myprofile: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 42.5,
    marginTop: 10,
    marginBottom: 10,
  },

  editbutton: {
    backgroundColor: "transparent",
    alignSelf: "center",
  },

  edittext: {
    color: "#155A03",
    fontSize: 14,
    fontWeight: "bold",
  },

  editContainer: {
    marginTop: 20,
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },

  city: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },

  state: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },

  namePH: {
    fontSize: 14,
    marginBottom: 7,
  },

  cityPH: {
    fontSize: 14,
    marginBottom: 7,
  },

  statePH: {
    fontSize: 14,
    marginBottom: 7,
  },

  savebutton: {
    alignSelf: "center",
    width: 100,
    height: 25,
    backgroundColor: "#155A03",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 20,
    border: "2px solid #155A03",
    background: "#155A03",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  },

  savetext: {
    color: "white",
    fontSize: 14,
  },
});
