import React, { Component } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

// load styles
import { appColor } from '../../styles';

/**
 * this screen will be rendered while persist loads the redux state from
 * async storage
 */
class ReduxReload extends Component {
  state = {
    spinner: true
  };

  render() {
    return (
      <View>
        <Spinner size='large' visible={this.state.spinner} color={appColor} />
      </View>
    );
  }
}

export default ReduxReload;
