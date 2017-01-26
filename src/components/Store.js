import React, { Component } from 'react';
import { ListView, Image, Dimensions } from 'react-native';
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

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1.disabled !== r2.disabled;
      }
    });



    this.state = {
      showModal: false,
      currentItem: undefined,
      dataSource: ds.cloneWithRows(Object.entries(inventory).map(kvPair => {
        const disabled = this.props.pawPoints < kvPair[1].price;
        return {...kvPair[1],key: kvPair[0], disabled}
      }))
    };
  }

  componentWillReceiveProps(nextProps){
    this.createDataSource(nextProps);
  }

  shoulComponentUpdate(nextProps){
    return nextProps.pawPoints !== this.props.pawPoints;
  }

  createDataSource(nextProps) {
    //Each row item with have key, price, and statsChanges
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(Object.entries(inventory).map(kvPair => {
        const disabled = nextProps.pawPoints < kvPair[1].price;
        return {...kvPair[1],key: kvPair[0], disabled};
      }))
    });

  }

  renderRow(item) {
    return (<Merchandise
    name={item.key}
    onPress={() => {this.buy(item)}}
    buttonText={`$${item.price} | Buy`}
    disabled={item.disabled}
    />);
  }
  render() {
    return (
      <Image
        source={staticImages.storeBackground}
        style={styles.bgImage}
        resizeMode={"stretch"}
        >
        <ListView
        contentContainerStyle={styles.list}
        enableEmptySections
        removeClippedSubviews={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        pageSize={Object.keys(inventory).length}
        initialListSize={Object.keys(inventory).length}
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
    position: 'relative',
    flex: 1,
    width: Dimensions.get('window').width
  }
}

const mapStateToProps = state => {
  return {
    pawPoints: state.pet.stats.pawPoints
  };
};

export default connect(mapStateToProps, { buyMerchandise })(Store);
