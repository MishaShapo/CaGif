import React, { PropTypes, Component} from 'react';
import { Text, View, Modal } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, Button } from './common';
import StatChangeBar from './StatChangeBar';

class PurchaseDialog extends Component {

  constructor(props){
    super(props);
    this.getOwned = this.getOwned.bind(this);
  }

  render(){
    const {
      containerStyle,
      cardSectionStyle,
      textStyle
    } = styles;
    const {
      item,
      visible,
      onAccept,
      onDecline,
      pawPoints
    } = this.props;
    const {statsChanges, price, key} = item;
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
              {Object.entries(statsChanges).map((kvPair) => (
                <StatChangeBar stat={kvPair[1]} key={kvPair[0]} />
              ))}

              <Text style={[textStyle,{marginVertical : 10}]}>
                You have <Text style={{fontWeight: 'bold'}}>{pawPoints}</Text> PawPoints
              </Text>
              <Text style={[textStyle,{marginVertical : 10}]}>
                A {prettyKey} costs <Text style={{fontWeight: 'bold'}}>{price}</Text> PawPoints
              </Text>
              <Text style={[textStyle,{marginVertical : 10}]}>
                You have <Text style={{fontWeight: 'bold'}}>{this.getOwned() + " "}</Text>
                {prettyKey}{(this.getOwned() !== 1) ? "s" : ""} in your Backpack
              </Text>

            </CardSection>

            <CardSection style={cardSectionStyle}>
              <Button onPress={onAccept} disabled={(pawPoints < price)}>Buy</Button>
              <Button onPress={onDecline}>Done</Button>
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

PurchaseDialog.defaultProps = {
  item: {statsChanges:{}, key:"", price: Infinity}
}

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  textStyle: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontSize: 18,
    color: 'black'
  }
};

const mapStateToProps = (state) => {
  return { pawPoints: state.pet.stats.pawPoints, backpack: state.backpack};
};

export default connect(mapStateToProps)(PurchaseDialog);
