import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Pressable} from "react-native";
import Menu from '../src/components/menu';
import Search from '../src/components/search';
import Post from '../src/components/post';
import { Button, XStack, YStack,  } from 'tamagui';
import { useRouter, Stack } from 'expo-router';
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons';
import PostBasket from '../src/components/postBasket';



const basket = ()=> {
  const router = useRouter();
  const deleteBasket = ()=>{
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
        // tasks.basketList.push(users[Number(event) - 1]);
        // console.log(tasks.basketList);
        const availList = tasks.basketList.concat(tasks.available)
        tasks.basketList = [];
        fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1", {
          method: "PUT", // or PATCH
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            basketList: tasks.basketList,
            basket: tasks.basketList.length,
            available: availList
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
      router.replace('/basket');
  };

    return (
      <>
      <Pressable onPress={()=>router.replace('/basket')}>
        <Stack.Screen
        options={{
          title: "Your Basket",
        }}/>
      </Pressable>
        <View style={styles.container}>
        {/* Search bar */}  
            <Button style={{backgroundColor: '#FF5252', color:'white'}} onPress={deleteBasket}>Delete All</Button>
            <ScrollView style={{
            flex: 1,
            margin: 5,
            padding: 10,
            zIndex: -2,
            marginBottom: 70,
          }}
>
              <PostBasket />
            </ScrollView>
        {/* Menu bar */}
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
    stack: {
      width: '100%', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 5, 
      margin: 5,
      borderRadius: 10,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: {
          width: 2,
          // height: 2,
          height:-30
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,

      elevation: 4,

    }
})  

export default basket;