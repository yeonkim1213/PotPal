import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { convertDateToString } from "./CalendarButton";
import { Ionicons } from "@expo/vector-icons";

// export type Post = {
//     image: String;
//     name: String;
//     brand: String;
//     price: Float;
//     startDate: Date;
//     endDate: Date;
//     condition: String;
//datePosted
//we also need username, user profile pic, rating, distance
//   };

function Post(props) {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <View>
      <View style={styles.postContainer}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.itemBrandText}>
            {props.brandName + " " + props.itemName.toLowerCase()}
          </Text>
          <Image
            source={{ uri: props.profileImage }}
            style={styles.profileImage}
            placeholder={blurhash}
            contentFit="cover"
          />

          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.usernameText}>{props.username}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <AntDesign name="star" size={12} color="black" />
              <Text style={{ marginTop: 0, marginLeft: 3, fontSize: 10 }}>
                {props.rating}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: 100,
          }}
        >
          <Image
            source={{ uri: props.image }}
            style={styles.itemImage}
            placeholder={blurhash}
            contentFit="cover"
          />

          <View style={styles.infoContainer}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 13 }}>
                {"$" + props.price + " per day"}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ marginLeft: 0 }}>
                <Ionicons name="location-sharp" size={17} color="#155A03" />
              </View>
              <Text style={{ fontSize: 13 }}>{props.distance + " mi"}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 13 }}>{props.condition}</Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Ionicons
                name="calendar"
                size={16}
                color="#155A03"
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 13 }}>
                {props.startDate + "-" + props.endDate}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", padding: 7 }}>
          <View style={{ marginRight: 13, marginLeft: "auto" }}>
            <Ionicons name="mail-outline" size={17} color="black" />
          </View>

          <View style={{ marginRight: 10 }}>
            <FontAwesome name="cart-plus" size={17} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 30,
    justifyContent: "space-between",
  },
  itemBrandText: {
    fontSize: 17,
    fontWeight: "500",
    margin: 10,
    marginBottom: 0,
  },
  postContainer: {
    margin: 20,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    borderRadius: 20,
    shadowOpacity: 0.1,
    height: 180,
  },
  itemImage: {
    borderRadius: 20,
    width: 110,
    height: 110,
    margin: 10,
    marginTop: 0,
  },
  profileImage: {
    borderRadius: 100,
    height: 40,
    width: 40,
    margin: 7,
    marginTop: 12,
    marginLeft: 10,
  },
  usernameText: {
    margin: 10,
    marginLeft: 0,
    marginTop: 15,
    marginBottom: 0,
    marginRight: 10,
  },
});

export default Post;
