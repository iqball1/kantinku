import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  colors,
  fonts,
  getData,
  responsiveHeight,
  responsiveWidth,
  clearStorage,
} from '../../utils';
import {dummyMenu} from '../../data';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {ListMenu} from '../../components';
import {Jarak} from '../../components';
import {DefaultImage} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FIREBASE from '../../config/FIREBASE';

const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      menus: dummyMenu,
      isLoading: false,
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;

      if (data) {
        this.setState({
          profile: data,
        });
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };
  logout = () => {
    this.setState({isLoading: true});

    Alert.alert('Information', 'Apakah anda Ingin Keluar? ', [
      {text: 'Batal', style: 'cancel'},
      {
        text: 'Oke',
        onPress: () => {
          FIREBASE.auth()
            .signOut()
            .then(res => {
              this.setState({isLoading: false});
              console.log('berhasil', res);
            })
            .catch(error => {
              this.setState({isLoading: false});
              // An error happened.
              alert(error);
            });
          clearStorage();
          this.props.navigation.navigate('MainApp');
          this.props.navigation.navigate('Login');
        },
      },
    ]);
  };
  render() {
    const {profile, menus} = this.state;
    return (
      <View style={{maxHeight: '100%', backgroundColor: colors.primary}}>
        {/* <View style={styles.button}>
          <TouchableOpacity onPress={() => this.logout()} style={styles.tombol}>
            <Ionicons
              name="log-out-outline"
              size={35}
              style={{color: 'white', marginLeft:6}}
            />
          </TouchableOpacity>
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: colors.primary,
              height: SCREEN_HEIGHT / 4.3,
            }}
          />
          <View style={styles.container}>
            <Image
              source={profile.avatar ? {uri: profile.avatar} : DefaultImage}
              style={styles.foto}
            />
            <View style={styles.cardProfile}>
              <Text style={styles.nama}>{profile.nama}</Text>
              <Text style={styles.deskripsi}>{profile.nohp}</Text>
              <Text stytle={styles.deskripsi}>{profile.kelas}</Text>
              <Text stytle={styles.deskripsi}>{profile.alamat}</Text>
            </View>
            <ListMenu menus={menus} navigation={this.props.navigation} />
            <Jarak height={responsiveHeight(30)} />
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => this.logout()}
                style={styles.tombol}>
                <Ionicons
                  name="log-out-outline"
                  size={35}
                  style={{color: 'white', marginLeft: 6}}
                />
              </TouchableOpacity>
              <Text style={styles.txtkeluar}>Keluar</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT / 1.3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  foto: {
    width: responsiveWidth(150),
    height: responsiveHeight(160),
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: responsiveWidth(-75),
  },
  cardProfile: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nama: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(24, heightMobileUI),
  },
  deskripsi: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(18, heightMobileUI),
  },
  button: {
    marginRight: responsiveWidth(20),
    alignItems: 'center',
  },
  tombol: {
    backgroundColor: colors.primary,
    borderColor: colors.white,
    height: responsiveHeight(50),
    width: responsiveWidth(50),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    elevation: 5,
  },
  txtkeluar: {
    color: colors.border,
    fontSize: RFValue(10),
    marginTop: 2,
    fontFamily:fonts.primary.bold
  },
});
