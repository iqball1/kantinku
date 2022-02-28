import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  ToastAndroid
} from 'react-native';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  heightMobileUI,
  responsiveWidth,
  getData,
} from '../../utils';
import {Inputan, Jarak, Tombol} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {masukKeranjang} from '../../actions/KeranjangAction';
import {connect} from 'react-redux';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class MenuDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Menu: this.props.route.params.Menu,
      jumlah: '',
      catatan: '',
      uid: '',
    };
  }
  componentDidUpdate(prevProps) {
    const {saveKeranjangResult} = this.props;

    if (
      saveKeranjangResult &&
      prevProps.saveKeranjangResult !== saveKeranjangResult
    ) {
      this.props.navigation.navigate('Keranjang');
      ToastAndroid.showWithGravity(
        'Menu berhasil ditambahkan',
        120,
        ToastAndroid.CENTER,
      );
    }
  }

  masukKeranjang = () => {
    const {jumlah} = this.state;
    getData('user').then(res => {
      if (res) {
        // Simpann UID local ke state
        this.setState({
          uid: res.uid,
        });
        //Validasi form
        if (jumlah) {
          // Ke action Keranjang
          this.props.dispatch(masukKeranjang(this.state));
        } else {
          Alert.alert('ERROR', 'Jumlah Harus Diisi!');
        }
      } else {
        Alert.alert('ERROR', 'Silahkan Login Terlebih Dahulu');
        this.props.navigation.replace('Login');
      }
    });
  };
  render() {
    const {navigation, saveKeranjangLoading} = this.props;
    const {Menu, jumlah, catatan} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={40}
              style={{color: 'white'}}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              height: responsiveHeight(250),
              marginVertical: responsiveHeight(50),
              justifyContent: 'center',
            }}>
            {/* <ActivityIndicator size="large" color={colors.border}/> */}
            <Image source={{uri: Menu.gambar}} style={styles.gambar} />
          </View>

          <View style={styles.page}>
            <View style={styles.desc}>
              <Text style={styles.TextNama}>{Menu.nama}</Text>
              <Text style={styles.Text}>Keterangan : {Menu.keterangan}</Text>
              <Text style={styles.Text}>
                Harga : Rp. {numberWithCommas(Menu.harga)}
              </Text>

              <View style={styles.garis} />

              <Inputan
                label="Jumlah"
                keyboardType="number-pad"
                width={responsiveWidth(166)}
                height={responsiveHeight(40)}
                fontSize={13}
                value={jumlah}
                onChangeText={jumlah => this.setState({jumlah})}
              />

              <Jarak height={5} />

              <Inputan
                label="Catatan"
                textarea
                fontSize={15}
                placeholder="*Contoh: Extra pedas ya!"
                value={catatan}
                onChangeText={catatan => this.setState({catatan})}
              />

              <Jarak height={35} />

              <Tombol
                title="Masukan Keranjang"
                type="textIcon"
                icon="keranjang-putih"
                padding={responsiveHeight(17)}
                fontSize={18}
                onPress={() => this.masukKeranjang()}
                loading={saveKeranjangLoading}
              />
              <Jarak height={42} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStatetoProps = state => ({
  saveKeranjangLoading: state.KeranjangReducer.saveKeranjangLoading,
  saveKeranjangResult: state.KeranjangReducer.saveKeranjangResult,
  saveKeranjangError: state.KeranjangReducer.saveKeranjangError,
});

export default connect(mapStatetoProps, null)(MenuDetail);
const styles = StyleSheet.create({
  container: {
    maxHeight: '100%',
    backgroundColor: colors.primary,
  },
  page: {
    backgroundColor: 'white',
    bottom: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '100%',
  },
  button: {
    marginTop: responsiveHeight(20),
    marginLeft: responsiveWidth(15),
    height: 60,
  },
  gambar: {
    width: responsiveWidth(250),
    height: responsiveHeight(250),
    alignSelf: 'center',
  },
  desc: {
    marginHorizontal: 35,
    marginTop: 30,
  },
  TextNama: {
    fontWeight: 'bold',
    fontSize: RFValue(24, heightMobileUI),
    textTransform: 'capitalize',
  },
  Text: {
    fontSize: RFValue(17, heightMobileUI),
  },
  garis: {
    borderWidth: 0.2,
    marginVertical: 10,
  },
  input: {
    height: 90,
    marginVertical: 10,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: RFValue(20, heightMobileUI),
  },
  menu: {
    marginHorizontal: 30,
    marginTop: 10,
  },
});
