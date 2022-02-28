import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform,Image,StyleSheet } from 'react-native';
import {colors, fonts, responsiveHeight} from '../../../utils';

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: colors.white
        }
    }
    render() {
        return (
            <View style={{ height: 50}}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: colors.primary, zIndex: 1, position: 'absolute',elevation:5 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, fontFamily:fonts.primary.bold, color: colors.white, }}>{this.props.title}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({

})