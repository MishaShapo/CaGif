import React, { Component } from 'react';
import { Image } from 'react-native';
import Swiper from 'react-native-swiper';

const Tutorial = (props) => (
    <Swiper style={styles.wrapper} showButtons={true}>
      <Image />
    </Swiper>
);



const styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
};
