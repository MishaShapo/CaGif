import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Loop, Stage } from 'react-game-kit/native';
import HitBoxSprite from './common/HitBoxSprite';

export default class Home extends Component {
  render() {
    const { width, height } = Dimensions.get('window');
    return (
        <Loop style={styles.loopStyle}>
          <Stage style={styles.stageStyle} width={width} height={height}>
            <Image
              source={require('../../graphics/background_real.png')}
              style={styles.bgStyle}
            >
              <HitBoxSprite
              style = {styles.characterStyle}
              left = {width/2-105}
              top = {height/2-92}
              src = {require("../../graphics/spritesheets/cat_spritesheet.png")}
              tileWidth = {210}
              tileHeight = {185}
              steps = {[9,9,7,9]}
              touchStart={(sprite) => this.touchStart(sprite)}
              touchEnd={ (sprite) => this.touchEnd(sprite)}
              hitBox={{
                left:210/2-55,
                top:185/2-70,
                width: 95,
                height: 145
              }}
              />
            </Image>
          </Stage>
        </Loop>
    );
  }

  touchStart(hbs){
    hbs.setAnimationState(spriteAnimations.JUMP);
  }

  touchEnd(hbs){
    hbs.setAnimationState(spriteAnimations.IDLE);
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
    position: 'relative'
  }
}
