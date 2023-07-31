import React from 'react';
import { StyleSheet, View, ScrollView, Text} from "react-native";
import Menu from '../component/menu';
import Search from '../component/search';
import Post from '../component/post';


const basket = ()=> {
    return (
        <View style={styles.container}>
        {/* Search bar */}  
            <Text>Hello</Text>
        {/* Menu bar */}
  
  
  
      </View>
  
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      // justifyContent: "center",
      paddingTop: 30,
    },
})  

export default basket;