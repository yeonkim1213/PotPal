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
  const router = useRouter() 
    return (
      <>
      <Stack.Screen
      options={{
        title: "Your Basket",
      }}/>
        <View style={styles.container}>
        {/* Search bar */}  
            <Button onPress={()=>router.replace("/home")}>Hello</Button>
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