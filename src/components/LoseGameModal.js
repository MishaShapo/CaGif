import React, { Component, PropTypes } from 'react';
import { View, Modal, Text } from 'react-native';

import { CardSection, Button } from './common';

class LoseGameModal extends Component {

  render() {

    const { visible, onAccept } = this.props;

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
              <Text style={{fontWeight: 'bold'}}>You Lost</Text>
            </Text>
          </CardSection>

          <CardSection style={cardSectionStyle}>
            <Button onPress={onAccept} >Restart</Button>
          </CardSection>
        </View>
      </Modal>
    );
  }
}

LoseGameModal.propTypes = {
  onAccept: PropTypes.func,
  visible: PropTypes.bool,
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

export default LoseGameModal;
