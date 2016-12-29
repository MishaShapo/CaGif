import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Home extends Component {
  render() {
    const { containerStyle, textStyle} = styles;
    return (
      <View style={containerStyle}>
        <Text style={textStyle}>Home</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 18,
    flex: 1
  }
}

export default Home ;
