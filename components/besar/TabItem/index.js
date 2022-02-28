import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { colors, fonts } from '../../../utils'
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabItem = ({isFocused, onLongPress, onPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return <Ionicons name='home-outline' size={22} color={isFocused ? 'white' : 'black'}></Ionicons>;
    }

    if (label === 'Menu') {
      return <Ionicons name='reader-outline' size={22} color={isFocused ? 'white' : 'black'}></Ionicons>;
    }

    if (label === 'Profile') {
      return <Ionicons name='person-outline' size={22} color={isFocused ? 'white' : 'black'}></Ionicons>;
    }

    return <Ionicons name='home-outline' size={22} color={isFocused ? 'white' : 'black'}></Ionicons>;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: (isFocused) => ({
    color: isFocused ? colors.white : 'black',
    fontSize: 10,
    marginTop: 4,
    fontFamily: fonts.primary.bold
  })
});
