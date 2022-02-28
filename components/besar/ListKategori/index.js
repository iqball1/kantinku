import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import kategori from '../../../reducers/kategori'
import { CardKategori } from '../../kecil'
import { colors } from '../../../utils'
import { fonts } from '../../../utils'


const ListKategori = ({ getKategoriError, getKategoriLoading, getKategoriResult, navigation }) => {
    return (
        <View style={styles.container}>

            {getKategoriResult ? (
                Object.keys(getKategoriResult).map((key) => {
                    return <CardKategori navigation={navigation} kategori={getKategoriResult[key]} key={key} id={key}/>;
                })
            ) : getKategoriLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            ) : getKategoriError ? (
                <Text>{getKategoriError}</Text>
            ) : (
                <Text style={styles.error}>Data Tidak Ditemukan</Text>
            )}

        </View>
    )
}

const mapStatetoProps = (state) => ({
    getKategoriLoading: state.KategoriReducer.getKategoriLoading,
    getKategoriResult: state.KategoriReducer.getKategoriResult,
    getKategoriError: state.KategoriReducer.getKategoriError,
})

export default connect(mapStatetoProps, null)(ListKategori)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loading: {
        flex: 1,
        marginTop: 10,
    },
    error: {
        fontSize: 20,
        fontFamily: fonts.primary.bold,
        color: colors.border,
        textAlign:'center',
        marginTop:10,
        flex:1
      }
})
