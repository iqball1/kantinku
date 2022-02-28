import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Slider2, Slider } from '../../../assets';
import { SliderBox } from 'react-native-image-slider-box';
import { colors, responsiveHeight, responsiveWidth } from '../../../utils';

export default class BannerSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [ Slider, Slider2 ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          autoplay
          circleLoop
          sliderBoxHeight={responsiveHeight(170)}
          ImageComponentStyle={styles.slider}
          dotStyle={styles.dotStyle}
          dotColor={colors.primary}
          imageLoadingColor={colors.primary}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:10
  },
  dotStyle: {
    width: 10,
    height: 5,
    borderRadius:5
  },
  slider: {
    borderRadius: 10,
    width: responsiveWidth(370)
},
});
