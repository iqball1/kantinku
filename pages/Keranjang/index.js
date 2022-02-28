import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListKeranjang, Tombol} from '../../components';
import {
  colors,
  fonts,
  getData,
  numberWithCommas,
  responsiveHeight,
} from '../../utils';
import {connect} from 'react-redux';
import {getListKeranjang} from '../../actions/KeranjangAction';

class Keranjang extends Component {
  componentDidMount() {
    getData('user').then(res => {
      if (res) {
        // Sudah Login
        this.props.dispatch(getListKeranjang(res.uid));
      } else {
        // Jika User Belum Login, Kembali ke Login Page
        this.props.navigation.replace('Login');
        Alert.alert('ERROR', 'Silahkan Login Terlebih Dahulu');
      }
    });
  }

  componentDidUpdate(prevProps) {
    const {deleteKeranjangResult} = this.props;

    if (
      deleteKeranjangResult &&
      prevProps.deleteKeranjangResult !== deleteKeranjangResult
    ) {
      getData('user').then(res => {
        if (res) {
          // Sudah Login
          this.props.dispatch(getListKeranjang(res.uid));
        } else {
          // Jika User Belum Login, Kembali ke Login Page
          this.props.navigation.replace('Login');
        }
      });
    }
  }

  render() {
    const {getListKeranjangResult} = this.props;
    return (
      <View style={styles.page}>
        <View style={{height: responsiveHeight(50), marginBottom:20}}>
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: colors.primary,
              paddingHorizontal: 15,
              paddingVertical: 12,
              flexDirection: 'row',
              elevation: 5,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MainApp')}
              style={{}}>
              <Ionicons name="arrow-back" size={25} style={{color: 'white'}} />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              Keranjang
            </Text>
          </View>
        </View>
          <ListKeranjang {...this.props} />
        <View style={styles.footer}>
          {/* Total Harga */}
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga :</Text>
            <Text style={styles.textBold}>
              Rp.
              {getListKeranjangResult
                ? numberWithCommas(getListKeranjangResult.totalHarga)
                : 0}
            </Text>
          </View>

          {/* Tombol  */}
          {getListKeranjangResult ? (
            <Tombol
              title="CheckOut"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="keranjang-putih"
              onPress={() =>
                this.props.navigation.navigate('Checkout', {
                  totalHarga: getListKeranjangResult.totalHarga,
                })
              }
            />
          ) : (
            <Tombol
              title="CheckOut"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="keranjang-putih"
              disabled={true}
            />
          )}
        </View>
      </View>
    );
  }
}
const mapStatetoProps = state => ({
  getListKeranjangLoading: state.KeranjangReducer.getListKeranjangLoading,
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
  getListKeranjangError: state.KeranjangReducer.getListKeranjangError,

  deleteKeranjangLoading: state.KeranjangReducer.deleteKeranjangLoading,
  deleteKeranjangResult: state.KeranjangReducer.deleteKeranjangResult,
  deleteKeranjangError: state.KeranjangReducer.deleteKeranjangError,
});

export default connect(mapStatetoProps, null)(Keranjang);
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 10,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textBold: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
  },
});
