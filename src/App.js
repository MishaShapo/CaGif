import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Router from './Router';

class App extends Component {

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDSvjanQGqsN8NHaUlOdBOh18olZSzC-hk",
      authDomain: "cagif-a15cb.firebaseapp.com",
      databaseURL: "https://cagif-a15cb.firebaseio.com",
      storageBucket: "cagif-a15cb.appspot.com",
      messagingSenderId: "830656814906"
    };
    firebase.initializeApp(config);
  }

  render() {
    StatusBar.setHidden(true, 'slide');
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
export default App;
