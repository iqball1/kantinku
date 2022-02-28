import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {CardMenus} from '../../kecil';
import {connect} from 'react-redux';
import {colors, fonts} from '../../../utils';

const ListMenus = ({
  getMenusResult,
  getMenusLoading,
  getMenusError,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {getMenusResult ? (
        Object.keys(getMenusResult).map(key => {
          return (
            <CardMenus
              navigation={navigation}
              Menu={getMenusResult[key]}
              key={key}
            />
          );
        })
      ) : getMenusLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : getMenusError ? (
        <Text>{getMenusError}</Text>
      ) : (
        <Text style={styles.error}>Data Tidak Ditemukan</Text>
      )}
    </View>
  );
};

const mapStatetoProps = state => ({
  getMenusLoading: state.MenusReducer.getMenusLoading,
  getMenusResult: state.MenusReducer.getMenusResult,
  getMenusError: state.MenusReducer.getMenusError,
});

export default connect(mapStatetoProps, null)(ListMenus);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
  error: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
    color: colors.border,
    textAlign: 'center',
    marginTop: 10,
    flex: 1,
  },
});
