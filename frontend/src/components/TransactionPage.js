import { FlatList, TextInput, Text, View, StyleSheet } from "react-native";
import Transaction from "./Transaction.js";
import { YStack } from "tamagui";
import Menu from "./menu";
import React from "react";
import { convertDateToString } from "./post";
// import { useEffect, useState } from "react-native";
import { setStatusBarTranslucent } from "expo-status-bar";

//Update to use data from the API
export default function TransactionPage(props) {
  const id = props.id;
  const [transactions, setTransactions] = React.useState([]);

  // const dataToPush = [
  //   {
  //     date: new Date(2023, 1, 23),
  //     lent: true,
  //     otherParty: "Bob",
  //     itemName: "baking pan",
  //     id: 1,
  //   },
  //   {
  //     date: new Date(2022, 4, 17),
  //     lent: false,
  //     otherParty: "Elsa",
  //     itemName: "cooking pan",
  //     id: 2,
  //   },
  //   {
  //     date: new Date(2022, 1, 11),
  //     lent: true,
  //     otherParty: "Anna",
  //     itemName: "spatula",
  //     id: 3,
  //   },
  //   {
  //     date: new Date(2022, 0, 13),
  //     lent: false,
  //     otherParty: "Betty",
  //     itemName: "strainer",
  //     id: 4,
  //   },
  // ];

  // function pushTransactions() {
  //   console.log("In push transactions");
  //   fetch(
  //     "https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString(),
  //     {
  //       method: "GET",
  //       headers: { "content-type": "application/json" },
  //     },
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // handle error
  //     })
  //     .then((tasks) => {
  //       console.log("Before pushing");
  //       console.log(tasks.transactions);
  //       for (let i = 0; i < dataToPush.length; i++) {
  //         tasks.transactions.push(dataToPush[i]);
  //       }
  //       console.log("Transactions");
  //       console.log(tasks.transactions);
  //       fetch(
  //         "https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString(),
  //         {
  //           method: "PUT", // or PATCH
  //           headers: { "content-type": "application/json" },
  //           body: JSON.stringify({
  //             transactions: tasks.transactions,
  //           }),
  //         },
  //       )
  //         .then((res) => {
  //           if (res.ok) {
  //             return res.json();
  //           }
  //           // handle error
  //         })
  //         .then((task) => {
  //           // Do something with updated task
  //         })
  //         .catch((error) => {
  //           // handle error
  //         });
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // }

  // // pushTransactions();

  React.useEffect(() => {
    const fetchTransactionData = async () => {
      const resp = await fetch(
        "https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString(),
      );
      const data = await resp.json();
      setTransactions(data.transactions);
    };
    fetchTransactionData();
  }, []);

  console.log(transactions);

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
        <Text style={{ fontSize: 23, fontWeight: "bold", marginBottom: 15 }}>
          Your transactions
        </Text>
        <FlatList
          alwaysBounceVertical={false}
          data={transactions}
          renderItem={(itemData) => {
            if (itemData.item.lent) {
              return (
                <Transaction
                  text={
                    "You lent a " +
                    itemData.item.itemName +
                    " to " +
                    itemData.item.otherParty +
                    "."
                  }
                  date={convertDateToString(itemData.item.date)}
                ></Transaction>
              );
            } else {
              return (
                <Transaction
                  text={
                    itemData.item.otherParty +
                    " lent a " +
                    itemData.item.itemName +
                    " to you."
                  }
                  date={convertDateToString(itemData.item.date)}
                ></Transaction>
              );
            }
          }}
        ></FlatList>
      </View>

      <View style={{ marginTop: "auto" }}>
        <Menu></Menu>
      </View>
    </YStack>
  );
}
