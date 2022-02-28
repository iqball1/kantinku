import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors, fonts, responsiveHeight} from '../../../utils';
import {IconCari} from '../../../assets';
import {Jarak, Tombol} from '../../kecil';
import {connect} from 'react-redux';
import {saveKeywordMenu} from '../../../actions/MenusAction';
import {getData} from '../../../utils';
import {getListKeranjang} from '../../../actions/KeranjangAction';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    getData('user').then(res => {
      if (res) {
        this.props.dispatch(getListKeranjang(res.uid));
      }
    });
  }

  selesaiCari = () => {
    const {page, navigation, dispatch} = this.props;
    const {search} = this.state;

    // Action save keyword
    dispatch(saveKeywordMenu(search));

    // Jika di page Home navigate ke Menu
    if (page !== 'Menu') {
      navigation.navigate('Menu');
    }

    this.setState({
      search: '',
    });
  };
  render() {
    const {search} = this.state;
    const {navigation, getListKeranjangResult} = this.props;

    let totalKeranjang;

    if (getListKeranjangResult) {
      totalKeranjang = Object.keys(getListKeranjangResult.pesanans).length;
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          {/* Input Pencarian  */}
          <View style={styles.searchSection}>
            <IconCari />
            <TextInput
              placeholder="*Contoh: mie"
              style={styles.input}
              value={search}
              onChangeText={search => this.setState({search})}
              onSubmitEditing={() => this.selesaiCari()}
            />
          </View>
          <Jarak width={10} />
          <Tombol
            icon="keranjang"
            padding={10}
            onPress={() => navigation.navigate('Keranjang')}
            totalKeranjang={totalKeranjang}
          />
        </View>
      </View>
    );
  }
}
const mapStatetoProps = state => ({
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
});
export default connect(mapStatetoProps, null)(HeaderComponent);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeight(93),
  },
  wrapperHeader: {
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
  input: {
    fontSize: 15,
    fontFamily: fonts.primary.regular,
    flex: 1,
    paddingRight: 25,
  },
});
