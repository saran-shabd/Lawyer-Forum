import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import styles
import { appColor } from '../../styles';

class AutoLogin extends Component {
  state = {
    spinner: true
  };

  componentDidMount() {
    // check for already registered user
    if (_.isEmpty(this.props.userInfo)) {
      // user is not registered
      this.props.navigation.navigate('Login');
    } else {
      // user is already registered
      this.props.navigation.navigate('homeNav');
    }
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

AutoLogin.propTypes = {
  userInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

export default connect(
  mapStateToProps,
  null
)(AutoLogin);
