import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Jarak, Tombol, ListKeranjang} from '../../components';
import {colors, fonts, numberWithCommas, responsiveHeight} from '../../utils';
import {connect} from 'react-redux';
import {getData} from '../../utils';
import {updatePesanan} from '../../actions/PesananAction';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalHarga: this.props.route.params.totalHarga,
      date: new Date().getTime(),
      profile: false,
    };
  }
  componentDidMount() {
    this.getUserData();
  }
  componentDidUpdate(prevProps) {
    const {updatePesananResult} = this.props;
    if (
      updatePesananResult &&
      prevProps.updatePesananResult !== updatePesananResult
    ) {
      const pesanan = {
        order_id: 'TEST-' + this.state.date + '-' + this.state.profile.uid,
      }
      this.props.navigation.navigate('History', pesanan);
      console.log('Cek data : ', updatePesananResult);
    }
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;

      if (data) {
        this.setState({
          profile: data,
          nama: data.nama,
        });
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };

  pesan = () => {
    const {totalHarga, profile, date} = this.state;

    const data = {
      detail_pemesanan: {
        order_id: 'TEST-' + date + '-' + profile.uid,
        total: parseInt(totalHarga),
      },
      customer_details: {
        first_name: profile.nama,
        email: profile.email,
        phone: profile.nohp,
      },
    };
    if (totalHarga) {
      console.log('Data', data);
      this.props.dispatch(updatePesanan(data));
    } else {
      Alert.alert('Error', 'Maaf pesanan gagal');
    }
  };

  render() {
    const {totalHarga} = this.state;
    const {updatePesananLoading} = this.props;
    return (
      <View style={styles.pages}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.isi}>
            <Text style={styles.textBold}>
              Pastikan Pesanan Anda Sudah Benar!
            </Text>

            <ListKeranjang {...this.props} />

            <Jarak height={50} />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          {/* Total Harga  */}
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga :</Text>
            <Text style={styles.textBold}>
              Rp. {numberWithCommas(totalHarga)}
            </Text>
          </View>

          {/* Tombol  */}
          <Tombol
            title="Pesan"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            onPress={() => this.pesan()}
            loading={updatePesananLoading}
          />
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

  updatePesananLoading: state.PesananReducer.updatePesananLoading,
  updatePesananResult: state.PesananReducer.updatePesananResult,
});
export default connect(mapStatetoProps, null)(Checkout);
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  isi: {
    paddingHorizontal: 30,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  estimasi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingBottom: 30,
  },
});
