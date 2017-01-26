import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Animated, View, Text } from 'react-native';
import debounce from 'lodash/debounce';
import { MIN_STAT_VALUE } from '../services/constants';

import { Sprite } from './common';

class PetStat extends Component {

  static propTypes = {
    tileWidth: PropTypes.number,
    tileHeight: PropTypes.number,
    src: PropTypes.number,
    steps: PropTypes.array,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object,
    textColor: PropTypes.string
  }

  constructor(props){
    super(props);
    const { value } = props;
    this.state = {
      fadeAnim: new Animated.Value(0),
      animationState: new Animated.Value(parseInt(value)),
      textColor: "#111",
      backgroundColor: null
    }
    if(this.props.onPress === undefined){
      this.onPress = this.onPress.bind(this);
    } else {
      this.onPress = this.props.onPress;
    }

    this.delayedAnimateStat = debounce(this.animateStat.bind(this),1000,{leading:true});

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
    // console.log('pet stat receiving props');
    this.delayedAnimateStat(nextProps);
  }

  animateStat(nextProps){
    this.setState( (prevState, props) => {
      if(nextProps.value.toString().startsWith("+") || nextProps.value.toString().startsWith("-")){
        this.appear.start(() => {
          this.delayedDisappear.start();
        });
        return {
          textColor: (nextProps.value.toString().startsWith("+")) ? "rgba(50, 205, 50,0.9)": "rgba(224, 68, 53,0.9)"
        }
      } else if(nextProps.value < MIN_STAT_VALUE){
        return {
          textColor: "rgb(255, 0, 0)"
        }
      }
      else {
        return {
          textColor: "rgba(17, 17, 17,0.9)"
        }
      }
    });
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
    const { tileWidth, tileHeight, src, steps, value, style } = this.props;
    const { statWrapperStyle, statStyle } = styles;
    return (
      <View style={style}>
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
        <Animated.View style={[statWrapperStyle,{
          opacity: this.state.fadeAnim,
          transform: [{
            translateY: this.state.fadeAnim.interpolate({
              inputRange: [0,1],
              outputRange: [-60,-120]
            })
          }]
        }]}>
          <Text style={[statStyle,{
            color: this.state.textColor
          }]}>{value}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  statStyle : {
    fontSize: 18,
    textAlign: 'center'
  },
  statWrapperStyle: {
    borderRadius: 6,
    width: 50,
    left: 0,
    height: 50,
    backgroundColor: "#3232324c",
    justifyContent: 'center',
    zIndex: 1
  }
}
//
// const mapStateToProps = state => {
//   const { mood, hunger, health, pawPoints } = state.pet.stats;
//
//   return { mood, hunger, health, pawPoints };
// };

export default PetStat;
