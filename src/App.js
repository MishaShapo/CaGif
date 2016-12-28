import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Loop, Stage } from 'react-game-kit/native';
import HitBoxSprite from './components/common/HitBoxSprite';

class App extends Component {
  render() {
    const { width, height } = Dimensions.get('window');
    return (
        <Loop style={styles.loopStyle}>
          <Stage style={styles.stageStyle} width={width} height={height}>
            <Image
              source={require('../graphics/background.png')}
              style={styles.bgStyle}
            >
              <HitBoxSprite
              style = {styles.characterStyle}
              left = {width/2 - 105}
              top = {height/2 - 92}
              src = {require("../graphics/spritesheets/cat_spritesheet.png")}
              tileWidth = {210}
              tileHeight = {185}
              steps = {[9,9,7,9]}
              touchStart={ () => {console.log('touchStart')}}
              touchMove={ () => {console.log('touchMove')}}
              touchEnd={ () => {console.log('touchEnd')}}
              hitBox={{
                left:105 - 30,
                top: 92 - 30,
                width: 60,
                height: 60
              }}
              />
            </Image>
          </Stage>
        </Loop>
    );
  }
}

const styles = {
  loopStyle: {
    flex: 1
  },
  stageStyle: {
    flex: 1,
    position: 'relative'
  },
  bgStyle: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  characterStyle: {
    borderWidth: 5,
    borderColor: 'blue'
  }
}

export default App;
