import React, { Component } from 'react';
import { Navigator, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { updateWellbeingStats, getWellbeingStats } from './actions';


import Home from './components/Home';
import Store from './components/Store';
import Backpack from './components/Backpack';
import LoginForm from './components/LoginForm';


class RouterComponent extends Component {

  constructor(props) {
    super(props);
    this.updateStats = this.updateStats.bind(this);
  }

  componentDidMount(){
    this.wellbeingTimer = setInterval(this.updateStats,10000);
  }

  updateStats() {
    const {happiness, hunger, health, pawPoints } = this.props;
    this.props.updateWellbeingStats({
      "happiness": (happiness - 2),
      "hunger": (hunger - 4),
      "health": (health - 1),
      "pawPoints" : (pawPoints + 50)
    });
  }

  render() {
    const routes = [
        {title: "Auth"}
    ];

    return(
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        sceneStyle={{position: 'absolute', left:0,top:0}}
        renderScene={(route, navigator) => {
          switch (route.title) {
            case "Home":
              return <Home />;
            case "Store":
              return <Store />;
            case "Backpack":
              return <Backpack />;
            case "Auth":
              return <LoginForm navigator={navigator} />;
          }
        }}
        configureScene={(route, routeStack) => {
          if(routeStack !== undefined){ //From Home to Store/Backpack
            if(route.title === "Store") {
              return {
                ...Navigator.SceneConfigs.HorizontalSwipeJump,
                gestures: {}
              }
            } else {
              return {
                ...Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft,
                gestures: {}
              }
            }
          } else { //From Store/Backpack to Home
            if(route.title === "Store") {
              return {
                ...Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft,
                gestures: {}
              }
            } else {
              return {
                ...Navigator.SceneConfigs.HorizontalSwipeJump,
                gestures: {}
              }
            }
          }
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
                LeftButton: (route,navigator) => {
                  switch (route.title) {
                    case "Home":
                      return (
                        <TouchableOpacity onPress={() => {
                            navigator.push({title: "Backpack"});
                        }}>
                          <Image
                            source={require('../graphics/icons/backpack_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchableOpacity>
                      );
                    case "Store":
                      return(
                        <TouchableOpacity onPress={() => navigator.pop()}>
                          <Image
                            source={require('../graphics/icons/home_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchableOpacity>
                      );
                    case "Backpack":
                      return null;
                  }
                },
                RightButton: (route,navigator) => {
                  switch (route.title) {
                    case "Home":
                      return (
                        <TouchableOpacity onPress={() => {
                            navigator.push({title: "Store"});
                        }}>
                          <Image
                            source={require('../graphics/icons/store_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchableOpacity>
                      );
                    case "Store":
                      return null;
                    case "Backpack":
                      return (
                        <TouchableOpacity onPress={() => navigator.pop()}>
                          <Image
                            source={require('../graphics/icons/home_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchableOpacity>
                      );
                }
              },
              Title: () => {null}
            }}
          />
        }
      />
    );
  }
}

const styles = {
  navigationIconStyle : {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20
  },
  navigationBarStyle: {
    backgroundColor:'#007bff',
    borderBottomWidth: 0
  }
}

const mapStateToProps = state => {
  const { happiness, hunger, health, pawPoints } = state.pet;

  return { happiness, hunger, health, pawPoints };
};

export default connect(mapStateToProps, { updateWellbeingStats, getWellbeingStats })(RouterComponent);
