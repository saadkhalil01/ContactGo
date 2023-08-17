import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    TouchableOpacity,
    Linking,
}from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight,responsiveWidth} from "react-native-responsive-dimensions"
import Modal from "react-native-modal";

export default function ContactCard({ name, number }) {
    const [inputModal, setInputModal] = useState(false)
    return (
        <>
            <View style={styles.MainCardStyle}>
                <Text style={{ color: 'black' }}>{name}</Text>
                <TouchableOpacity onPress={()=>setInputModal(!inputModal)}>
                    <Image style={{ width: 50, height: 50 }} source={require('../Assets/images/phone.png')} />
                </TouchableOpacity>
            </View>
            <Modal 
                style={{margin:0}}
                animationType='slide'
                transparent={true}
                visible={inputModal}
                onRequestClose={() => setInputModal(!inputModal)}>

                <Pressable onPress={() => setInputModal(!inputModal)} style={styles.modelContainer}>
                        <Pressable style={styles.modalDesign}>
                            <Text style={{color:'#A73C3C',fontSize:24,fontWeight:'700'}}>Call {name}</Text>
                            <Text style={{color:'black',fontSize:24,fontWeight:'300'}}>{number}</Text>
                            <TouchableOpacity 
                            onPress={() => {
                                let phoneNumber = `tel:${number}`;
                                Linking.openURL(phoneNumber);
                            }}
                            
                            style={styles.CallButton}>
                                <Image style={{height:40,width:40}}
                                 source={require('../Assets/images/call.png')}/>
                            </TouchableOpacity>
                        </Pressable>
                </Pressable>

            </Modal>
        </>

    )
}
const styles = StyleSheet.create({
    MainCardStyle: {
        flex:1,
        flexDirection: 'row',
        width: responsiveWidth(92),
        height: responsiveHeight(10),
        justifyContent: 'space-between',
        paddingHorizontal:'5%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '2%',
        elevation: 4
    },
    modelContainer: {
        flex:1,
        backgroundColor: '#A73C3C',
        justifyContent: "center",
        alignItems: "center"
    },
    modalDesign: {
        flexDirection:'column',
        height: 300,
        width: 300,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'black',
        elevation:4,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CallButton:{
        marginTop:'5%',
        backgroundColor:'white',
        borderRadius:60,
        borderWidth:1,
        borderColor:'#A73C3C'
    }
});