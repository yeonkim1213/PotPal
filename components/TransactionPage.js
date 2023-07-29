import { FlatList } from "react-native";
import Transaction from "./Transaction.js";
import transactions from "./mock_data/transactions.js";

//Using dates as Date/string; maybe we convert beforehand?
//Work on filtering mechanisms
//Make name a prop

function TransactionPage(props) {
  const filteredTransactions = [];

  function filterDataByName(object) {
    let num = 0;
    if (
      !(object.lenderName === props.name || object.receiverName === props.name)
    ) {
      delete transactions[num];
    }
    num++;
  }

  function convertObjectToStringDate(object) {
    if (object.lenderName === props.name) {
      return [
        "You lent a " + object.itemName + " to " + object.receiverName + ".",
        object.date,
      ];
    } else {
      return [
        object.lenderName + " lent a " + object.itemName + " to you.",
        object.date,
      ];
    }
  }

  const dataValues = transactions.map(convertObjectToStringDate);

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
