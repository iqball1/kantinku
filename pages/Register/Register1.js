import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Switch,
} from 'react-native';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {Inputan, Jarak, Tombol} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Register1 extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      nama: '',
      email: '',
      password:'',
      showPassword: true,
    };
  }
  toggleSwitch() {
    this.setState({showPassword: !this.state.showPassword});
  }

  onContinue = () => {
    const {nama, email, password} = this.state;
    if (nama && email && password) {
      this.props.navigation.navigate('Register2', this.state);
    } else {
      Alert.alert('Informasi', 'Data tidak boleh kosong!');
    }
  };

  render() {
    const {navigation} = this.props;
    const {nama, email, password} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                label="Nama"
                value={nama}
                onChangeText={nama => this.setState({nama})}
                placeholder="*Masukan nama lengkap anda"
              />
              <Inputan
                label="Email"
                value={email}
                onChangeText={email => this.setState({email})}
                placeholder="*contoh@gmail.com"
              />
              <Inputan
                label="Password"
                value={password}
                secureTextEntry={this.state.showPassword}
                onChangeText={password => this.setState({password})}
                placeholder="*Minimal 6 karakter"
              />
              <View style={styles.viewPass1}>
                <View style={styles.viewPass2}>
                  <Text style={styles.txtPass}>Show/hide</Text>

                  <Switch
                    onValueChange={this.toggleSwitch}
                    value={!this.state.showPassword}
                    thumbColor={
                      !this.state.showPassword ? '#D82047' : '#f4f3f4'
                    }
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                  />
                </View>
              </View>
              <Jarak height={25} />
              <Tombol
                title="Selanjutnya"
                type="textIcon"
                icon="submit"
                padding={10}
                fontSize={18}
                onPress={() => this.onContinue()}
                // loading={registerLoading}
              />
            </View>
            <View style={styles.footer}>
              <View style={{width: 20, height: 2, backgroundColor: 'gray'}} />

              <Text style={{fontSize: 14, marginLeft: 5}}>
                Sudah Punya Akun?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{marginLeft: 5}}>
                <Text
                  style={{fontSize: 14, color: colors.primary, marginRight: 5,marginLeft:2, fontFamily:fonts.primary.bold}}>
                  Masuk
                </Text>
              </TouchableOpacity>

              <View style={{width: 20, height: 2, backgroundColor: 'gray'}} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

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
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 30,

    paddingTop: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  circlePrimary: {
    backgroundColor: colors.border,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  viewPass1: {
    marginTop: 5,
    justifyContent: 'center',
  },
  viewPass2: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtPass: {
    color: colors.border,
    fontSize: 12,
    fontFamily: fonts.primary.bold,
  },
});
