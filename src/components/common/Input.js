import React, { Component } from 'react';
import { TextInput, TouchableWithoutFeedback, Text, View } from 'react-native';

class Input extends Component{

  assignInput(input){
    this.input = input;
  }

  giveFocus() {
    console.log('this.giveFocus',this);
    this.input.focus();
  }

  render(){
    const { label, value, onChangeText, placeholder, secureTextEntry } = this.props;
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
      <TouchableWithoutFeedback style={containerStyle} onPress={this.giveFocus}>
        <View style={containerStyle}>
          <Text style={labelStyle}>{label}</Text>
          <TextInput
            ref={(input) => {this.input = input;}}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </TouchableWithoutFeedback>
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
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
};

export { Input };
