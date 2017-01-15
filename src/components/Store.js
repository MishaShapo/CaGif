import React, { Component } from 'react';
import { ListView, Image } from 'react-native';
import { connect } from 'react-redux';
import { buyMerchandise } from '../actions';

import Merchandise from './Merchandise';
import PurchaseDialog from './PurchaseDialog';
import { staticImages } from '@assets/images';

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

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = this.ds.cloneWithRows(Object.entries(inventory).map(kvPair => {return {...kvPair[1],key: kvPair[0]}}));
  }

  componentWillReceiveProps(){
    this.createDataSource();
  }

  createDataSource() {
    //Each row item with have key, price, and statsChanges
    this.dataSource = this.ds.cloneWithRows(Object.entries(inventory).map(kvPair => {return {...kvPair[1],key: kvPair[0]}}));
  }

  renderRow(item) {
    console.log('renderRow pp<price: ', this.props.pawPoints < item.price, " key: ", item.key)
    return (<Merchandise
    name={item.key}
    onPress={() => {this.buy(item)}}
    buttonText={`$${item.price} | Buy`}
    disabled={this.props.pawPoints < item.price}
    />);
  }
  render() {
    return (
      <Image
        source={staticImages.storeBackground}
        style={styles.bgStyle}
        >
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
      </Image>
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
        marginTop: 55,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
  },
  bgImage: {
    position: 'relative'
  }
}

const mapStateToProps = state => {
  return {
    pawPoints: state.pet.stats.pawPoints
  };
};

export default connect(mapStateToProps, { buyMerchandise })(Store);
