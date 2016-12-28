import React, { Component, PropTypes } from 'react';
import {
    PanResponder,
    View
} from 'react-native';
import Sprite from './Sprite';

export default class HitBoxSprite extends Component {

  // static contextTypes = {
  //   loop: PropTypes.object,
  //   scale: PropTypes.number,
  // };

  /*TODO: PanResponder is having changing x-values becaue Sprite actually
    switches x values to create the affect of animation so perhaps try
    accounting for this with Sprite frame state or using a different wrapper?
  */
  constructor(props) {
    super(props);
    console.log('constructor props: ',props,"this",this);
    this.previousLeft = this.props.left;
    this.previousTop = this.props.top;
    this.hitBox = this.props.hitBox;
    this.spriteStyle = {
      style: {
        left: this.previousLeft,
        top: this.previousTop,
        ...this.props.style
      }
    };
    this.containerStyle = {
      style: {
        left: this.previousLeft,
        top: this.previousTop,
        ...this.props.style
      }
    }

    this.touchStart =  this.props.touchStart.bind(this);
    this.touchEnd = this.props.touchEnd.bind(this);
    this.touchMove = this.props.touchMove.bind(this);

    this.handleShouldSetPanResponder = this.handleShouldSetPanResponder.bind(this);
    this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this);
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
    this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    });
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  render() {
    const { src,tileWidth,tileHeight,steps } = this.props;
    return (
      <View
        ref={container => this.container = container}
        {...this.panResponder.panHandlers}
      >
        <Sprite
          src={src}
          tileWidth={tileWidth}
          tileHeight={tileHeight}
          steps={steps}
          ref={sprite => this.sprite = sprite}
        />
      </View>
    );
  }

  _touchStart() {
    if(this.touchStart){
      this.touchStart(this.spriteStyle);
      this._updateNativeStyles();
    }
  }

  _touchEnd() {
    if(this.touchEnd){
      this.touchEnd({left: this.previousLeft, top: this.previousTop},this.spriteStyle);
      this._updateNativeStyles();
    }
  }

  _touchMove(){
    if(this.touchMove){
      this.touchMove(this.spriteStyle);
      this._updateNativeStyles();
    }
  }

  _updateNativeStyles() {
    this.container && this.container.setNativeProps(this.containerStyle);
    // this.sprite && this.sprite.setNativeProps(this.spriteStyle);
  }

  handleShouldSetPanResponder( e ) {
    //Return whether or not the touch registered in the hitbox
    console.log("this ranResponder : ",this);
    const { left, top, width, height } = this.hitBox;
    const { locationX, locationY } = e.nativeEvent;
    console.log("locationX : " + locationX + " , locationY : " + locationY);
    return ( locationX >= left &&
        locationX <= left + width &&
        locationY >= top &&
        locationY <= top + height);
   }

  handlePanResponderGrant() {
    this._touchStart();
  }

  handlePanResponderMove( e, gesture ) {
    // this.spriteStyle.style.left = this.previousLeft + gesture.dx;
    // this.spriteStyle.style.top = this.previousTop + gesture.dy;
    this.containerStyle.style.left = this.previousLeft + gesture.dx;
    this.containerStyle.style.top = this.previousTop + gesture.dy;
    this._touchMove();
    this._updateNativeStyles();
  }

  handlePanResponderEnd( e, gesture ) {
    this.previousLeft += gesture.dx;
    this.previousTop += gesture.dy;
    this._touchEnd();
  }
}

HitBoxSprite.propTypes = {
  style: React.PropTypes.object,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  src: React.PropTypes.number,
  tileWidth: React.PropTypes.number,
  tileHeight: React.PropTypes.number,
  steps: React.PropTypes.arrayOf(React.PropTypes.number),
  touchStart: React.PropTypes.func,
  touchEnd: React.PropTypes.func,
  touchMove: React.PropTypes.func,
  hitBox : React.PropTypes.shape({
    left: React.PropTypes.number,
    top: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  })
}
