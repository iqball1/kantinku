import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {colors, fonts, responsiveWidth, responsiveHeight} from '../../utils';
import {Inputan, Jarak, Tombol} from '../../components';
import {registerUser} from '../../actions/AuthAction';
import {connect} from 'react-redux';

class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alamat: '',
      nohp: '',
      kelas: '',
    };
  }
  componentDidUpdate(prevProps) {
    const {registerResult} = this.props;

    if (registerResult && prevProps.registerResult !== registerResult) {
      this.props.navigation.replace('MainApp');
      Alert.alert('Pendaftaran Sukses', 'Haii, Selamat datang di KantinKu');
    }
  }

  onSave = () => {
    const {alamat, nohp, kelas} = this.state;
    if (alamat && nohp) {
      const data = {
        nama: this.props.route.params.nama,
        email: this.props.route.params.email,
        alamat: alamat,
        nohp: nohp,
        kelas: kelas,
        status: 'user',
      };

      //Ke Auth Action
      this.props.dispatch(registerUser(data, this.props.route.params.password));
    } else {
      Alert.alert('Error', 'Data tidak boleh kosong!');
    }
  };

  render() {
    const {alamat, nohp, kelas} = this.state;
    const {registerLoading} = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.btnBack}>
              <Tombol
                icon="arrow-left"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>

            <View style={styles.logo}>
              <Image
                source={require('../../assets/images/logo-kantinku.png')}
                style={styles.imgLogo}
              />
              <Text style={styles.titlebold}>Daftar</Text>

              <View style={styles.wrapperCircle}>
                <View style={styles.circleDisabled}></View>
                <Jarak width={10} />
                <View style={styles.circlePrimary}></View>
              </View>
            </View>

            <View style={styles.card}>
              <Inputan
                label="No. Handphone"
                value={nohp}
                keyboardType="number-pad"
                onChangeText={nohp => this.setState({nohp})}
                placeholder="*085xxxxxxxxx"
              />
              <Inputan
                label="Alamat"
                textarea
                onChangeText={alamat => this.setState({alamat})}
                value={alamat}
                placeholder="*Isi alamat lengkap anda"
              />
              <Inputan
                label="Kelas"
                onChangeText={kelas => this.setState({kelas})}
                value={kelas}
                placeholder="*Contoh: 12 RPL 2"
              />
              <Jarak height={25} />
              <Tombol
                title="Simpan dan Masuk"
                type="textIcon"
                icon="login"
                padding={10}
                fontSize={18}
                onPress={() => this.onSave()}
                loading={registerLoading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
const mapStatetoProps = state => ({
  registerLoading: state.AuthReducer.registerLoading,
  registerResult: state.AuthReducer.registerResult,
  registerError: state.AuthReducer.registerError,
});

export default connect(mapStatetoProps, null)(Register2);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  logo: {
    alignItems: 'center',
  },
  imgLogo: {
    width: responsiveWidth(200),
    height: responsiveHeight(200),
  },
  titlebold: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  circlePrimary: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.border,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 30,
    position: 'absolute',
  },
});
