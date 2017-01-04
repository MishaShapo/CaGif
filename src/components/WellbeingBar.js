import React, { Component } from 'react';
import { View } from 'react-native';

import PetStat from './PetStat';

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
          steps={[0,0,0]}
          style={{alignSelf:'flex-end'}}
          statName={"happiness"}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={require('../../graphics/spritesheets/health_spritesheet.png')}
          steps={[0,0,0,0,0]}
          style={{alignSelf:'flex-end'}}
          statName={"health"}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={require('../../graphics/spritesheets/hunger_spritesheet.png')}
          steps={[0,0,0,0]}
          style={{alignSelf:'flex-end'}}
          statName={"hunger"}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={require('../../graphics/icons/coin.png')}
          steps={[0]}
          style={{alignSelf:'flex-end'}}
          statName={"pawPoints"}
        />
      </View>
    );
  }
}
