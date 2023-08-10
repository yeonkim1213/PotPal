import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";


function Search() {
  const router = useRouter();
  const [basket, setBasket] = useState();

  const fetchBasketData = () => {
    fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setBasket(data.basket);
      })
  }

  useEffect(() => {
    fetchBasketData()
  }, [])

  console.log(basket);

    return (
      <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style = {{flex: 1,flexDirection: 'row', justifyContent: 'space-between', borderWidth: 2, borderRadius: 20, borderColor: '#155A03', margin: 5}}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
              {/* Search Icon */}
              <Pressable style={{alignItems:'center',justifyContent:'center', margin: 0, padding: 10}} onPress = {()=>{console.log("Pressed")}} >
                  <View>
                    <Entypo name="magnifying-glass" size={22} color="#155A03" />
                  </View>
              </Pressable>
              {/* Input Search data */}
              <Pressable onPress={()=>router.replace("/searchPost")}>
                <Text>Enter your item</Text>
              </Pressable>
              {/* <TextInput style={styles.input} placeholder='Enter your item'></TextInput> */}
            </View>
            
            {/* Filter icon */}
            <Pressable style={{alignItems:'center',justifyContent:'center', margin: 0, padding: 0}} onPress = {()=>{console.log("Pressed")}}>
                <View>
                <Ionicons name="ios-filter" style={styles.filter} size={22} color="#155A03" />
                </View>
            </Pressable>
        </View>

        {/* Basket Icon */}
          <Pressable style={{alignItems:'center', position: 'relative',justifyContent:'center', borderWidth: 2, width: 50, height: 50, borderRadius: 25, borderColor: '#155A03'}} onPress = {()=>{router.replace('/basket')}}>
            <Text style={{position: 'absolute', fontSize: 15, zIndex: 4, right: 0, top: -6, borderRadius: 25, borderWidth: 1, aspectRatio: 1, width: 20, textAlign: 'center', backgroundColor: 'red', color: 'white'}}>{basket}</Text>
            <View>
              <Ionicons name="basket-outline" size={24} color="#155A03" />
            </View>
          </Pressable>
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