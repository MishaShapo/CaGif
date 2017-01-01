import React, { Component } from 'react';
import { Navigator, Image, TouchableOpacity } from 'react-native';
import Home from './components/Home';
import Store from './components/Store';
import Backpack from './components/Backpack';
import LoginForm from './components/LoginForm';


class RouterComponent extends Component {

  render() {
    const routes = [
        {title: "Home", index: 0},
        {title: "Store", index: 1},
        {title: "Backpack", index: 2},
        {title: "Auth", index: 3}
    ];

    return(
      <Navigator
        initialRoute={routes[3]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          switch (route.title) {
            case "Home":
            default:
              return (<Home />);
            case "Store":
              return (<Store />);
            case "Backpack":
              return (<Backpack />);
            case "Auth":
              return (<LoginForm navigator={navigator}/>);
          }
        }}
        configureScene={(route, routeStack) => {
          if(routeStack !== undefined){ //From Home to Store/Backpack
            if(route.title === "Store") {
              return Navigator.SceneConfigs.HorizontalSwipeJump;
            } else {
              return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
            }
          } else { //From Store/Backpack to Home
            if(route.title === "Store") {
              return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
            } else {
              return Navigator.SceneConfigs.HorizontalSwipeJump;
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
                            navigator.push(routes[2]);
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
                    default:
                      return null;
                  }
                },
                RightButton: (route,navigator) => {
                  switch (route.title) {
                    case "Home":
                      return (
                        <TouchableOpacity onPress={() => {
                            navigator.push(routes[1]);
                        }}>
                          <Image
                            source={require('../graphics/icons/store_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchableOpacity>
                      );
                    case "Store":
                    default:
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

export default RouterComponent;
