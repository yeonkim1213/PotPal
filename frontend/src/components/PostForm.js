import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import React from "react";
import CurrencyInput from "react-native-currency-input";
import CalendarButton from "./CalendarButton";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { YStack } from "tamagui";
// import { Image } from "expo-image";
import Menu from "./menu";

//Image Picker code from Expo Image Picker
//Currency input code from example Github for currency input
//Calendar code taught by Declan Miller

export default function PostForm() {
  const id = 1;

  let datePosted = new Date();

  function addPost() {
    // getPostInfo();
    fetch(
      "https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString(),
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((data) => {
        let postID = (data.available.length + 1).toString();
        data.available.unshift({
          date: startDate,
          name: data.name,
          avatar: data.avatar,
          rating: data.rating,
          item: itemName,
          itemImage: image,
          location: data.location,
          condition: dropdownValue,
          brand: brand,
          endDate: endDate,
          datePosted: new Date(),
          id: postID,
          price: price*100,
        });

        fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/available", {
          method: "POST",
          headers: { "content-type": "application/json" },
          // Send your data in the request body as JSON
          body: JSON.stringify({
            date: startDate,
            name: data.name,
            avatar: data.avatar,
            rating: data.rating,
            item: itemName,
            itemImage: image,
            location: data.location,
            condition: dropdownValue,
            brand: brand,
            endDate: endDate,
            datePosted: new Date(),
            id: postID,
            price: price*100,
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            // handle error
          })
          .then((task) => {
            // do something with the new task
          })
          .catch((error) => {
            // handle error
          });

        fetch(
          "https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString(),
          {
            method: "PUT", // or PATCH
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              available: data.available,
            }),
          },
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            // handle error
          })
          .then((task) => {
            // console.log(task);
            // Do something with updated task
          })
          .catch((error) => {
            // handle error
          });
      })
      .catch((error) => {
        // handle error
      });
  }

  const data = ["Brand new", "Lightly used", "Heavily used"];

  const [image, setImage] = React.useState(null);
  const [itemName, setItemName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [dropdownValue, setDropdownValue] = React.useState("");
  const [currencyColor, setCurrencyColor] = React.useState("#5A5A5A");
  const [selectListColor, setSelectListColor] = React.useState("#5A5A5A");
  const [icon, setIcon] = React.useState("add-circle-outline");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      if (icon === "add-circle-outline") {
        setIcon("md-checkmark-circle");
        alert("Image uploaded");
      } else {
        alert("New image uploaded");
      }
    }
  };

  const router = useRouter();

  return (
    <YStack
      flex={1}
      justifyContent="flex-start"
      alignItems="stretch"
      space={50}
      backgroundColor="white"
    >
      <YStack padding="$3"></YStack>
      <View style={{ marginLeft: 16 }}>
        <Text style={styles.headingStyle}>Share with your community!</Text>

        <Text style={styles.labelStyle}>Upload an image</Text>
        <View style={[styles.inputContainer, styles.plusIconStyles]}>
          <Ionicons name={icon} size={35} color="#155A03" onPress={pickImage} />
        </View>

        <Text style={styles.labelStyle}>Name of item</Text>
        <TextInput
          style={[styles.inputContainer, styles.mainVariant]}
          onChangeText={setItemName}
        ></TextInput>

        <Text style={styles.labelStyle}>Brand</Text>
        <TextInput
          style={[styles.inputContainer, styles.mainVariant]}
          onChangeText={setBrand}
        ></TextInput>

        <Text style={styles.labelStyle}>Price per day</Text>
        <CurrencyInput
          value={price}
          onChangeValue={(price) => {
            setPrice(price);
            setCurrencyColor("black");
          }}
          prefix={"$"}
          signPosition="beforePrefix"
          delimiter=","
          precision={2}
          separator="."
          style={[
            styles.inputContainer,

            styles.mainVariant,
            { color: currencyColor },
          ]}
        />

        <Text style={styles.labelStyle}>Available time frame</Text>
        <View style={styles.calendarButtonStyles}>
          <View>
            <CalendarButton setDate={setStartDate}></CalendarButton>
          </View>
          <TextInput style={styles.dashStyles}>-</TextInput>
          <View>
            <CalendarButton
              minimumDate={tomorrow}
              setDate={setEndDate}
            ></CalendarButton>
          </View>
        </View>

        <Text style={[styles.labelStyle, styles.extraSpace]}>Condition</Text>
        <SelectList
          data={data}
          setSelected={(value) => {
            setDropdownValue(value);
            setSelectListColor("black");
          }}
          boxStyles={[styles.inputContainer, styles.conditionVariant]}
          search={false}
          inputStyles={{ color: selectListColor }}
          dropdownStyles={styles.dropdownStyles}
          placeholder={"Select"}
          dropdownTextStyles={styles.dropdownTextStyles}
        />

        <View style={styles.postButtonStyling}>
          <Button
            title="Post"
            color="white"
            accessibilityLabel="This is a button to make a post"
            onPress={() => {
              addPost();
              router.push({
                pathname: "/home",
              });
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 110 }}>
        <Menu></Menu>
      </View>
    </YStack>
  );
}

const styles = StyleSheet.create({
  plusIconStyles: {
    width: 150,
    paddingLeft: 55,
    paddingRight: "auto",
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageVariant: {
    height: 60,
    width: 150,
  },
  dashStyles: {
    color: "#155A03",
    fontSize: 30,
    fontWeight: "300",
    marginTop: 13,
    marginLeft: 5,
    marginRight: 5,
  },
  extraSpace: {
    marginTop: 50,
  },
  postButtonStyling: {
    borderRadius: 20,
    backgroundColor: "#155A03",
    width: 110,
    marginTop: 20,
    marginLeft: 120,
    marginRight: 100,
  },
  inputContainer: {
    borderColor: "#155A03",
    borderWidth: 2,
    // marginLeft: 20,
    borderRadius: 20,
  },

  dateVariant: { width: 50, padding: 5, height: 30 },
  conditionVariant: {
    width: 128,
    height: 44,
  },
  calendarButtonStyles: {
    flex: 1,
    flexDirection: "row",
  },
  mainVariant: {
    width: 200,
    height: 30,
    padding: 5,
  },

  dropdownStyles: {
    width: 128,
    borderColor: "black",
    borderWidth: 2,
  },
  dropdownTextStyles: {
    color: "#155A03",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  headingStyle: {
    fontSize: 23,
    fontWeight: "bold",
    // marginTop: 80,
    // marginLeft: 20,
  },

  labelStyle: {
    fontSize: 17,
    fontWeight: 400,
    marginLeft: 0,
    margin: 20,
    marginBottom: 10,
    textAlign: "left",
    textAlignVertical: "auto",
  },
});
