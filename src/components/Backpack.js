import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { backpackPlace, backpackFetch } from '../actions';

import Merchandise from './Merchandise';

class Backpack extends Component {

  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.props.backpackFetch();
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
    buttonText={`${item.quantity} left | Place`}
    disabled={(item.quantity > 0) ? false : true}
    />);
  }
  render() {
    return (
      <ListView contentContainerStyle={styles.list}
      enableEmptySections
      dataSource={this.dataSource}
      renderRow={this.renderRow}
      pageSize={15}
      initialListSize={15}
      />
    );
  }

  place(item) {
    const {key, quantity, locations,price} = item;
    this.props.backpackPlace({key,price});
  }
}

const styles = {
  list: {
        marginTop: 50,
        flexDirection: 'row',
        flexWrap: 'wrap'
  }
}

const mapStateToProps = state => {
  let i=0, inventory = [];
  for(let key in state.backpack){
    inventory[i++] = {...state.backpack[key], key};
  }
  return { inventory };
};

export default connect(mapStateToProps, { backpackFetch, backpackPlace })(Backpack);
