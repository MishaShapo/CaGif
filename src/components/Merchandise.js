import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { merchandise } from '@assets/images';

class Merchandise extends Component {

  render() {
    const {key, comment, price } = this.props.item;
    return (
      <View style={styles.containerStyle}>
        <Image
          source={merchandise[key]}
          style={styles.imageStyle}
        />
        <Text style={styles.item}>{key}</Text>
        <Text style={styles.item}>${price}</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 64,
    height: 65
  }
}

export default Merchandise;
