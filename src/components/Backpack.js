import React, { Component } from 'react';
import { ListView, Image } from 'react-native';
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
      <Image
        source={staticImages.backpackBackground}
        style={styles.bgImage}
        resizeMode={"stretch"}
      >
        <ListView
        contentContainerStyle={styles.list}
        style={styles.containerStyle}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        pageSize={15}
        initialListSize={15}
        />
      </Image>
    );
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
    flex: 1,
    position: 'relative'
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
