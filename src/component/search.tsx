import React from 'react';
import { StyleSheet, View, TextInput, TouchableHighlight } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";


function Search() {
  const router = useRouter();
    return (
      <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 2, borderRadius: 20, borderColor: '#155A03'}}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
              {/* Search Icon */}
              <TouchableHighlight style={{alignItems:'center',justifyContent:'center', margin: 0, padding: 10}} onPress = {()=>{console.log("Pressed")}} underlayColor = 'transparent'>
                  <View>
                    <Entypo name="magnifying-glass" size={22} color="#155A03" />
                  </View>
              </TouchableHighlight>
              {/* Input Search data */}
              <TextInput style={styles.input} placeholder='Enter your item'></TextInput>
            </View>
            
            {/* Filter icon */}
            <TouchableHighlight style={{alignItems:'center',justifyContent:'center', margin: 0, padding: 0}} onPress = {()=>{console.log("Pressed")}} underlayColor = 'transparent'>
                <View>
                <Ionicons name="ios-filter" style={styles.filter} size={22} color="#155A03" />
                </View>
            </TouchableHighlight>
        </View>

        {/* Basket Icon */}
          <TouchableHighlight style={{alignItems:'center',justifyContent:'center', borderWidth: 2, width: 50, height: 50, borderRadius: 25, borderColor: '#155A03'}} onPress = {()=>{router.replace('/basket')}} underlayColor = 'transparent'>
                <View>
                <Ionicons name="basket-outline" size={24} color="#155A03" />
                </View>
          </TouchableHighlight>
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
})

export default Search;