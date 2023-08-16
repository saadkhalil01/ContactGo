import { View, Text, SafeAreaView, StyleSheet,StatusBar, TextInput, Image } from 'react-native'
import React from 'react'

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={'#A73C3C'} barStyle={'default'}/>
      <View style={styles.searchBar}>
        <TextInput 
        style={styles.searchBarStyle}
        placeholder='Search here'
        placeholderTextColor='grey'
        backgroundColor='white'
        />
        <Image style={styles.ImageStyle}
         source={require('../ContactGo/Assets/images/search.png')}/>
      </View>
      <View style={styles.ContactArea}></View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#A73C3C',
    justifyContent:'center',
    alignItems:'center'
  },
  searchBar: {
    flex:0.1,
    flexDirection:'row',
    backgroundColor:'#FFFFFF',
    justifyContent:'space-between',
    alignItems:'center',
    width:'90%',
    paddingHorizontal:'4%'
  },
  searchBarStyle:{
    textAlign:'left',
    color:'grey'
  },
  ImageStyle:{
    width:20,
    height:20
  },
  ContactArea: {
    flex:0.9,
    backgroundColor:'#A73C3C'
  },
});