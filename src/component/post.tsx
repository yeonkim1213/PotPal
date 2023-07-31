import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableHighlight, ImageBackground } from "react-native";
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { transactions } from "../user/transactions"; //have fetching already


function Post() {
    return (
      transactions.map(element => {
        return(
          <ImageBackground key={element.itemName} source={require('../../assets/pot.jpg')} resizeMode="cover" style={{ aspectRatio: 1, borderRadius: 15, marginBottom: 15}} imageStyle={{ borderRadius: 15}}>
          <LinearGradient style={{borderRadius: 15}} colors={['rgba(217,217,217,0)', 'rgba(217,217,217,0.32)', 'rgba(217,217,217,1)']}>
              <View style={{width: '100%', aspectRatio: 1, borderRadius: 15, justifyContent: 'flex-end', display:'flex', padding: 7}}>
                  <Text style={{fontSize: 20, padding: 2, paddingBottom: 3}}>{element.itemName}</Text>
                  <View style={{flexDirection: 'row', padding: 2}}>
                  <Image source={require('../../assets/icon.png')} style={{ aspectRatio: 1, borderRadius: 15, width: 30,}}></Image>
                  <View style={{paddingLeft: 5}}>
                      <Text style={{fontSize: 12, paddingBottom: 2}}>{element.lenderName}</Text>
                      <Text style={{fontSize: 10}}><Octicons name="star-fill" size={12} color="black" />4.0</Text>
                  </View>
                  </View>
                  <View style={{flexDirection: 'row', display:'flex', justifyContent: 'space-between', padding: 2}}>
                  <Text style={{fontSize: 12, paddingLeft: 1,}}><Entypo name="location-pin" size={20} color="black" />1 mile</Text>
                  <Text style={{fontSize: 12, paddingLeft: 1,}}><Ionicons name="pie-chart-outline" size={20} color="black" />90% new</Text>
                  <Text style={{fontSize: 12, paddingLeft: 1,}}><Ionicons name="calendar-outline" size={20} color="black" />During weekdays</Text>
                  </View>
              </View>
          </LinearGradient>
      </ImageBackground>)
      })
    );
}


export default Post;