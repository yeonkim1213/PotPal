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
            <ScrollView style={{padding: 2, zIndex: -2}}>
              <PostBasket />
              <XStack style={styles.stack}>
                <Image source={require('../assets/pot.jpg')} style={{width: '30%', aspectRatio: 1, borderRadius: 5}}></Image>
                <View style={{flex:1,borderRadius: 15, justifyContent: 'space-around', display:'flex', padding: 7}}>
                  <XStack style={{justifyContent:'space-between'}}>
                    <Text style={{fontSize: 20, paddingBottom: 3}}>Item Name</Text>
                    <Pressable style={{borderRadius: 25, marginLeft: 5, borderWidth: 1, padding: 7, borderColor: "#155A03"}}>
                      <Octicons  name="mail" size={22} color="#155A03" />
                    </Pressable>
                  </XStack>
                    <View style={{flexDirection: 'row', padding: 2}}>
                    <Image source={require('../assets/icon.png')} style={{ aspectRatio: 1, borderRadius: 15, width: 25,}}></Image>
                    <View style={{paddingLeft: 5}}>
                        <Text style={{fontSize: 10, paddingBottom: 2}}>Lender Name</Text>
                        <Text style={{fontSize: 8}}><Octicons name="star-fill" size={12} color="black" />4.0</Text>
                    </View>
                    </View>
                    <View style={{flexDirection: 'row', display:'flex', justifyContent: 'space-between', padding: 2}}>
                      <Text style={{fontSize: 9, paddingLeft: 1,}}><Entypo name="location-pin" size={15} color="black" />1 mile</Text>
                      <Text style={{fontSize: 9, paddingLeft: 1,}}><Ionicons name="pie-chart-outline" size={15} color="black" />90% new</Text>
                      <Text style={{fontSize: 9, paddingLeft: 1,}}><Ionicons name="calendar-outline" size={15} color="black" />During weekdays</Text>
                    </View>
                </View>
              </XStack>
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