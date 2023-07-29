import React from 'react';
import { StyleSheet, View, ScrollView} from "react-native";
import Menu from './component/menu';
import Search from './component/search';
import Post from './component/post';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Search bar */}
      <Search />

      <ScrollView style = {{flex: 1, margin: 5, padding: 10, zIndex: -2}}>
        
        <Post />

        <Post />
      </ScrollView>

      
      {/* Menu bar */}
      <Menu />



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
});
