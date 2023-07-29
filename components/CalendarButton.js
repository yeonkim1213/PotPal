//Date picker core code used from https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, StyleSheet } from "react-native";
import React from "react";
import Button from "apsl-react-native-button";

export const convertDateToString = (date) => {
  return (
    (date.getMonth() + 1).toLocaleString() +
    "/" +
    date.getDate().toLocaleString() +
    "/" +
    date.getFullYear().toString()
  );
};

function CalendarButton(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [buttonValue, setButtonValue] = React.useState("mm/dd/yyyy");
  const [textColor, setTextColor] = React.useState("#5A5A5A");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    //When we click cancel!!!!
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setButtonValue(convertDateToString(date));

    setTextColor("black");
    props.setDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <Button
        style={styles.buttonStyling}
        onPress={showDatePicker}
        textStyle={{ color: textColor, fontSize: 14 }}
      >
        {buttonValue}
      </Button>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={props.minimumDate}
        setDate={props.setDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyling: {
    borderColor: "#155A03",
    borderWidth: 2,
    borderRadius: 20,
    width: 95,
    height: 30,
    padding: 5,
  },
});

export default CalendarButton;
