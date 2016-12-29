import React, { Component, PropTypes } from 'react';
import {
    PanResponder,
    View,
    Dimensions
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

    This would actually be great to write about in your blog :)
  */
  constructor(props) {
    super(props);
    // console.log('constructor props: ',props,"this",this);
    this.state = {
      animationState: 0
    };
    this.previousLeft = this.props.left;
    this.previousTop = this.props.top;
    this.screenDimensions = Dimensions.get('window');
    this.collides = {
      horizontal: false,
      vertical: false
    };

    this.containerStyle = {
      style: {
        left: this.previousLeft,
        top: this.previousTop,
        ...this.props.style
      }
    }

    this.touchStart =  this.props.touchStart && this.props.touchStart.bind(this);
    this.touchEnd = this.props.touchEnd && this.props.touchEnd.bind(this);
    this.touchMove = this.props.touchMove && this.props.touchMove.bind(this);
    this.setAnimationState = this.setAnimationState.bind(this);

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
    const { src,tileWidth,tileHeight,steps,hitBox } = this.props;
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
          state={this.state.animationState}
          ref={sprite => this.sprite = sprite}
          hitBox={hitBox}
        />
      </View>
    );
  }

  _touchStart() {
    if(this.touchStart){
      this.touchStart(this);
      this._updateNativeStyles();
    }
  }

  _touchEnd() {
    if(this.touchEnd){
      this.touchEnd(this,{left: this.previousLeft, top: this.previousTop});
      this._updateNativeStyles();
    }
  }

  _touchMove(){
    if(this.touchMove){
      this.touchMove(this);
    }
  }

  _updateNativeStyles() {
    this.container && this.container.setNativeProps(this.containerStyle);
  }

  setAnimationState(anim){
    this.setState({
      animationState: anim
    });
  }

  handleShouldSetPanResponder( e ) {
    //Return whether or not the touch registered in the hitbox
    const { tileWidth, tileHeight, hitBox } = this.props;
    const { left, top, width, height } = hitBox;
    const { locationX, locationY } = e.nativeEvent;

    const normalizedX = locationX % tileWidth;
    const normalizedY = locationY % tileHeight;
    // console.log('normalizedX : ', normalizedX, 'normalizedY',normalizedY);
    return ( normalizedX >= left &&
        normalizedX <= left + width &&
        normalizedY >= top &&
        normalizedY <= top + height);
   }

  handlePanResponderGrant() {
    this._touchStart();
  }

  handlePanResponderMove( e, gesture ) {
    const {left, top, width, height } = this.props.hitBox;
    const {style} = this.containerStyle;
    const { dx, dy } = gesture;

    // console.log("x0    : ", gesture.x0, " , y0    : ",gesture.y0);
    // console.log("moveX : ", gesture.moveX, " , moveY : ",gesture.moveY);

    const minX = -left;
    const maxX = this.screenDimensions.width-(left+width);
    const minY = -top;
    const maxY = this.screenDimensions.height-(top+height);
    if( this.previousLeft + dx < minX || this.previousLeft + dx > maxX ){
      this.collides.horizontal = true;
    } else {
      style.left = this.previousLeft + gesture.dx;
      this.collides.horizontal = false;
    }
    if( this.previousTop + dy < minY || this.previousTop + dy > maxY){
      this.collides.vertical = true;
    } else {
      style.top = this.previousTop + gesture.dy;
      this.collides.vertical = false;
    }

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
