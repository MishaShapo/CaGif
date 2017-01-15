import React, { Component, PropTypes } from 'react';
import { View, Modal, Text } from 'react-native';

import { CardSection, Button } from './common';

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
    return (
      <Modal
        animationType='slide'
        onRequestClose={() => {}}
        transparent
        visible={visible}
      >
        <View style={containerStyle}>
          <CardSection style={cardSectionStyle}>
            <Text style={[textStyle,{marginVertical : 10}]}>
              You have <Text style={{fontWeight: 'bold'}}>{pawPoints}</Text> PawPoints
            </Text>
            <Text style={[textStyle,{marginVertical : 10}]}>
              You have walked <Text style={{fontWeight: 'bold'}}>{steps.count}</Text> steps in total today.
            </Text>
            <Text style={[textStyle,{marginVertical : 10}]}>
              You have <Text style={{fontWeight: 'bold'}}>{(steps.count - steps.cashedIn) + " "}</Text>
              available steps to cash in.
            </Text>
          </CardSection>

          <CardSection style={cardSectionStyle}>
            <Button onPress={onAccept} disabled={(steps.count <= steps.cashedIn)}>Cash In</Button>
            <Button onPress={onDecline}>Done</Button>
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
    color: 'black'
  }
};

export default CashInModal;
