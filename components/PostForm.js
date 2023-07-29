//Image upload
//Use this post to make everything accessible: https://www.netguru.com/blog/accessibility-in-react-native
//Make fields required—https://stackoverflow.com/questions/51665162/how-can-i-make-a-textfield-in-react-native-required
//For transaction page, should we use dates?

//Using dates as Date/string; maybe we convert beforehand?
//Work on filtering mechanisms
//Make name a prop

import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import React from "react";
import CurrencyInput from "react-native-currency-input";
import CalendarButton from "./CalendarButton";
import * as ImagePicker from "expo-image-picker";

//Image Picker code from Expo Image Picker
//Currency input code from example Github for currency input
//Calendar code taught by Declan Miller

export function PostForm() {
  const data = [
    { key: 1, value: "New" },
    { key: 2, value: "Good" },
    { key: 3, value: "Used" },
  ];

  const [image, setImage] = React.useState();
  const [itemName, setItemName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [dropdownValue, setDropdownValue] = React.useState("");
  const [currencyColor, setCurrencyColor] = React.useState("#5A5A5A");
  const [selectListColor, setSelectListColor] = React.useState("#5A5A5A");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <YStack>
      <Text style={styles.headingStyle}>Share with your community!</Text>

      <Text style={styles.labelStyle}>Upload an image</Text>

      {/* <FontAwesome.Button
        name="plus-circle"
        color="#155A03"
        onPress={pickImage}
      ></FontAwesome.Button> */}

      {/* <View>
        <Button title="" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View> */}

      <Text style={styles.labelStyle} onChangeText={setItemName}>
        Name of item
      </Text>
      <TextInput
        style={[styles.inputContainer, styles.mainVariant]}
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
        <View style={{ marginLeft: 20 }}>
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
        />
      </View>
    </YStack>
  );
}

const styles = StyleSheet.create({
  imageVariant: {
    height: 60,
    width: 150,
  },
  dashStyles: {
    color: "#155A03",
    fontSize: 30,
    fontWeight: "300",
    // marginLeft: 5,
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
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputContainer: {
    borderColor: "#155A03",
    borderWidth: 2,
    marginLeft: 20,
    borderRadius: 20,
  },

  dateVariant: { width: 50, padding: 5, height: 30 },
  conditionVariant: {
    width: 90,
    height: 42,
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
    marginLeft: 20,
    width: 80,
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
    marginTop: 80,
    marginLeft: 20,
  },
  labelStyle: {
    fontSize: 17,
    fontWeight: 400,
    margin: 20,
    marginBottom: 10,
    textAlign: "left",
    textAlignVertical: "auto",
  },
});
