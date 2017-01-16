import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import * as storage from 'redux-storage';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import debounce from 'redux-storage-decorator-debounce'


import reducers from './reducers';
import Router from './Router';
import { Spinner } from './components/common';
import {UPDATE_STEP_COUNT} from './actions';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
    StatusBar.setHidden(true, 'slide');
    const reducer = storage.reducer(reducers);
    const eng = createEngine('cagif-save-key');
    const engine = debounce(eng, 1500);
    const middleware = storage.createMiddleware(engine,[UPDATE_STEP_COUNT]);
    const createStoreWithMiddleware = applyMiddleware(middleware,ReduxThunk)(createStore);
    this.store = createStoreWithMiddleware(reducer);

    const load = storage.createLoader(engine);
    load(this.store)
      .then((newState) => this.setState({loaded: true}))
      .catch(() => console.log('Error loading state from async storage'))

  }

  render() {
    if(this.state.loaded){
      return (
        <Provider store={this.store}>
          <Router />
        </Provider>
      );
    } else {
      return (
        <Spinner />
      );
    }

  }


}


export default App;
