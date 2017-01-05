import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from './common';
import { merchandise } from '@assets/images';

class Merchandise extends Component {

  render() {
    const {name, onPress, buttonText, disabled} = this.props;
    return (
      <View style={styles.containerStyle}>
        <Image
          source={merchandise[name]}
          style={styles.imageStyle}
        />
        <Text style={styles.key}>{this.beautifyName(name)}</Text>
        <Button style={styles.buttonStyle} onPress={onPress} disabled={disabled}>{buttonText}</Button>
      </View>
    );
  }

  beautifyName(name){
    return name.replace("_", " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}

const styles = {
  containerStyle: {
    width: 105,
    height: 160,
    margin: 10,
    paddingTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(45,134,189,0.7)',
    borderColor: 'rgba(5,74,149,0.9)',
    borderRadius: 5,
    borderWidth: 3
  },
  imageStyle: {
    width: 64,
    height: 64,
    borderRadius: 10,
    flex: 6
  },
  key: {
    flex: 3,
    textAlign: 'center'
  },
  buttonStyle: {
    flex: 4
  }
}


export default Merchandise;
