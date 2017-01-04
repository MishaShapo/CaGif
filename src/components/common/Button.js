import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle,style]}>
      <Text style={textStyle}>
        { children }
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    marginHorizontal: 5,
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  buttonStyle: {
    height: 45,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    margin: 5,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Button };
