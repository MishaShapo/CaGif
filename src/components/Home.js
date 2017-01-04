import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';
import { Loop, Stage } from 'react-game-kit/native';
import {HitBoxSprite} from './common';
import WellbeingBar from './WellbeingBar';
import { sprites, staticImages } from '@assets/images';

export default class Home extends Component {
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
              touchStart={(sprite) => this.touchStart(sprite)}
              touchEnd={ (sprite) => this.touchEnd(sprite)}
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
    position: 'relative',
    flex:7
  },
  wellbeingBarStyle: {
    height: 166,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
}
