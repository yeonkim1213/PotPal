import React from 'react';
import { StyleSheet, View, ScrollView} from "react-native";
import Menu from '../src/components/menu';
import Search from '../src/components/search';
import Post from '../src/components/post';
import { Link, Stack } from 'expo-router';



const Home = ()=> {
  return (
    <>
      <Stack.Screen
      options={{
        headerShown: false,
      }}/>

      <View style={styles.container}>
        {/* Search bar */}
        <Search />

        <ScrollView style = {{flex: 1, margin: 5, padding: 10, zIndex: -2}}>
          <Post />

        </ScrollView>

        
        {/* Menu bar */}
        <Menu />



      </View>
    </>
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

export default Home;