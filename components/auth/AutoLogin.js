import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

// import styles
import { appColor } from '../../styles';

class AutoLogin extends Component {
  state = {
    spinner: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ spinner: false });

      // navigating to Login screen, user is not logged in already
      this.props.navigation.navigate('Login');
    }, 3000);
  }

  render() {
    return (
      <View>
        {this.state.spinner ? null : <Text>AutoLogin</Text>}
        <Spinner
          visible={this.state.spinner}
          color={appColor}
          textStyle={{ color: appColor }}
        />
      </View>
    );
  }
}

export default AutoLogin;
