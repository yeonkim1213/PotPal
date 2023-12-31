import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text, ImageBackground, Image } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from "expo-router";
import { ScrollView, XStack, YStack } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import Menu from '../src/components/menu';

interface User {
  id: string;
  avatar: string;
  location: string;
  name: string;
  item: string;
  itemImage: string;
  date: string;
}

export function convertDateToString(date) {
  const year = date.slice(2, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return month + "/" + day + "/" + year;
}


function SearchPost() {
  const router = useRouter();
  const [basket, setBasket] = useState();
  const [searchPost, setSearchPost] = useState([]);
  const [search, setSearch] = useState('');
  const handleChange = event => {
    setSearch(event);

    console.log('value is:', event);
    const url = new URL('https://64c881f3a1fe0128fbd5db6f.mockapi.io/available');
    url.searchParams.append('item', search);
    fetch(url, {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(tasks => {
        // mockapi returns only tasks that match `hello` string
        // console.log(tasks);
        setSearchPost(tasks);
    }).catch(error => {
        // handle error
      })
  };




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

  const addBasket = (event) => {
    fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        
        console.log(tasks.basketList);
        const indexOfObject = tasks.available.findIndex((object) => {
          return object.id === event;
        });
        tasks.basketList.push(tasks.available[indexOfObject]);
        if (indexOfObject !== -1) {
          tasks.available.splice(indexOfObject, 1);
        }

        fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1", {
          method: "PUT", // or PATCH
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            basketList: tasks.basketList,
            basket: tasks.basketList.length,
            available: tasks.available
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            // handle error
          })
          .then((task) => {
            // console.log(task);
            // Do something with updated task
          })
          .catch((error) => {
            // handle error
          });
      })
      .catch((error) => {
        // handle error
      });
  };



  const renderPost = (posts) => {
    return posts.map(element => {
        return(
          <ImageBackground
          key={element.id}
          source={{ uri: element.itemImage }}
          resizeMode="cover"
          style={{ aspectRatio: 1, borderRadius: 15, marginBottom: 15 }}
          imageStyle={{ borderRadius: 15 }}
        >
          <LinearGradient
            style={{ borderRadius: 15 }}
            colors={[
              "rgba(217,217,217,0)",
              "rgba(217,217,217,0.32)",
              "rgba(217,217,217,1)",
            ]}
          >
            <View
              style={{
                width: "100%",
                aspectRatio: 1,
                borderRadius: 15,
                justifyContent: "space-between",
                display: "flex",
                padding: 7,
              }}
            >
              <XStack style={{ justifyContent: "flex-end" }}>
                <Pressable
                  onPress={() => addBasket(element.id)}
                  style={{
                    borderRadius: 25,
                    backgroundColor: "#fff",
                    margin: 5,
                    marginRight: "auto",
                    borderWidth: 1,
                    padding: 7,
                    borderColor: "#155A03",
                  }}
                >
                  <MaterialCommunityIcons
                    key={element.id}
                    id={element.id}
                    name="basket-plus-outline"
                    size={24}
                    color="#155A03"
                  />
                </Pressable>
                <Pressable
                  style={{
                    borderRadius: 25,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    width: 160,
                    height: 40,
                    borderColor: "#155A03",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                  >
                    <Ionicons name="calendar" size={16} color="#155A03" />
                    <Text style={{ marginLeft: 3, fontSize: 13, marginTop: 2 }}>
                      {convertDateToString(element.date) +
                        "-" +
                        convertDateToString(element.endDate)}
                    </Text>
                  </View>
                </Pressable>
              </XStack>
              <YStack>
                <XStack>
                  <Text style={{ fontSize: 20, padding: 2, paddingBottom: 3 }}>
                    {element.brand.charAt(0).toUpperCase() +
                      element.brand.slice(1) +
                      " " +
                      element.item.toLowerCase()}
                  </Text>
                  <Pressable
                    style={{
                      borderRadius: 25,
                      marginTop: 5,
                      borderColor: "#155A03",
                    }}
                  >
                    <Octicons
                      name="mail"
                      marginLeft={5}
                      size={20}
                      color="#155A03"
                      onPress={() => {
                        router.replace("/inbox");
                      }}
                    />
                  </Pressable>
                </XStack>
                <View style={{ flexDirection: "row", padding: 2 }}>
                  <Image
                    source={{ uri: element.avatar }}
                    style={{ aspectRatio: 1, borderRadius: 15, width: 30 }}
                  ></Image>
                  <View style={{ paddingLeft: 5 }}>
                    <Text style={{ fontSize: 13, paddingBottom: 2 }}>
                      {element.name}
                    </Text>
  
                    <Text style={{ fontSize: 10 }}>
                      <Octicons name="star-fill" size={13} color="black" />
                      {element.rating % 5}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                  }}
                >
                  <Text style={{ fontSize: 13, paddingLeft: 1 }}>
                    <Entypo name="location-pin" size={20} color="#155A03" />
                    {element.location}
                  </Text>
                  <Text style={{ fontSize: 13, paddingLeft: 1, marginLeft: 5 }}>
                    <Ionicons
                      name="pie-chart-outline"
                      size={19}
                      color="#155A03"
                    />
                    {element.condition}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      // marginRight: 5,
                      marginLeft: 5,
                      marginTop: 3,
                    }}
                    // style={{ marginRight: 5, marginLeft: 5, marginTop: 3 }}
                  >
                    {/* <Ionicons name="calendar" size={16} color="#155A03" />
  
                    <Text style={{ marginLeft: 3, fontSize: 12, marginTop: 3 }}>
                      {convertDateToString(element.date) +
                        "-" +
                        convertDateToString(element.endDate)}
                    </Text> */}
                    <Text
                      style={{
                        color: "#155A03",
                        fontSize: 13,
                        marginLeft: 4,
                        marginTop: 2,
                        fontWeight: "bold",
                      }}
                    >
                      $
                    </Text>
  
                    <Text style={{ fontSize: 13, marginLeft: 0, marginTop: 2 }}>
                      {element.price / 100 + "/day"}
                    </Text>
                  </View>
                  {/* <Text style={{ fontSize: 12, paddingLeft: 1 }}>
                    <Ionicons name="calendar-outline" size={20} color="black" />
                    {element.date}
                  </Text> */}
                </View>
              </YStack>
            </View>
          </LinearGradient>
        </ImageBackground>
  
        )
    })
  }



  

  // console.log(basket);
  console.log(searchPost);

    return (
      <>
      <Stack.Screen
      options={{
        headerShown: false,
      }}/>

      <View style={styles.container}>
      <View style = {{flexDirection: 'row', justifyContent: 'space-around', zIndex: 2, marginBottom: 5}}>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 2, borderRadius: 20, borderColor: '#155A03'}}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
              {/* Search Icon */}
              <Pressable style={{alignItems:'center',justifyContent:'center', margin: 0, padding: 10}} onPress = {()=>{console.log("Pressed")}}>
                  <View>
                    <Entypo name="magnifying-glass" size={22} color="#155A03" />
                  </View>
              </Pressable>
              {/* Input Search data */}
              <TextInput         onChangeText={newText => handleChange(newText)} defaultValue={search} style={styles.input} placeholder='Enter your item'></TextInput>
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

      <ScrollView style={{
            flex: 1,
            margin: 5,
            padding: 10,
            zIndex: -2,
            marginBottom: 70,
          }}
>
        {renderPost(searchPost)}
      </ScrollView>
      <Menu />
</View>
</>
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

export default SearchPost;