import React from 'react';
import { StyleSheet, View, ScrollView} from "react-native";
import Menu from './component/menu';
import Search from './component/search';
import Post from './component/post';

async function getPosts() { //must use async for await
  let response = await fetch("mongodb+srv://PotPal:qx1mQUwV5d32Cbo5@cluster0.ar2y784.mongodb.net/?retryWrites=true&w=majority") //must use await for response
  let data = await response.json()
  console.log(data);
  return data
}



export default function App() {
  return (
    <View style={styles.container}>
      {/* Search bar */}
      <Search />

      <ScrollView style = {{flex: 1, margin: 5, padding: 10, zIndex: -2}}>
        
        <Post />

      </ScrollView>

      
      {/* Menu bar */}
      <Menu />



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: 30,
  },
});
