import React, { Component } from 'react';
import { Navigator, Image, TouchableOpacity, View } from 'react-native';
import Home from './components/Home';
import Store from './components/Store';
import Backpack from './components/Backpack';
import LoginForm from './components/LoginForm';


class RouterComponent extends Component {

  render() {
    const routes = [
        {title: "Auth"}
    ];

    return(
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          switch (route.title) {
            case "Home":
              return <Home />;
            case "Store":
              return <Store merchandise={[1,2,3,4,56,7,67,8,9,0,0,0,0,0,0,654,988,23,53,46,4256,45]} />;
            case "Backpack":
              return <Backpack />;
            case "Auth":
              return <LoginForm navigator={navigator} />;
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

export default RouterComponent;
