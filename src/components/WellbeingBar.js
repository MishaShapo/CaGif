import React, { Component } from 'react';
import { View } from 'react-native';

import PetStat from './PetStat';
import { sprites, staticImages } from '@assets/images';

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
          src={sprites.happinessSprite}
          steps={[0,0,0]}
          style={{alignSelf:'flex-end'}}
          statName={"mood"}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={sprites.healthSprite}
          steps={[0,0,0,0,0]}
          style={{alignSelf:'flex-end'}}
          statName={"health"}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={sprites.hungerSprite}
          steps={[0,0,0,0]}
          style={{alignSelf:'flex-end'}}
          statName={"hunger"}
        />
        <PetStat
          tileWidth={83}
          tileHeight={83}
          src={staticImages.coin}
          steps={[0]}
          style={{alignSelf:'flex-end'}}
          statName={"pawPoints"}
        />
      </View>
    );
  }
}
