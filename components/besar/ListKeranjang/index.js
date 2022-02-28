import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {CardKeranjang} from '../../kecil';
import {fonts, colors, responsiveHeight} from '../../../utils';
import { RFValue } from 'react-native-responsive-fontsize';

const ListKeranjang = ({
  getListKeranjangLoading,
  getListKeranjangResult,
  getListKeranjangError,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {getListKeranjangResult ? (
          Object.keys(getListKeranjangResult.pesanans).map(key => {
            return (
              <CardKeranjang
                keranjang={getListKeranjangResult.pesanans[key]}
                keranjangUtama={getListKeranjangResult}
                key={key}
                id={key}
              />
            );
          })
        ) : getListKeranjangLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : getListKeranjangError ? (
          <Text>{getListKeranjangError}</Text>
        ) : (
         <View style={styles.keranjangKosong}>
            <Text style={styles.error}>Wah, keranjangmu masih kosong, buruan pesan.</Text>
         </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ListKeranjang;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
  error: {
    fontSize: RFValue(13),
    fontFamily: fonts.primary.bold,
    color: colors.border,
    textAlign: 'center',
  },
  keranjangKosong: {
    marginTop: 10,
    flex:1
  }
});
