import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
}
  from 'react-native';
import React, { useState, useEffect } from 'react';
import ContactCard from './Components/ContactCard';
import { responsiveWidth } from "react-native-responsive-dimensions";
import Contacts from 'react-native-contacts';


export default function App() {

  const RequestContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request
        (PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll().then(
          (contact) => { setList([...list, ...contact]) }
        ).catch(err)
        console.log(err)
      }
      else {
        console.log(granted)
      }
    }
    catch (err) {
      return err;
    }
  };
  
  const [list, setList] = useState([]);
   
  useEffect(() => {
    RequestContacts();
  }, []);
  
  return (
    <SafeAreaView style={styles.mainContainer} >
      <StatusBar backgroundColor={'#A73C3C'} barStyle={'default'} />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarStyle}
          placeholder='Search here'
          placeholderTextColor='grey'
          backgroundColor='white'
        />
        <TouchableOpacity>
          <Image style={styles.ImageStyle}
            source={require('../ContactGo/Assets/images/search.png')} />
        </TouchableOpacity>

      </View>
      <ScrollView style={styles.ContactArea}>
        {
          list.map((item,index)=>(<ContactCard key={index} name={(item.displayName)?item.displayName:name="NULL"}/>))
        }
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#A73C3C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveWidth(92),
    paddingHorizontal: responsiveWidth(3),
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: '2%'
  },
  searchBarStyle: {
    textAlign: 'left',
    color: 'grey',
    width: '90%',
    height: '100%'
  },
  ImageStyle: {
    width: 20,
    height: 20
  },
  ContactArea: {
    flex: 0.9,
    backgroundColor: '#A73C3C'
  },
});