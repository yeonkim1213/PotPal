import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableHighlight, ImageBackground } from "react-native";
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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

  input: {
    // flex: 0.8,
    height: 40,
    width: '60%',
    margin: 0,
    padding: 0
  },

  filter: {
    padding: 10,
    // alignSelf: 'flex-end',
  },

  menuIcon: {
    flexDirection: 'column', 
    // justifyContent: 'flex-end', 
    alignItems: 'center',
    color: '#155A03',
    textDecorationColor: '#155A03',
    paddingLeft: 10,
    paddingRight: 10
  }
});
