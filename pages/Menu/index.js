import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, RefreshControl} from 'react-native';
import {HeaderComponent, ListMenus, ListKategori} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {Jarak} from '../../components';
import {connect} from 'react-redux';
import {getMenus} from '../../actions/MenusAction';
import {getKategori} from '../../actions/KategoriAction';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }
  _refresh() {
    this.loadData();
  }
  loadData() {
    this.setState({thisLoading: true});
    const {idKategori, keyword} = this.props;
    this.props.dispatch(getKategori());
    this.props.dispatch(getMenus(idKategori, keyword));

    this.setState({isLoading: false});
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {idKategori, keyword} = this.props;
      this.props.dispatch(getKategori());
      this.props.dispatch(getMenus(idKategori, keyword));
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const {idKategori, keyword} = this.props;

    if (idKategori && prevProps.idKategori !== idKategori) {
      this.props.dispatch(getMenus(idKategori, keyword));
    }

    if (keyword && prevProps.keyword !== keyword) {
      this.props.dispatch(getMenus(idKategori, keyword));
    }
  }

  render() {
    const {navigation, namaKategori, keyword} = this.props;
    let {isLoading} = this.state;
    return (
      <View style={styles.page}>
        <HeaderComponent navigation={navigation} />
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
          <View style={styles.kategori}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <ListKategori navigation={navigation} />
            </ScrollView>
          </View>
          <View style={styles.pilihMenu}>
            {keyword ? (
              <Text style={styles.label}>
                Cari : <Text style={styles.boldLabel}>{keyword}</Text>
              </Text>
            ) : (
              <Text style={styles.label}>
                Pilih <Text style={styles.boldLabel}>Menu </Text>
                {namaKategori ? namaKategori : 'Yang Anda Inginkan'}
              </Text>
            )}

            {/* <Image source={kategoriImage ? kategoriImage : { uri: kategoriImage.image }} style={styles.gambar} /> */}
            <ListMenus navigation={navigation} />
          </View>
          <Jarak height={100} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  idKategori: state.MenusReducer.idKategori,
  namaKategori: state.MenusReducer.namaKategori,
  kategoriImage: state.MenusReducer.kategoriImage,

  keyword: state.MenusReducer.keyword,
});

export default connect(mapStateToProps, null)(Menu);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  kategori: {
    marginHorizontal: 30,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pilihMenu: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  gambar: {
    width: responsiveWidth(250),
    height: responsiveHeight(250),
    alignSelf: 'center',
  },
});
