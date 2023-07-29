import { FlatList, TextInput } from "react-native";
import Transaction from "./Transaction.js";
import transactions from "../mock_data/transactions.js";
import { convertDateToString } from "./CalendarButton.js";

function TransactionPage(props) {
  // console.log(transactions);
  const name = props.name;
  // console.log(name);

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

export default TransactionPage;
