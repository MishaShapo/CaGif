import React, { Component } from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import Home from './components/Home';
import Store from './components/Store';
import Backpack from './components/Backpack';


class RouterComponent extends Component {

  constructor(props){
    super(props);
    this.gotoStore = this.gotoStore.bind(this);
    this.gotoBackpack = this.gotoBackpack.bind(this);
  }

  gotoStore() {
    Actions.StoreParent();
  }

  gotoBackpack(){
    Actions.BackpackParent();
  }
  render() {
    return (
      <Router sceneStyle={{ marginTop: 65 }} >
        <Scene key="HomeParent">
          <Scene
            initial
            key='Home'
            component={Home}
            title='Home'
            rightButtonImage={require('../graphics/icons/store_icon.png')}
            onRight={this.gotoStore}
            leftButtonImage={require('../graphics/icons/inventory_icon.png')}
            onLeft={this.gotoBackpack}

          />
        </Scene>
        <Scene key="StoreParent" direction="horizontal">
          <Scene
            initial
            key='Store'
            component={Store}
            title='Store'
            leftButtonImage={require('../graphics/icons/home_icon.png')}
            onLeft={() => Actions.HomeParent({ type: ActionConst.BACK})}
          />
        </Scene>
        <Scene key="BackpackParent" direction="leftToRight">
          <Scene
            initial
            key='Backpack'
            component={Backpack}
            title='Backpack'
            rightButtonImage={require('../graphics/icons/home_icon.png')}
            onRight={() => Actions.HomeParent({ type: ActionConst.BACK})}
          />
        </Scene>
      </Router>
    );
  }
}

export default RouterComponent;
