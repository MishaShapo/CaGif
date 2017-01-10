import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { buyMerchandise } from '../actions';

import Merchandise from './Merchandise';
import PurchaseDialog from './PurchaseDialog';

import inventory from '../data/inventory.json';

class Store extends Component {

  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.createDataSource = this.createDataSource.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onAccept = this.onAccept.bind(this);

    this.state = {
      showModal: false,
      currentItem: undefined
    };
  }

  componentWillMount(){
    this.createDataSource();
  }

  createDataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(inventory);
  }

  renderRow(item) {
    return (<Merchandise
    name={item.key}
    onPress={() => {this.buy(item)}}
    buttonText={`$${item.price} | Buy`}
    disabled={(this.props.pawPoints >= item.price) ? false : true}
    />);
  }
  render() {
    return (
      <View>
        <ListView contentContainerStyle={styles.list}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        pageSize={12}
        initialListSize={12}
        />
        <PurchaseDialog
          visible={this.state.showModal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
          item={this.state.currentItem}
        />
      </View>
    );
  }

  onDecline() {
    this.setState({ showModal: false, currentItem: undefined });
  }

  onAccept() {
    if(this.state.currentItem){
      this.props.buyMerchandise(this.state.currentItem);
    }
  }

  buy(item) {
    this.setState({showModal: true, currentItem: item});
  }
}

const styles = {
  list: {
        marginTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
  }
}

const mapStateToProps = state => {
  return {
    pawPoints: state.pet.pawPoints,
    backpack: state.backpack
  };
};

export default connect(mapStateToProps, { buyMerchandise })(Store);
