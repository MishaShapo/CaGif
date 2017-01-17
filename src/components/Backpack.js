import React, { Component } from 'react';
import { ListView, Image, Text, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { backpackPlace } from '../actions';

import Merchandise from './Merchandise';
import { staticImages } from '@assets/images';

class Backpack extends Component {

  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ inventory }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(inventory);
  }

  renderRow(item) {
    return (<Merchandise
    name={item.key}
    onPress={() => {this.place(item)}}
    buttonText={`${item.quantity} left Place`}
    disabled={(item.quantity > 0) ? false : true}
    />);
  }
  render() {
    return (
      <View style={styles.bgImage}>
      <Image
        source={staticImages.backpackBackground}
        style={styles.bgImage}
        resizeMode={"stretch"}
      >
        <ListView
        contentContainerStyle={styles.list}
        enableEmptySections
        removeClippedSubviews={false}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        pageSize={this.props.inventory.length}
        initialListSize={this.props.inventory.length}
        />
        {this.renderEmptyBackpackHint()}
      </Image>
      </View>
    );
  }

  renderEmptyBackpackHint(){
    if(this.props.inventory.length === 0){
      return (
        <Text style={styles.hintStyle}>{"Your Backpack is empty.\nTry buying some items in the Store."}</Text>
      );
    }
  }

  place(item) {
    this.props.backpackPlace(item);
  }
}

const styles = {
  list: {
        marginTop: 55,
        flexDirection: 'row',
        flexWrap: 'wrap'
  },
  bgImage: {
    position: 'relative',
    flex: 1,
    width: Dimensions.get('window').width
  },
  hintStyle: {
    position: 'absolute',
    top:200,
    left: 20,
    fontSize: 22,
    textAlign:'center',
    fontWeight: '900',
    color: 'white'
  }
}

const mapStateToProps = state => {
  let inventory = [];
  for(let key in state.backpack){
    if(state.backpack[key].quantity > 0){
      inventory.push({...state.backpack[key], key});
    }
  }
  return { inventory };
};

export default connect(mapStateToProps, { backpackPlace })(Backpack);
