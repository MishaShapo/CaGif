import React from 'react';
import { View, Text, Image } from 'react-native';

import { staticImages } from '@assets/images';

const StatChangeBar = ({stat, imageSource}) => {

  const { statsWrapperStyle, progressStyle, barStyle, textStyle} = styles;
  return (
    <View style={statsWrapperStyle}>
      <Image
        source={staticImages[imageSource]}
      />
      <View style={[progressStyle, {borderColor: (stat < 0) ? '#e04435' : 'limegreen'}]}>
        <View
          style={[barStyle,{
            width: Math.abs(stat) * 2,
          }]}
          backgroundColor={(stat < 0) ? '#e04435' : 'limegreen'}
        />
        <Text style={[textStyle,{
          left: (Math.abs(stat) * 2 < 160) ? Math.abs(stat) * 2 : Math.abs(stat) * 2 - 40,
          fontWeight: 'bold'
        }]}>{((stat < 0) ? "-" : "+") + Math.abs(stat)}</Text>
      </View>
    </View>
  );
}

const styles = {
  statsWrapperStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontSize: 18,
    color: 'black'
  },
  progressStyle: {
    position: 'relative',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 3,
    width: 200,
    height: 40,
    alignSelf: 'center',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  barStyle: {
    position: 'absolute',
    height: 40,
    justifyContent: 'center'
  }
}

export default StatChangeBar;
