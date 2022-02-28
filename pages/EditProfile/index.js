import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  getData,
} from '../../utils';
import {Inputan, Tombol} from '../../components';
import {DefaultImage} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateProfile} from '../../actions/ProfileAction';
import {connect} from 'react-redux';
import {Icon} from 'react-native-vector-icons';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      nama: '',
      email: '',
      nohp: '',
      kelas: '',
      alamat: '',
      avatar: false,
      avatarForDB: '',
      avatarLama: '',
      updateAvatar: false,
    };
  }
  componentDidMount() {
    this.getUserData();
  }
  componentDidUpdate(prevProps) {
    const {updateProfileResult} = this.props;

    if (
      updateProfileResult &&
      prevProps.updateProfileResult !== updateProfileResult
    ) {
      ToastAndroid.showWithGravity(
        'Berhasil Memperbarui Profile',
        120,
        ToastAndroid.CENTER,
      );
      this.props.navigation.replace('MainApp');
    }
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;
      this.setState({
        uid: data.uid,
        nama: data.nama,
        email: data.email,
        nohp: data.nohp,
        alamat: data.alamat,
        kelas: data.kelas,
        avatar: data.avatar,
        avatarLama: data.avatar,
      });
    });
  };

  getImage = () => {
    launchImageLibrary(
      {
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
        selectionLimit: 1,
        cameraType: 'front',
        includeBase64: true,
      },
      response => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          Alert.alert('Informasi', 'Tidak ada foto yang dipilih');
        } else {
          const source = response.assets[0].uri;
          const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
          ToastAndroid.showWithGravity(
            'Berhasil Menambahkan Foto',
            120,
            ToastAndroid.CENTER,
          );
          this.setState({
            avatar: source,
            avatarForDB: fileString,
            updateAvatar: true,
          });
        }
      },
    );
  };

  onSubmit = () => {
    const {nama, nohp, alamat, kelas, avatar} = this.state;
    if ((nama && nohp && alamat, kelas, avatar)) {
      //dispatch update
      this.props.dispatch(updateProfile(this.state));
    } else {
      Alert.alert(
        'Informasi',
        'Pastikan Data dan Foto Profile Sudah diPerbarui.!',
      );
    }
  };


  render() {
    const {nama, email, nohp, alamat, avatar, kelas} = this.state;
    const {updateProfileLoading} = this.props;
    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputFoto}>
            <View style={styles.wrapperUpload}>
              <Image
                source={avatar ? {uri: avatar} : DefaultImage}
                style={styles.foto}
              />

              <View style={styles.tombolGantiFoto}>
                <Tombol
                  title="Ganti Foto"
                  type="text"
                  padding={7}
                  onPress={() => this.getImage()}
                />
              </View>
            </View>
          </View>

          <Inputan
            label="Nama"
            value={nama}
            onChangeText={nama => this.setState({nama})}
          />
          <Inputan label="Email" value={email} disabled />
          <Inputan
            label="No. Handphone"
            value={nohp}
            keyboardType="number-pad"
            onChangeText={nohp => this.setState({nohp})}
          />
          <Inputan
            label="Kelas"
            value={kelas}
            onChangeText={kelas => this.setState({kelas})}
          />
          <Inputan
            label="Alamat"
            value={alamat}
            onChangeText={alamat => this.setState({alamat})}
            textarea
          />

          <View style={styles.submit}>
            <Tombol
              title="Simpan"
              type="textIcon"
              icon="submit"
              padding={responsiveHeight(15)}
              fontSize={18}
              loading={updateProfileLoading}
              onPress={() => this.onSubmit()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStatetoProps = state => ({
  updateProfileLoading: state.ProfileReducer.updateProfileLoading,
  updateProfileResult: state.ProfileReducer.updateProfileResult,
  updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStatetoProps, null)(EditProfile);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 5,
  },
  inputFoto: {
    marginTop: 15,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
  },
  foto: {
    width: responsiveWidth(150),
    height: responsiveHeight(160),
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 10,
  },
  wrapperUpload: {
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'center',
  },
  tombolGantiFoto: {
    textAlign: 'center',
    marginTop: 10,
  },
  submit: {
    marginVertical: 30,
  },
});
