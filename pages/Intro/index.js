import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {colors, responsiveWidth, responsiveHeight} from '../../utils';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Intro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRealApp: false,
      slider: [
        {
          key: 'one',
          title: 'Selamat datang di Kantinku!',
          description: 'Aplikasi resmi dari Kantin kantinku SMKN 2 Surabaya',
          image: require('../../assets/intro/online-order.png'),
          backgroundColor: 'white',
        },
        {
          key: 'two',
          title: 'Pesan makan dan belanja',
          description: 'Butuh sesuatu atau lapar waktu jam istirahat?',
          description2: 'Pesan lewat kantinku aja',
          image: require('../../assets/intro/food-delivery.png'),
          title2: 'KANTINKU',
          backgroundColor: 'white',
        },
        {
          key: 'three',
          title: 'Cepat dan mudah',
          description: 'Aplikasi yang bikin kamu gak ribet lagi',
          description2: 'Tinggal pesan, tunggu, ambil, dan bayar',
          image: require('../../assets/intro/food-delivery.png'),
          title2: 'KANTINKU',
          backgroundColor: 'white',
        },
      ],
      target: 'Login',
    };
  }
  _renderItem = ({item}) => {
    return (
      <>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.textRed, {fontSize: 20, fontWeight: 'bold'}]}>
              {item.title}
            </Text>
          </View>

          <View style={{alignItems: 'center', marginTop: 12}}>
            <Text style={styles.textRed}>{item.description}</Text>
          </View>

          <View style={{alignItems: 'center', marginTop: 3}}>
            <Text style={styles.textRed}>{item.description2}</Text>
          </View>

          <View style={styles.imgDummy}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={{height: '100%', width: '100%'}}
            />
          </View>

          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text style={[styles.title2]}>{item.title2}</Text>
          </View>
        </SafeAreaView>
      </>
    );
  };
  _renderNextButton = () => {
    return (
      <View style={styles.buttonNext}>
        <Text style={{color: colors.white, fontSize: 16}}>Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonDone}>
        <Text style={{color: colors.white, fontSize: 16, marginHorizontal: 12}}>
          Selesai
        </Text>
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    let dataBaru = this.state.target;
    let navigation = this.props.navigation;
    AsyncStorage.setItem('panduan', '1');
    navigation.navigate(dataBaru);
    this.setState({showRealApp: true});
  };
  render() {
    let slides = this.state.slider;
    if (this.state.showRealApp) {
      return <Intro />;
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          //showNextButton={false}
          renderNextButton={this._renderNextButton}
          // renderPrevButton={this._renderPrevButton}
          activeDotStyle={{backgroundColor: colors.primary}}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imgDummy: {
    width: SCREEN_WIDTH,
    height: responsiveHeight(350),
    marginVertical: responsiveWidth(50),
    paddingHorizontal: 20,
  },
  textRed: {
    color: colors.primary,
    fontSize: 12,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonNext: {
    height: 40,
    width: 50,
    borderRadius: 15 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  buttonDone: {
    height: 40,
    borderRadius: 15 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
