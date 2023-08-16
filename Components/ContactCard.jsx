import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
}
    from 'react-native'
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth
} from "react-native-responsive-dimensions"

export default function ContactCard({ name }) {
    return (
        <View style={styles.MainCardStyle}>
            <Text style={{ color: 'black'}}>{name}</Text>
            <TouchableOpacity>
                <Image style={{ width: 50, height: 50 }} source={require('../Assets/images/phone.png')} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    MainCardStyle: {
        flexDirection: 'row',
        width: responsiveWidth(92),
        height: responsiveHeight(10),
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(3),
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        marginTop:'2%'
    },
});