import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Pressable} from "react-native";
import { Button, XStack, YStack,  } from 'tamagui';
import { useRouter, Stack } from 'expo-router';
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons';


function PostBasket() {
    const [posts, setPosts] = useState([])

    const fetchBasketData = () => {
        fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setPosts(data.basketList)
          })
      }
  
      useEffect(() => {
        fetchBasketData()
      }, [])
  console.log(posts);

  const deleteBasket = (event) => {
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
        const indexOfObject = tasks.basketList.findIndex((object) => {
          return object.id === event;
        });
        console.log(indexOfObject);
        tasks.available.unshift(tasks.basketList[indexOfObject]);

        if (indexOfObject !== -1) {
          tasks.basketList.splice(indexOfObject, 1);
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



    return (
        posts.map(p => {
            return(
            <XStack key={p.id} style={styles.stack}>
              <View style={{position: 'relative', width: '30%'}}>
                  <Pressable onPress={() => deleteBasket(p.id)} style={{borderRadius: 25, borderWidth: 1, padding: 3, borderColor: "#FF5252", position:'absolute', zIndex: 2, backgroundColor: 'white'}}>
                    <Ionicons name="trash-bin" size={12} color="#FF5252" />
                  </Pressable>

                <Image source={{uri: p.itemImage}} style={{width: '100%', aspectRatio: 1, borderRadius: 5}}></Image>
              </View>
                <View style={{flex:1,borderRadius: 15, justifyContent: 'space-around', display:'flex', padding: 7}}>
                <Text style={{fontSize: 20, paddingBottom: 3}}>{p.item}</Text>
                  <XStack style={{justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row', padding: 2}}>
                      <Image source={{uri: p.avatar}} style={{ aspectRatio: 1, borderRadius: 15, width: 25,}}></Image>
                      <View style={{paddingLeft: 5}}>
                          <Text style={{fontSize: 10, paddingBottom: 2}}>{p.name}</Text>
                          <Text style={{fontSize: 8}}><Octicons name="star-fill" size={12} color="black" />4.0</Text>
                      </View>
                      
                      </View>
                      <Pressable style={{borderRadius: 25, margin: 7, borderWidth: 1, padding: 5, borderColor: "#155A03"}}>
                        <Octicons  name="mail" size={15} color="#155A03" />
                      </Pressable>
                  </XStack>

                    
                    <View style={{flexDirection: 'row', display:'flex', justifyContent: 'space-between', padding: 2}}>
                      <Text style={{fontSize: 9, paddingLeft: 1,}}><Entypo name="location-pin" size={15} color="black" />{p.location}</Text>
                      <Text style={{fontSize: 9, paddingLeft: 1,}}><Ionicons name="pie-chart-outline" size={15} color="black" />{p.condition}</Text>
                      <Text style={{fontSize: 9, paddingLeft: 1,}}><Ionicons name="calendar-outline" size={15} color="black" />{p.date}</Text>
                    </View>
                </View>
              </XStack>
        
            )
        })

        );
}

const styles = StyleSheet.create({
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


export default PostBasket;