import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {getMenusByKategori} from '../../../actions/MenusAction';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';

const CardKategori = ({kategori, navigation, id, dispatch}) => {
  const toMenusByKategori = (id, namaKategori) => {
    dispatch(getMenusByKategori(id, namaKategori));

    // Navigate ke Menu
    navigation.navigate('Menu');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => toMenusByKategori(id, kategori.namaKategori)}>
      <Image source={{uri: kategori.image}} style={styles.logo} />
      <Text style={styles.textKategori}>{kategori.namaKategori}</Text>
    </TouchableOpacity>
  );
};

export default connect()(CardKategori);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    marginHorizontal:2,
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveHeight(70),
    borderRadius: 35,
  },
  textKategori: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    paddingTop: 2,
  },
});
