import { FlatList, TextInput } from "react-native";
import Transaction from "./Transaction.js";
import { convertDateToString } from "./CalendarButton.js";

//Update to use data from the API
export default function TransactionPage(props) {
  // console.log(transactions);
  const name = props.name;
  // console.log(name);

  const transactions = [
    {
      date: new Date(2023, 1, 23),
      lenderName: "Betty",
      receiverName: "Benny",
      itemName: "baking pan",
    },
    {
      date: new Date(2022, 4, 17),
      lenderName: "Anna",
      receiverName: "Elsa",
      itemName: "cooking pan",
    },
    {
      date: new Date(2022, 1, 11),
      lenderName: "Elsa",
      receiverName: "Sarah H.",
      itemName: "spatula",
    },
    {
      date: new Date(2022, 0, 13),
      lenderName: "Elsa",
      receiverName: "Betty",
      itemName: "strainer",
    },
  ];

  function filterDataByName(originalTransactions) {
    let filteredTransactions = [];
    let filteredIndex = 0;
    for (let i = 0; i < originalTransactions.length; i++) {
      let object = originalTransactions[i];
      if (object.lenderName === name || object.receiverName === name) {
        filteredTransactions[filteredIndex] = object;
        filteredIndex++;
      }
    }
    return filteredTransactions;
  }

  function convertObjectToStringDate(object) {
    const date = convertDateToString(object.date);
    if (object.lenderName === name) {
      return [
        "You lent a " + object.itemName + " to " + object.receiverName + ".",
        date,
      ];
    } else {
      return [
        object.lenderName + " lent a " + object.itemName + " to you.",
        date,
      ];
    }
  }

  const filteredTransactionsArr = filterDataByName(transactions);
  // console.log("filtered");
  // console.log(filteredTransactionsArr);

  const dataValues = filteredTransactionsArr.map(convertObjectToStringDate);

  return (
    <FlatList
      alwaysBounceVertical={false}
      data={dataValues}
      renderItem={(itemData) => {
        return (
          <Transaction
            text={itemData.item[0]}
            date={itemData.item[1]}
          ></Transaction>
        );
      }}
    ></FlatList>
  );
}
