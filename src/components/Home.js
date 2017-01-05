import React, { Component } from 'react';
import { Image, Dimensions, View, Animated } from 'react-native';
import { Loop, Stage } from 'react-game-kit/native';
import { connect } from 'react-redux';

import {HitBoxSprite} from './common';
import WellbeingBar from './WellbeingBar';
import { sprites, staticImages } from '@assets/images';

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      animationState: spriteAnimations.IDLE,
      jumping: false
    };

    this.getAnimationState = this.getAnimationState.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View
        style={{flex: 1}}
      >
        <Loop style={styles.loopStyle}>
          <Stage style={styles.stageStyle} width={width} height={height}>
            <Image
              source={staticImages.petBackground}
              style={styles.bgStyle}
            >
              <HitBoxSprite
              style = {styles.characterStyle}
              left = {width/2-105}
              top = {height/2-92}
              src = {sprites.petSprite}
              tileWidth = {210}
              tileHeight = {185}
              steps = {[9,9,7,9]}
              animationState={this.state.animationState}
              touchStart={this.touchStart}
              touchEnd={this.touchEnd}
              hitBox={{
                left:210/2-55,
                top:185/2-70,
                width: 95,
                height: 145
              }}
              />
              <WellbeingBar style={styles.wellbeingBarStyle}/>
            </Image>
          </Stage>
        </Loop>
      </View>
    );
  }

  getAnimationState(health){
    if(this.state.jumping){
      return this.setState({animationState: spriteAnimations.JUMP});
    } else if( health > 50){
      return this.setState({animationState: spriteAnimations.IDLE});
    } else {
      return this.setState({animationState: spriteAnimations.HURT});
    }
  }

  componentWillReceiveProps(nextProps){
    this.getAnimationState(nextProps.health);
  }

  touchStart(){
    this.setState({
      jumping: true
    },() => this.getAnimationState(this.props.health));

  }

  touchEnd(){
    this.setState({
      jumping: false
    },() => this.getAnimationState(this.props.health));
  }

}

const spriteAnimations = {
  IDLE: 0,
  WALK: 1,
  JUMP: 2,
  HURT: 3
};

const styles = {
  loopStyle: {
    flex: 1
  },
  stageStyle: {
    flex: 1,
    position: 'relative'
  },
  bgStyle: {
    // flex: 1,
    position: 'relative',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  characterStyle: {
    width: 210,
    height: 185,
    position: 'relative',
    flex:7
  },
  wellbeingBarStyle: {
    height: 84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1
  }
}

const mapStateToProps = (state) => {
  return {...state.pet}
}

export default connect(mapStateToProps)(Home);
