import React from 'react';
import {View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { deleteParameterMenus } from '../../../actions/MenusAction';
import { colors } from '../../../utils';
import TabItem from '../TabItem';

const BottomNavigator = ({state, descriptors, navigation, dispatch}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          if(route.name !== 'Menu'){
            dispatch(deleteParameterMenus())
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            label={label}
            isFocused={isFocused}
            onLongPress={onLongPress}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

export default connect() (BottomNavigator);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height:65,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    marginBottom: 20,
    marginHorizontal: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'space-between',
    alignItems:'center'
  },
});
