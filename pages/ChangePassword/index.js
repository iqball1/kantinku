import React, {Component} from 'react';
import {Alert, StyleSheet, View, Switch, Text} from 'react-native';
import {colors, getData, responsiveHeight, fonts} from '../../utils';
import {Inputan, Tombol} from '../../components';
import {connect} from 'react-redux';
import {changePassword} from '../../actions/ProfileAction';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      password:'',
      showPassword: true,
      newPassword: '',
      newPasswordConfirmation: '',
    };
  }
  toggleSwitch() {
    this.setState({showPassword: !this.state.showPassword});
  }
  componentDidUpdate(prevProps) {
    const {changePasswordResult} = this.props;

    if (
      changePasswordResult &&
      prevProps.changePasswordResult !== changePasswordResult
    ) {
      Alert.alert('Sukses', 'Sukses Memperbarui Password');
      this.props.navigation.replace('MainApp');
    }
  }
  onSubmit = () => {
    const {password, newPassword, newPasswordConfirmation} = this.state;
    if (newPassword !== newPasswordConfirmation) {
      Alert.alert(
        'Error',
        'Password Baru dan Konfirmsai Password Baru Harus Sama!',
      );
    } else if (password && newPassword && newPasswordConfirmation) {
      getData('user').then(res => {
        const parameter = {
          email: res.email,
          password: password,
          newPassword: newPassword,
        };
        this.props.dispatch(changePassword(parameter));
      });
    } else {
      Alert.alert(
        'Error',
        'Password, Password Baru, dan Konfirmasi Password Baru Harus Diisi!',
      );
    }
  };
  render() {
    const {password, newPassword, newPasswordConfirmation} = this.state;
    const {changePasswordLoading} = this.props;
    return (
      <View style={styles.pages}>
        <View>
          <Inputan
            label="Password Lama"
            secureTextEntry={this.state.showPassword}
            value={password}
            onChangeText={password => this.setState({password})}
          />

          <Inputan
            label="Password Baru"
            secureTextEntry={this.state.showPassword}
            value={newPassword}
            onChangeText={newPassword => this.setState({newPassword})}
          />

          <Inputan
            label="Konfirmasi Password Baru"
            secureTextEntry={this.state.showPassword}
            value={newPasswordConfirmation}
            onChangeText={newPasswordConfirmation =>
              this.setState({newPasswordConfirmation})
            }
          />
          <View style={styles.viewPass1}>
            <View style={styles.viewPass2}>
              <Text style={styles.txtPass}>Show/hide</Text>

              <Switch
                onValueChange={this.toggleSwitch}
                value={!this.state.showPassword}
                thumbColor={!this.state.showPassword ? '#D82047' : '#f4f3f4'}
                trackColor={{false: '#767577', true: '#81b0ff'}}
              />
            </View>
          </View>
        </View>

        <View style={styles.submit}>
          <Tombol
            title="Submit"
            type="textIcon"
            icon="submit"
            padding={responsiveHeight(15)}
            fontSize={18}
            onPress={() => this.onSubmit()}
            loading={changePasswordLoading}
          />
        </View>
      </View>
    );
  }
}
const mapStatetoProps = state => ({
  changePasswordLoading: state.ProfileReducer.changePasswordLoading,
  changePasswordResult: state.ProfileReducer.changePasswordResult,
  changePasswordError: state.ProfileReducer.changePasswordError,
});
export default connect(mapStatetoProps, null)(ChangePassword);
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  submit: {
    marginVertical: 30,
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
