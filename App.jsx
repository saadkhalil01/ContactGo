import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
  PermissionsAndroid,
}
  from 'react-native';
import React, { useState, useEffect } from 'react';
import ContactCard from './Components/ContactCard';
import { responsiveWidth } from "react-native-responsive-dimensions";
import Contacts from 'react-native-contacts';

export default function App() {

  const [list, setList] = useState([]);
  const [target, setTarget] = useState('');
  const [find, setFind] = useState(false);

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
          (contact) => {
            const uniqueContacts = contact.filter(contact => !list.some(item => item.id === contact.id));
            const updatedList = ([...list, ...uniqueContacts]);
            updatedList.sort((a, b) => {
              if (a.displayName > b.displayName) {
                return 1;
              } else {
                return -1;
              }
            });
            setList(updatedList);
          }
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
          onChangeText={(text) => { setTarget(text); setFind(true) }}
          value={target}
        />

        <Image style={styles.ImageStyle}
          source={require('../ContactGo/Assets/images/search.png')} />


      </View>
      <ScrollView style={styles.ContactArea}>
        {
          find ? (
            list.filter(item => { return item.displayName && item.displayName.toUpperCase().includes(target.toUpperCase()) })
              .map((item, index) => (
                <ContactCard key={index} name={item.displayName || 'NULL'} 
                number={item.phoneNumbers && item.phoneNumbers.length > 0
                  ? item.phoneNumbers[0].number
                  : 'No number'
              } />
              ))
          )
            : (
              list.map((item, index) => (
                <ContactCard key={index} name={item.displayName || 'NULL'}
                 number={item.phoneNumbers && item.phoneNumbers.length > 0
                    ? item.phoneNumbers[0].number
                    : 'No number'
                } />
              ))
            )
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
    borderWidth: 1,
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
  }
});