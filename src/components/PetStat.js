import React, { Component } from 'react';
import { TouchableOpacity, Animated, View, Text } from 'react-native';
import { connect } from 'react-redux';
import clamp from 'clamp';

import { Sprite } from './common';

class PetStat extends Component {

  static propTypes = {
    tileWidth: React.PropTypes.number,
    tileHeight: React.PropTypes.number,
    src: React.PropTypes.number,
    steps: React.PropTypes.array,
    statName: React.PropTypes.string
  }

  constructor(props){
    super(props);
    const { tileHeight, tileWidth, statName, steps } = props;
    this.state = {
      fadeAnim: new Animated.Value(0),
      animationState: new Animated.Value(props[statName])
    }

    this.styles = {
      statStyle : {
        fontSize: 18,
        textAlign: 'center'
      },
      statWrapperStyle: {
        borderRadius: Math.min(tileHeight,tileWidth) / 4,
        width: Math.min(tileHeight,tileWidth)/2,
        height: Math.min(tileHeight,tileWidth)/2,
        backgroundColor: 'rgba(50,50,50,0.3)',
        opacity: this.state.fadeAnim,
        justifyContent:'center',
        marginLeft: 19,
        zIndex: 1,
        transform: [{
          translateY: this.state.fadeAnim.interpolate({
            inputRange: [0,1],
            outputRange: [-60,-120]
          })
        }]
      }
    }

    this.onPress = this.onPress.bind(this);

    this.appear = Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    );

    this.disappear = Animated.timing(
      this.state.fadeAnim,
      {toValue: 0}
    );

    this.delayedDisappear = Animated.timing(
      this.state.fadeAnim,
      {toValue: 0, delay: 1000}
    );

  }

  componentWillReceiveProps(nextProps){
    this.state.animationState.setValue(nextProps[nextProps.statName])
  }

  onPress() {
    if(this.state.fadeAnim._value === 1){
      this.disappear.start();
    } else if(this.state.fadeAnim._value === 0) {
      this.appear.start(() => {
        this.delayedDisappear.start();
      });
    }
  }

  render() {
    const { tileWidth, tileHeight, src, steps, statName } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.onPress} style={{zIndex: 2}}>
          <Sprite
          src={src}
          tileWidth={tileWidth}
          tileHeight={tileHeight}
          steps={steps}
          state={Math.round(this.state.animationState.interpolate({
            inputRange: [1,100],
            outputRange: [0, steps.length-1],
            extrapolate: 'clamp',
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          }).__getValue())}
          />
        </TouchableOpacity>
        <Animated.View style={this.styles.statWrapperStyle}>
          <Text style={this.styles.statStyle}>{this.props[statName]}</Text>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { mood, hunger, health, pawPoints } = state.pet;

  return { mood, hunger, health, pawPoints };
};

export default connect(mapStateToProps, {  })(PetStat);
