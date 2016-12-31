import React, { Component } from 'react';
import { TouchableOpacity, Animated, View, Text } from 'react-native';
import Sprite from './Sprite';

export default class PetStat extends Component {

  static propTypes = {
    tileWidth: React.PropTypes.number,
    tileHeight: React.PropTypes.number,
    src: React.PropTypes.number,
    statValue: React.PropTypes.node,
    steps: React.PropTypes.array
  }

  constructor(props){
    super(props);
    const { tileHeight, tileWidth } = props;
    this.state = {
      statValue: this.props.statValue || "",
      fadeAnim: new Animated.Value(0)
    }
    this.styles = {
      statStyle : {
        fontSize: 18,
        alignSelf: 'center'
      },
      statWrapperStyle: {
        borderRadius: Math.min(tileHeight,tileWidth) / 4,
        width: Math.min(tileHeight,tileWidth)/2,
        height: Math.min(tileHeight,tileWidth)/2,
        backgroundColor: 'rgba(50,50,50,0.3)',
        opacity: this.state.fadeAnim,
        justifyContent:'center',
        marginLeft: 19,
        transform: [{
          translateY: this.state.fadeAnim.interpolate({
            inputRange: [0,1],
            outputRange: [50,10]
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
      {toValue: 1}
    );

    this.delayedDisappear = Animated.timing(
      this.state.fadeAnim,
      {toValue: 0, delay: 1000}
    );

  }

  onPress() {
    if(this.state.fadeAnim._value === 1){
      this.disappear.start();
    } else {
      this.appear.start(() => {
        this.delayedDisappear.start();
      });
    }
  }

  render() {
    const { tileWidth, tileHeight, src, steps } = this.props;
    return (
      <View>
        <Animated.View style={this.styles.statWrapperStyle}>
          <Text style={this.styles.statStyle}>{this.state.statValue}</Text>
        </Animated.View>
        <TouchableOpacity onPress={this.onPress}>
          <Sprite
          src={src}
          tileWidth={tileWidth}
          tileHeight={tileHeight}
          steps={steps}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
