import React, {Component} from 'react';
import {
  BannerSlider,
  HeaderComponent,
  ListKategori,
  ListMenus,
} from '../../components';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  RefreshControl,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {colors, fonts} from '../../utils';
import {Jarak} from '../../components';
import {connect} from 'react-redux';
import {getKategori} from '../../actions/KategoriAction';
import {limitMenus} from '../../actions/MenusAction';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      confirmOut: false,
      isFocused: true,
    };
  }
  _refresh() {
    this.loadData();
  }
  loadData() {
    this.setState({thisLoading: true});
    this.props.dispatch(getKategori());
    this.props.dispatch(limitMenus());

    this.setState({isLoading: false});
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.dispatch(getKategori());
      this.props.dispatch(limitMenus());

      if (this.state.isFocused) {
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.actionBack.bind(this),
        );
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.actionBack.bind(this),
    );
  }
  actionBack() {
    if (this.state.confirmOut) {
      BackHandler.exitApp();
    } else {
      if (!this.props.navigation.isFocused()) {
        this.props.navigation.goBack();
        return false;
      }

      if (this.props.navigation.isFocused()) {
        ToastAndroid.showWithGravity(
          'Tekan sekali lagi untuk keluar',
          120,
          ToastAndroid.CENTER,
        );
        this.setState({confirmOut: true}, () => {
          setTimeout(() => {
            this.setState({confirmOut: false});
          }, 600);
        });
      }
    }
    return true;
  }

  render() {
    const {navigation} = this.props;
    let {isLoading} = this.state;
    return (
      <View style={styles.page}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <HeaderComponent navigation={navigation} page="Home" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this._refresh.bind(this)}
              colors={[colors.primary]}
            />
          }>
          <View style={styles.BannerSlider}>
            <BannerSlider navigation={navigation} />
          </View>
          <View style={styles.txtKategori}>
            <Text style={styles.boldLabel}>Kategori</Text>
            <View style={styles.kategori}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ListKategori navigation={navigation} />
              </ScrollView>
            </View>
          </View>
          <View style={styles.menu}>
            <Text style={styles.boldLabel}>Menu</Text>
            <ListMenus navigation={navigation} />
          </View>

          <Jarak height={100} />
        </ScrollView>
      </View>
    );
  }
}
export default connect()(Home);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  kategori: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  boldLabel: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
  },
  BannerSlider: {
    flex: 1,
    alignItems: 'center',
  },
  txtKategori: {marginHorizontal: 30, marginTop: 10},
});
