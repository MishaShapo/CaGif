import React, { Component } from 'react';
import { Image, Dimensions, Text } from 'react-native';
import { Loop, Stage, Sprite } from 'react-game-kit/native';

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
              <Sprite
                src={require("../graphics/spritesheets/cat_spritesheet.png")}
                tileHeight={185}
                tileWidth={210}
                steps={[9,9,7,9]}
                state={1}
                repeat
                ticksPerFrame={5}
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
  }
}

export default App;
