import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  Pressable,
} from "react-native";
import {
  Entypo,
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import { transactions } from "../user/transactions"; //have fetching already
import { XStack, YStack } from "tamagui";
import { idFn } from "tamagui/types/setup";
import { useRouter } from "expo-router";

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

function Post() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  // const [avail, setAvail] = useState([])

  // const fetchAvailData = () => {
  //   fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/available")
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       setAvail(data)
  //     })
  // }

  // useEffect(() => {
  //   fetchAvailData()
  // }, [])

  // fetch('https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1', {
  //   method: 'PUT', // or PATCH
  //   headers: {'content-type':'application/json'},
  //   body: JSON.stringify({available: avail})
  // }).then(res => {
  //   if (res.ok) {
  //       return res.json();
  //   }
  //   // handle error
  // }).then(task => {
  //   console.log(task);
  //   // Do something with updated task
  // }).catch(error => {
  //   // handle error
  // })

  // function fetchUserData() {
  //   //We need this page to display everybody's posts!
  //   fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUsers(data.available);
  //     });
  // }

  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  const id = 1;
  function fetchAvailablePosts() {
    //We need this page to display everybody's posts!
    fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString())
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data.available);
      });
  }

  useEffect(() => {
    fetchAvailablePosts();
  }, []);

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
        // tasks.basketList.push(users[Number(event) - 1]);
        // console.log(tasks.basketList);
        
        const indexOfObject = tasks.available.findIndex((object) => {
          return object.id === event;
        });
        tasks.basketList.unshift(tasks.available[indexOfObject])
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
      router.replace('/home')
  };

  return users.map((element) => {
    return (
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
    );
  });

  // const [users,setUsers] = useState([])
  // useEffect(()=>{
  //     const fetchPosts = async () =>{
  //         const response = await fetch('https://64c881f3a1fe0128fbd5db6f.mockapi.io/available');
  //         const data: User[] = await response.json();
  //         console.log(data);
  //         setUsers(data);
  //         console.log("users1: "+{users});
  //     };
  //     fetchPosts();
  // }, [])

  // console.log("users2: "+users);
  // let available=[];
  // fetch('https://64c881f3a1fe0128fbd5db6f.mockapi.io/available', {
  //     method: 'GET',
  //     headers: {'content-type':'application/json'},
  //     })
  //     .then(res => {
  //     if (res.ok) {
  //         return res.json();
  //     }
  //     // handle error
  //     }).then(tasks => {
  //         // console.log(tasks);
  //         // tasks.map(id => {console.log(id)});
  //         // available = tasks;
  //         // console.log(available)
  //         return (
  //             tasks.map(element => {
  //                 // available.push(element);
  //                 // console.log(available);
  //                     <ImageBackground key={element.id} source={require('../../assets/pot.jpg')} resizeMode="cover" style={{ aspectRatio: 1, borderRadius: 15, marginBottom: 15}} imageStyle={{ borderRadius: 15}}>
  //                         <LinearGradient style={{borderRadius: 15}} colors={['rgba(217,217,217,0)', 'rgba(217,217,217,0.32)', 'rgba(217,217,217,1)']}>
  //                             <View style={{width: '100%', aspectRatio: 1, borderRadius: 15, justifyContent: 'flex-end', display:'flex', padding: 7}}>
  //                                 <Text style={{fontSize: 20, padding: 2, paddingBottom: 3}}>{element.item}</Text>
  //                                 <View style={{flexDirection: 'row', padding: 2}}>
  //                                 <Image source={require('../../assets/icon.png')} style={{ aspectRatio: 1, borderRadius: 15, width: 30,}}></Image>
  //                                 <View style={{paddingLeft: 5}}>
  //                                     <Text style={{fontSize: 12, paddingBottom: 2}}>{element.name}</Text>
  //                                     <Text style={{fontSize: 10}}><Octicons name="star-fill" size={12} color="black" />4.0</Text>
  //                                 </View>
  //                                 </View>
  //                                 <View style={{flexDirection: 'row', display:'flex', justifyContent: 'space-between', padding: 2}}>
  //                                 <Text style={{fontSize: 12, paddingLeft: 1,}}><Entypo name="location-pin" size={20} color="black" />1 mile</Text>
  //                                 <Text style={{fontSize: 12, paddingLeft: 1,}}><Ionicons name="pie-chart-outline" size={20} color="black" />90% new</Text>
  //                                 <Text style={{fontSize: 12, paddingLeft: 1,}}><Ionicons name="calendar-outline" size={20} color="black" />During weekdays</Text>
  //                                 </View>
  //                             </View>
  //                         </LinearGradient>
  //                     </ImageBackground>
  //             })
  //           );

  //     // Do something with the list of tasks
  //     })
  //     console.log(available);
  // return (
  //   transactions.map(element => {
  //     return(
  //         <ImageBackground key={element.itemName} source={require('../../assets/pot.jpg')} resizeMode="cover" style={{ aspectRatio: 1, borderRadius: 15, marginBottom: 15}} imageStyle={{ borderRadius: 15}}>
  //             <LinearGradient style={{borderRadius: 15}} colors={['rgba(217,217,217,0)', 'rgba(217,217,217,0.32)', 'rgba(217,217,217,1)']}>
  //                 <View style={{width: '100%', aspectRatio: 1, borderRadius: 15, justifyContent: 'flex-end', display:'flex', padding: 7}}>
  //                     <Text style={{fontSize: 20, padding: 2, paddingBottom: 3}}>{element.itemName}</Text>
  //                     <View style={{flexDirection: 'row', padding: 2}}>
  //                     <Image source={require('../../assets/icon.png')} style={{ aspectRatio: 1, borderRadius: 15, width: 30,}}></Image>
  //                     <View style={{paddingLeft: 5}}>
  //                         <Text style={{fontSize: 12, paddingBottom: 2}}>{element.lenderName}</Text>
  //                         <Text style={{fontSize: 10}}><Octicons name="star-fill" size={12} color="black" />4.0</Text>
  //                     </View>
  //                     </View>
  //                     <View style={{flexDirection: 'row', display:'flex', justifyContent: 'space-between', padding: 2}}>
  //                     <Text style={{fontSize: 12, paddingLeft: 1,}}><Entypo name="location-pin" size={20} color="black" />1 mile</Text>
  //                     <Text style={{fontSize: 12, paddingLeft: 1,}}><Ionicons name="pie-chart-outline" size={20} color="black" />90% new</Text>
  //                     <Text style={{fontSize: 12, paddingLeft: 1,}}><Ionicons name="calendar-outline" size={20} color="black" />During weekdays</Text>
  //                     </View>
  //                 </View>
  //             </LinearGradient>
  //         </ImageBackground>)
  //   })
  // );
}

export default Post;
