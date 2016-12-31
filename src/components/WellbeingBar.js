import React, { Component } from 'react';
import { View } from 'react-native';
import PetStat from './common/PetStat';

export default class WellbeingBar extends Component {

  static propTypes = {
    style: React.PropTypes.object
  }

  render() {
    return (
      <View style={{...this.props.style}}>
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={require('../../graphics/spritesheets/happiness_spritesheet.png')}
          statValue={100}
          steps={[0,0,0]}
          style={{alignSelf:'flex-end'}}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={require('../../graphics/spritesheets/health_spritesheet.png')}
          statValue={90}
          steps={[0,0,0,0,0]}
          style={{alignSelf:'flex-end'}}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={require('../../graphics/spritesheets/hunger_spritesheet.png')}
          statValue={10}
          steps={[0,0,0,0]}
          style={{alignSelf:'flex-end'}}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={require('../../graphics/icons/coin.png')}
          statValue={123}
          steps={[0]}
          style={{alignSelf:'flex-end'}}
        />
      </View>
    );
  }
}
