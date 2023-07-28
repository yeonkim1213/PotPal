import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableHighlight, ImageBackground } from "react-native";
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Search bar */}
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
        <TouchableHighlight style={{alignItems:'center',justifyContent:'center', borderWidth: 2, width: 50, height: 50, borderRadius: 25, borderColor: '#155A03'}} onPress = {()=>{console.log("Pressed")}} underlayColor = 'transparent'>
              <View>
              <Ionicons name="basket-outline" size={24} color="#155A03" />
              </View>
        </TouchableHighlight>
      </View>


      <ScrollView style = {{flex: 1, margin: 5, padding: 10}}>
        
          <ImageBackground source={require('../assets/pot.jpg')} resizeMode="cover" style={{ aspectRatio: 1, borderRadius: 15}} imageStyle={{ borderRadius: 15}}>
            <LinearGradient style={{borderRadius: 15}} colors={['rgba(217,217,217,0)', 'rgba(217,217,217,0.32)', 'rgba(217,217,217,1)']}>
              <View style={{width: '100%', aspectRatio: 1, borderRadius: 15, justifyContent: 'flex-end', display:'flex', padding: 7}}>
                <Text style={{fontSize: 20, padding: 2, paddingBottom: 3}}>Cooking Pot</Text>
                <View style={{flexDirection: 'row', padding: 2}}>
                  <Image source={require('../assets/icon.png')} style={{ aspectRatio: 1, borderRadius: 15, width: 30,}}></Image>
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

      </ScrollView>

      <View style={{width: '100%', height: 77, position: 'absolute', bottom: 0, zIndex: -1}}>
      <ImageBackground source={require('../assets/menu.png')} resizeMode="cover">
      
      {/* Menu bar */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

        {/* Home Icon */}
        <TouchableHighlight style = {{justifyContent: 'flex-end',}} onPress = {()=>{console.log("Pressed")}} underlayColor = 'transparent'>
          <View style={styles.menuIcon}>
            <Octicons name="home" size={24} color="#155A03" />
            <Text style = {{color: '#155A03'}}>Home</Text>
          </View>
        </TouchableHighlight>

        {/* Activity Icon */}
        <TouchableHighlight style = {{justifyContent: 'flex-end',}} onPress = {()=>{console.log("Pressed")}} underlayColor = 'transparent'>
          <View style={styles.menuIcon}>
            <Octicons name="history" size={24} color="#155A03" />
            <Text style = {{color: '#155A03'}}>Activity</Text>
          </View>
        </TouchableHighlight>

        {/* Add Post Icon */}
        <TouchableHighlight onPress = {()=>{console.log("Pressed")}} underlayColor = 'transparent'>
          <View style={styles.menuIcon}>
            <Ionicons style = {{paddingBottom: '10%'}} name="add-circle-outline" size={35} color="#155A03" />
          </View>
        </TouchableHighlight>

        {/* Inbox Icon */}
        <TouchableHighlight style = {{justifyContent: 'flex-end',}} onPress = {()=>{console.log("Pressed")}} underlayColor = 'transparent'>
          <View style={styles.menuIcon}>
            <Octicons name="inbox" size={24} color="#155A03" />
            <Text style = {{color: '#155A03'}}>Inbox</Text>
          </View>
        </TouchableHighlight>

        {/* Account Icon */}
        <TouchableHighlight style = {{justifyContent: 'flex-end',}} onPress = {()=>{console.log("Pressed")}} underlayColor = 'transparent'>
          <View style={styles.menuIcon}>
            <Octicons name="person" size={24} color="#155A03" />
            <Text style = {{color: '#155A03'}}>Account</Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* <Image source={require('../assets/menu.png')} style={{width: '100%', height: 77, position: 'absolute', bottom: 0, zIndex: -1}}/> */}
      </ImageBackground>
      </View>



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
});
