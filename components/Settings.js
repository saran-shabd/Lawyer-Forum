import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';

// import auth actions
import { signoutEmailPasswordUser } from '../actions/authActions';

// import styles
import { appColor } from '../styles';

class Settings extends Component {
  state = {
    spinner: false
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size='large' visible={this.state.spinner} color={appColor} />
        <Text>Settings</Text>
        <Button
          title='sign out'
          onPress={() => {
            this.setState({ spinner: true });
            const { id, accessToken } = this.props;
            this.props
              .signoutEmailPasswordUser(id, accessToken)
              .then(() => {
                // send user to login screen after signing out
                this.props.navigation.navigate('loginNav');
              })
              .catch(error => {
                this.setState({ spinner: false });
                // display server errors
                Alert.alert(null, error);
              });
          }}
        />
      </View>
    );
  }
}

// define properties of this component
Settings.propTypes = {
  id: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired
};

// load redux state to properties
const mapStateToProps = state => ({
  id: state.auth.userInfo._id,
  accessToken: state.auth.userInfo.accessToken
});

export default connect(
  mapStateToProps,
  { signoutEmailPasswordUser }
)(Settings);
