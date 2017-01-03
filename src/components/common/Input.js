import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';

class Input extends Component {

  render() {
    const { label, value, onChangeText, placeholder, secureTextEntry, returnKeyType, onSubmitEditing } = this.props;

    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
      <View style={containerStyle} onPress={this.onPress}>
          <Text style={labelStyle}>{label}</Text>
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
          />
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
