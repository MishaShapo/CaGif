import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { merchandiseFetch } from '../actions';

import Merchandise from './Merchandise';

class Store extends Component {

  componentWillMount() {
    this.props.merchandiseFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ merchandise }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(merchandise);
  }

  renderRow(item) {
    return <Merchandise item={item} />;
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
}

const styles = {
  list: {
        marginTop: 50,
        flexDirection: 'row',
        flexWrap: 'wrap'
  }
}

const mapStateToProps = state => {

  let i=0, merchandise = [];
  for(let key in state.store){
    merchandise[i++] = {...state.store[key], key};
  }
  return { merchandise };
};

export default connect(mapStateToProps, { merchandiseFetch })(Store);
