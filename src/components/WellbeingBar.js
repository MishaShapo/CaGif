import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import PetStat from './PetStat';
import { sprites, staticImages } from '@assets/images';

export default class WellbeingBar extends Component {

  static propTypes = {
    style: PropTypes.object,
    stats: PropTypes.object,
  }

  render() {
    const { stats,style } = this.props;

    return (
      <View style={style}>
        <PetStat
          tileWidth={44}
          tileHeight={44}
          src={sprites.moodSprite}
          steps={[0,0,0]}
          statKey={"mood"}
          value={stats.mood}
        />
        <PetStat
          tileWidth={50}
          tileHeight={46}
          src={sprites.healthSprite}
          steps={[0,0,0,0,0]}
          statKey={"health"}
          value={stats.health}
        />
        <PetStat
          tileWidth={56}
          tileHeight={40}
          src={sprites.hungerSprite}
          steps={[0,0,0,0]}
          statKey={"hunger"}
          value={stats.hunger}
        />
        <PetStat
          tileWidth={52}
          tileHeight={50}
          src={staticImages.coin}
          steps={[0]}
          statKey={"pawPoints"}
          value={stats.pawPoints}
          onPress={this.props.cashInModal}
        />
      </View>
    );
  }
}
