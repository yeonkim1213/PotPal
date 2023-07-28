import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableHighlight, ImageBackground } from "react-native";
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


function Post() {
    return (
        <ImageBackground source={require('../../assets/pot.jpg')} resizeMode="cover" style={{ aspectRatio: 1, borderRadius: 15, marginBottom: 15}} imageStyle={{ borderRadius: 15}}>
            <LinearGradient style={{borderRadius: 15}} colors={['rgba(217,217,217,0)', 'rgba(217,217,217,0.32)', 'rgba(217,217,217,1)']}>
                <View style={{width: '100%', aspectRatio: 1, borderRadius: 15, justifyContent: 'flex-end', display:'flex', padding: 7}}>
                    <Text style={{fontSize: 20, padding: 2, paddingBottom: 3}}>Cooking Pot</Text>
                    <View style={{flexDirection: 'row', padding: 2}}>
                    <Image source={require('../../assets/icon.png')} style={{ aspectRatio: 1, borderRadius: 15, width: 30,}}></Image>
                    <View style={{paddingLeft: 5}}>
                        <Text style={{fontSize: 12, paddingBottom: 2}}>Username</Text>
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
        </ImageBackground>
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

export default Post;