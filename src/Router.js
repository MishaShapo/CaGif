import React, { Component } from 'react';
import { Navigator, Image, TouchalbeOpacity } from 'react-native';
import Home from './components/Home';
import Store from './components/Store';
import Backpack from './components/Backpack';


class RouterComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    console.log("didMount");
    this.setState({
      loading: false
    });
  }

  render() {
    const routes = [
        {title: "Home", index: 0},
        {title: "Store", index: 1},
        {title: "Backpack", index: 2}
    ];

    return(
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route) => {
          switch (route.title) {
            case "Home":
            default:
              return (<Home />);
            case "Store":
              return (<Store />);
            case "Backpack":
              return (<Backpack />);
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
                    default:
                      return (
                        <TouchalbeOpacity onPress={() => {
                            navigator.push(routes[2]);
                        }}>
                          <Image
                            source={require('../graphics/icons/backpack_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchalbeOpacity>
                      );
                    case "Store":
                      return(
                        <TouchalbeOpacity onPress={() => navigator.pop()}>
                          <Image
                            source={require('../graphics/icons/home_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchalbeOpacity>
                      );
                    case "Backpack":
                      return null;
                  }
                },
                RightButton: (route,navigator) => {
                  switch (route.title) {
                    case "Home":
                    default:
                      return (
                        <TouchalbeOpacity onPress={() => {
                            navigator.push(routes[1]);
                        }}>
                          <Image
                            source={require('../graphics/icons/store_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchalbeOpacity>
                      );
                    case "Store":
                      return null;
                    case "Backpack":
                      return (
                        <TouchalbeOpacity onPress={() => navigator.pop()}>
                          <Image
                            source={require('../graphics/icons/home_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchalbeOpacity>
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
