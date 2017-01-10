import React, { PropTypes, Component} from 'react';
import { Text, View, Modal, Image } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, Button } from './common';
import { staticImages } from '@assets/images';

class PurchaseDialog extends Component {

  constructor(props){
    super(props);
    this.getOwned = this.getOwned.bind(this);
  }

  render(){
    const {
      containerStyle,
      cardSectionStyle,
      statsWrapperStyle,
      progressStyle,
      barStyle,
      textStyle
    } = styles;
    const {
      item={mood:0,health:0,hunger:0,price:0,key:""},
      visible,
      onAccept,
      onDecline,
      pawPoints
    } = this.props;
    const {mood, health, hunger, price,key} = item;
    const prettyKey =
      key.replace("_", " ").replace(/\w\S*/g,
        function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ;});

    return(
        <Modal
          animationType='slide'
          onRequestClose={() => {}}
          transparent
          visible={visible}
        >
          <View style={containerStyle}>
            <CardSection style={cardSectionStyle}>
              <View style={statsWrapperStyle}>
                <Image
                  source={staticImages.moodIcon}
                />
                <View style={[progressStyle, {borderColor: (mood < 0) ? '#e04435' : 'limegreen'}]}>
                  <View
                    style={[barStyle,{
                      width: Math.abs(mood) * 2,
                    }]}
                    backgroundColor={(mood < 0) ? '#e04435' : 'limegreen'}
                  />
                  <Text style={[textStyle,{
                    left: (Math.abs(mood) * 2 < 160) ? Math.abs(mood) * 2 : Math.abs(mood) * 2 - 40,
                    fontWeight: 'bold'
                  }]}>{((mood < 0) ? "-" : "+") + Math.abs(mood)}</Text>
                </View>
              </View>

              <View style={statsWrapperStyle}>
                <Image
                  source={staticImages.healthIcon}
                />
                <View style={[progressStyle, {borderColor: (health < 0) ? '#e04435' : 'limegreen'}]}>
                  <View
                    style={[barStyle,{
                      width: Math.abs(health) * 2,
                    }]}
                    backgroundColor={(health < 0) ? '#e04435' : 'limegreen'}
                  />
                  <Text style={[textStyle,{
                    left: (Math.abs(health) * 2 < 160) ? Math.abs(health) * 2 : Math.abs(health) * 2 - 40,
                    fontWeight: 'bold'
                  }]}>{((health < 0) ? "-" : "+") + Math.abs(health)}</Text>
                </View>
              </View>

              <View style={statsWrapperStyle}>
                <Image
                  source={staticImages.hungerIcon}
                />
                <View style={[progressStyle, {borderColor: (hunger < 0) ? '#e04435' : 'limegreen'}]}>
                  <View
                    style={[barStyle,{
                      width: Math.abs(hunger) * 2,
                    }]}
                    backgroundColor={(hunger < 0) ? '#e04435' : 'limegreen'}
                  />
                  <Text style={[textStyle,{
                    left: (Math.abs(hunger) * 2 < 160) ? Math.abs(hunger) * 2 : Math.abs(hunger) * 2 - 40,
                    fontWeight: 'bold'
                  }]}>{((hunger < 0) ? "-" : "+") + Math.abs(hunger)}</Text>
                </View>
              </View>

              <Text style={[textStyle,{marginVertical : 10}]}>
                You have <Text style={{fontWeight: 'bold'}}>{pawPoints}</Text> PawPoints
              </Text>
              <Text style={[textStyle,{marginVertical : 10}]}>
                A {prettyKey} costs <Text style={{fontWeight: 'bold'}}>{price}</Text> PawPoints
              </Text>
              <Text style={[textStyle,{marginVertical : 10}]}>
                You have <Text style={{fontWeight: 'bold'}}>{this.getOwned()}</Text> {prettyKey}s in your Backpack
              </Text>

            </CardSection>

            <CardSection style={cardSectionStyle}>
              <Button onPress={onAccept}>Buy</Button>
              <Button onPress={onDecline}>Cancel</Button>
            </CardSection>
          </View>
      </Modal>
    );
  }

  getOwned(){
    const { item, backpack } = this.props;
    if(item){
      if(backpack[item.key]){
        return backpack[item.key].quantity;
      } else {
        return 0;
      }
    }
  }
}

PurchaseDialog.propTypes = {
  onAccept: PropTypes.func,
  onDecline: PropTypes.func,
  item: PropTypes.object,
  visible: PropTypes.bool,
  pawPoints: PropTypes.number,
  backpack: PropTypes.object
}

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  statsWrapperStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontSize: 18,
    color: 'black'
  },
  progressStyle: {
    position: 'relative',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 3,
    width: 200,
    height: 40,
    alignSelf: 'center',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  barStyle: {
    position: 'absolute',
    height: 40,
    justifyContent: 'center'
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

const mapStateToProps = (state) => {
  return { ...state.pet, backpack: state.backpack};
};

export default connect(mapStateToProps)(PurchaseDialog);
