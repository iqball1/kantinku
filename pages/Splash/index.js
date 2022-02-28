import React, {Component} from 'react';
import {StyleSheet, View, Image, StatusBar, Alert} from 'react-native';
import {colors, getData} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser} from '../../actions/AuthAction';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('MainApp')
    }, 1000);
  }

  render() {
    return (
      <View style={styles.pages}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

        <Image
          source={require('../../assets/images/logo-kantinku.png')}
          style={{height: 150, width: 150}}
        />
      </View>
    );
  }
}
export default Splash;
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
