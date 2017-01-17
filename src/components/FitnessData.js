import React, { Component } from 'react';
import { View, Text, NativeAppEventEmitter } from 'react-native';
import Health from '../services/health';

import { Card, CardSection } from './common';

class FitnessData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      steps: [],
      pressCount: 0
    };
    this.renderStepsData = this.renderStepsData.bind(this);
    this.updateStepsCount = this.updateStepsCount.bind(this);
  }

  componentWillMount() {

    this.subscription = NativeAppEventEmitter.addListener(
      'StepStats',
      (body) => {
        this.setState({steps: [body], pressCount: this.state.pressCount + 1});
      }
    );
    this.updateStepsCount();
  }

  componentWillUnmount(){
    this.subscription.remove();
  }

  renderStepsData() {
    return this.state.steps.map((day,i) => {
      return (
        <CardSection key={i}>
          <Text style={{fontSize: 16,alignSelf: 'center'}}>{Math.round(day.value)}</Text>
        </CardSection>
      );
    });
  }

  updateStepsCount() {
    Health()
    .then((steps) => {
      this.setState({
        steps,
        pressCount: this.state.pressCount + 1
      })
    })
    .catch((error) => {
      this.setState({
        steps : [error],
        pressCount: this.state.pressCount + 10
      })
    })
  }
  render() {
    return (
      <View>
        <Text style={{textAlign:'center',fontSize: 18, marginTop: 40}}>FitnessData</Text>
        <Text style={{textAlign:'center', fontSize: 12}}>{this.state.pressCount}</Text>
        <Card>
          {this.renderStepsData()}
        </Card>
      </View>
    );
  }
}

export default FitnessData;
