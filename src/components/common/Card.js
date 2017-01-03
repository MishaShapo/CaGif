import React from 'react';
import { View } from 'react-native';

const Card = (props) =>
  (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );

const styles = {
  containerStyle: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'rgba(100,100,100,0.7)',
    borderBottomWidth: 3,
    borderTopWidth: 1,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
