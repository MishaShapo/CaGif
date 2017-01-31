import React, { Component } from 'react';
import { Navigator, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { updateWellbeingStats, updateUpdateTimer } from './actions';


import Home from './components/Home';
import Store from './components/Store';
import Backpack from './components/Backpack';
import LoginForm from './components/LoginForm';
import FitnessData from './components/FitnessData'
import { UPDATE_INTERVAL } from './services/constants';



class RouterComponent extends Component {

  constructor(props) {
    super(props);
    this.updateStats = this.updateStats.bind(this);
    this.configureScene = this.configureScene.bind(this);
  }

  componentDidMount(){
    this.updateStats();
    this.wellbeingTimer = setInterval(this.updateStats,UPDATE_INTERVAL); //every hour
  }

  componentWillUnmount(){
    clearInterval(this.wellbeingTimer);
  }

  updateStats() {
    const {mood, hunger, health, pawPoints, lastUpdate } = this.props;
    const multiplier = Math.round(((Date.now() - lastUpdate) / UPDATE_INTERVAL));
    if((multiplier >= 1) && (mood > 0 && hunger > 0 && health > 0)){
      this.props.updateWellbeingStats({
        "mood": (mood - 2 * multiplier),
        "hunger": (hunger - 3 * multiplier),
        "health": (health - 1 * multiplier)
      });
      this.props.updateUpdateTimer();
    }

  }

  configureScene(route, routeStack){
    if(route.title == "Backpack") {
      return {
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {
          jumpForward: {
            ...Navigator.SceneConfigs.HorizontalSwipeJump.gestures.jumpForward,
            edgeHitWidth: 30
          }
        }
      }
    } else if(route.title == "Store"){
      return {
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {
          jumpBack: {
            ...Navigator.SceneConfigs.HorizontalSwipeJump.gestures.jumpBack,
            edgeHitWidth: 30
          }
        }
      }
    }
    return {
      ...Navigator.SceneConfigs.HorizontalSwipeJump,
      gestures: {
        jumpBack: {
          ...Navigator.SceneConfigs.HorizontalSwipeJump.gestures.jumpBack,
          edgeHitWidth: 30
        },
        jumpForward: {
          ...Navigator.SceneConfigs.HorizontalSwipeJump.gestures.jumpForward,
          edgeHitWidth: 30
        }
      }
    };
  }

  render() {
    const routes = [
      {title: "Backpack"},
      {title: "Home"},
      {title: "Store"}
    ];

    return(
      <Navigator
        initialRoute={routes[1]}
        initialRouteStack={routes}
        sceneStyle={styles.sceneStyle}
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
            case "FitnessData":
              return <FitnessData />
          }
        }}
        configureScene={this.configureScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
                LeftButton: (route,navigator) => {
                  switch (route.title) {
                    case "Home":
                      return (
                        <TouchableOpacity onPress={() => {
                          if(navigator.state.presentedIndex == 1){
                            navigator.jumpBack();
                          }
                        }}>
                          <Image
                            source={require('../graphics/icons/backpack_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchableOpacity>
                      );
                    case "Store":
                      return(
                        <TouchableOpacity onPress={ () =>{
                          if(navigator.state.presentedIndex == 2){
                            navigator.jumpBack();
                          }

                        }}>
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
                          if(navigator.state.presentedIndex == 1){
                            navigator.jumpForward();
                          }

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
                        <TouchableOpacity onPress={() => {
                          if(navigator.state.presentedIndex == 0){
                            navigator.jumpForward();
                          }

                        }}>
                          <Image
                            source={require('../graphics/icons/home_icon.png')}
                            style={styles.navigationIconStyle}
                          />
                        </TouchableOpacity>
                      );
                }
              },
              Title: (route, navigator) => {
                if(route.title === "Store"){
                  return (
                    <Text style={styles.titleStyle}> Store | {this.props.pawPoints} PawPoints</Text>
                  );
                } else{
                  return (
                    <Text style={styles.titleStyle}>{route.title}</Text>
                  );
                }
              }
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
  },
  titleStyle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  sceneStyle: {
    flex:1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
}

const mapStateToProps = state => {
  const { mood, hunger, health, pawPoints } = state.pet.stats;
  const {lastUpdate} = state.pet;

  return { mood, hunger, health, pawPoints, lastUpdate };
};

export default connect(mapStateToProps, { updateWellbeingStats, updateUpdateTimer })(RouterComponent);
