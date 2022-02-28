import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, fonts, responsiveWidth, responsiveHeight } from '../../../utils';
import Tombol from '../Tombol';
import { numberWithCommas } from '../../../utils'

const CardMenus = ({ Menu, navigation, }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
            <Image source={{uri : Menu.gambar}} style={styles.gambar}/>
                <Text style={styles.text}>{Menu.nama} </Text>
                <Text style={styles.textHarga}>Rp. {numberWithCommas(Menu.harga)}</Text>
            </View>

            <Tombol type="text" title="Detail" padding={7} onPress={() => navigation.navigate('MenuDetail', { Menu })} />
        </View>
    )
};

export default CardMenus

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    card: {
        backgroundColor: 'white',
        elevation: 5,
        width: responsiveWidth(160),
        height: responsiveHeight(230),
        padding: 10,
        borderRadius: 10,
        marginBottom: 10

    },
    gambar: {
        width: 120,
        height: 124,
        alignSelf: 'center'
    },
    text: {
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 5
    },
    textHarga: {
        fontSize: 13,
        paddingLeft: 5,
        paddingTop: 3,
        color:colors.primary,
        fontFamily:fonts.primary.bold
    }
})
