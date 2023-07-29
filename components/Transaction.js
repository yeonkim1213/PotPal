//using a FlatList!!!

import { View, Text, StyleSheet } from "react-native";

export function Transaction(props) {
  return (
    <View style={styles.transactionBox}>
      <Text style={styles.textStyle}>{props.text}</Text>
      <Text style={styles.dateStyle}>{props.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionBox: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    width: "auto",
    height: 50,
    borderRadius: 10,
    borderColor: "#155A03",
    borderWidth: 0.5,
  },
  textStyle: {
    padding: 17,
    fontSize: 14,
    fontWeight: "500",
  },
  dateStyle: {
    fontSize: 10,
    color: "#5A5A5A",
    marginLeft: "auto",
    marginRight: 6,
    marginTop: "auto",
    marginBottom: 30,
  },
});
