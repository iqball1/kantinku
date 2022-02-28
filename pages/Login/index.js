import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import {Inputan, Jarak, Tombol} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {loginUser} from '../../actions/AuthAction';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      email: '',
      password: '',
      showPassword: true,
    };
  }
  toggleSwitch() {
    this.setState({showPassword: !this.state.showPassword});
  }
  componentDidUpdate(prevProps) {
    const {loginResult} = this.props;

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.navigation.replace('MainApp');
    }
  }

  login = () => {
    const {email, password} = this.state;
    if (email && password) {
      //action
      this.props.dispatch(loginUser(email, password));
    } else {
      Alert.alert('Error', 'Email dan Password harus diisi');
    }
  };

  render() {
    const {navigation, loginLoading} = this.props;
    const {email, password} = this.state;
    return (
      <>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.pages}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.logo}>
              <Image
                source={require('../../assets/images/logo-kantinku.png')}
                style={styles.imgLogo}
              />
              <Text style={styles.titlebold}>Masuk</Text>
            </View>
            <View style={styles.cardLogin}>
              <Inputan
                label="Email"
                placeholder="Email"
                value={email}
                onChangeText={email => this.setState({email})}
              />
              <Inputan
                label="Password"
                secureTextEntry={this.state.showPassword}
                placeholder="Password"
                value={password}
                onChangeText={password => this.setState({password})}
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
                title="Masuk"
                type="text"
                padding={12}
                fontSize={18}
                loading={loginLoading}
                onPress={() => this.login()}
              />
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginVertical: 18,
              }}>
              <View style={{width: 20, height: 2, backgroundColor: 'gray'}} />

              <Text style={{fontSize: 14, marginLeft: 5}}>
                Belum Punya Akun?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register1');
                }}
                style={{marginLeft: 5}}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 14,
                    marginRight: 5,
                    fontFamily: fonts.primary.bold,
                  }}>
                  Daftar
                </Text>
              </TouchableOpacity>

              <View style={{width: 20, height: 2, backgroundColor: 'gray'}} />
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}
const mapStatetoProps = state => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});
export default connect(mapStatetoProps, null)(Login);
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logo: {
    alignItems: 'center',
  },
  imgLogo: {
    width: responsiveWidth(300),
    height: responsiveHeight(300),
  },
  titlebold: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
  cardLogin: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    padding: 30,
    borderRadius: 10,
    marginTop: 10,
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
