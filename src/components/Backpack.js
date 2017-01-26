import React, { Component } from 'react';
import { ListView, Image, Text, Dimensions, View, PixelRatio } from 'react-native';
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
    disabled={item.quantity == 0}
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
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        {this.renderEmptyBackpackHint()}
        </View>
      </Image>
      </View>
    );
  }

  renderEmptyBackpackHint(){
    if(this.props.inventory.length === 0){
      return (
        <Text style={styles.hintStyle}>{"Your Backpack is empty.\nTry buying some items in the Store."}</Text>
      );
    } else {
      return (
        <ListView
        contentContainerStyle={styles.list}
        enableEmptySections
        removeClippedSubviews={false}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        pageSize={this.props.inventory.length}
        initialListSize={this.props.inventory.length}
        />
      )
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
    flexWrap: 'wrap',
  },
  bgImage: {
    position: 'relative',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hintStyle: {
    position: 'relative',
    // top: Dimensions.get('window').height / 2 - 50 * PixelRatio.get(),
    // left: 5 * PixelRatio.get(),
    fontSize: 22,
    textAlign:'center',
    fontWeight: '900',
    color: 'white',
    height: 100
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
