import React, { Component, PropTypes } from 'react';
import { View, Modal, Text } from 'react-native';

import { CardSection, Button } from './common';
import { CASH_IN_MULTIPLIER } from '../services/constants';

class CashInModal extends Component {

  render() {
    const {
      visible,
      onAccept,
      onDecline,
      pawPoints,
      steps
    } = this.props;

    const { cardSectionStyle, containerStyle, textStyle } = styles;
    const pawPointsToCash = Math.floor((steps.count - steps.cashedIn) * CASH_IN_MULTIPLIER);
    return (
      <Modal
        animationType='slide'
        onRequestClose={() => {}}
        transparent
        visible={visible}
      >
        <View style={containerStyle}>
          <CardSection style={cardSectionStyle}>
            <Text style={textStyle}>
              You have <Text style={{fontWeight: 'bold'}}>{pawPoints}</Text> PawPoints
            </Text>
            <Text style={textStyle}>
              You have walked <Text style={{fontWeight: 'bold'}}>{steps.count}</Text> steps in total today.
            </Text>
            <Text style={textStyle}>
              You have <Text style={{fontWeight: 'bold'}}>{(steps.count - steps.cashedIn) + " "}</Text>
              available steps to cash in {"\n"} for <Text style={{fontWeight: 'bold'}}>{pawPointsToCash}</Text> PawPoint{(pawPointsToCash !== 1) ? "s" : ""}.
            </Text>
          </CardSection>

          <CardSection style={cardSectionStyle}>
            <Button onPress={onAccept} disabled={(steps.count <= steps.cashedIn || (pawPointsToCash == 0))}>Cash In</Button>
            <Button onPress={onDecline}>Done</Button>
          </CardSection>

          <CardSection style={cardSectionStyle}>
            <Text style={textStyle}>Be sure to check back daily! :) </Text>
          </CardSection>
        </View>
      </Modal>
    );
  }
}

CashInModal.propTypes = {
  onAccept: PropTypes.func,
  onDecline: PropTypes.func,
  visible: PropTypes.bool,
  pawPoints: PropTypes.number,
  steps: PropTypes.object
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
    color: 'black',
    textAlign: 'center',
    marginVertical: 10
  }
};

export default CashInModal;
