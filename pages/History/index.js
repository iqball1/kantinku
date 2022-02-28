import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { HeaderComponent, ListHistory, Header, Jarak } from '../../components';
import { colors, fonts } from '../../utils';
import { dummyPesanans } from '../../data'

export default class Pesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pesanans: dummyPesanans
    };
  }

  render() {
    const { pesanans } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <ListHistory pesanans={pesanans} />
          <Jarak height={100} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.white },
  container: {
    backgroundColor: colors.white,
    flex: 1
  }
});
