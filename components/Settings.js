import React, { Component } from 'react';
import { View, Text, Alert, ImageBackground } from 'react-native';
import { Card, CardItem, Grid, Col } from 'native-base';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import { LoginManager } from 'react-native-fbsdk';

// import auth actions
import {
  signoutEmailPasswordUser,
  signoutFacebookUser
} from '../actions/authActions';

// import styles
import { appColor } from '../styles';

// import background image
import wallpaper from '../backgroundWallpapers/home.jpg';

class Settings extends Component {
  state = {
    spinner: false,
    name: undefined,
    email: undefined,
    type: undefined
  };

  componentDidMount() {
    const { name, email, type } = this.props;
    this.setState({ name, email, type });
  }

  handleOnPressSignout = () => {
    this.setState({ spinner: true });
    // extract user info from redux state
    let { _id, accessToken, user_id, type } = this.props;

    // convert user_id to number
    user_id = parseInt(user_id);

    if (type === 'email/password') {
      // user signed in using email/password auth
      this.props
        .signoutEmailPasswordUser(_id, accessToken)
        .then(() => {
          // send user to login screen after signing out
          this.props.navigation.navigate('loginNav');
        })
        .catch(error => {
          this.setState({ spinner: false });
          // display server errors
          Alert.alert(null, error);
        });
    } else if (type === 'facebook') {
      // use signed in user facebook auth

      // logout user from the app
      this.props
        .signoutFacebookUser(_id, user_id, accessToken)
        .then(() => {
          // logout user from facebook
          LoginManager.logOut();

          // send user to login screen after signing out
          this.props.navigation.navigate('loginNav');
        })
        .catch(error => {
          this.setState({ spinner: false });
          Alert.alert(null, error);
        });
    }
  };

  render() {
    return (
      <ImageBackground
        source={wallpaper}
        style={{ width: '100%', height: '100%' }}
      >
        <Spinner size='large' visible={this.state.spinner} color={appColor} />
        <View>
          <Button
            title='Signout'
            type='outline'
            containerStyle={{ paddingVertical: 10 }}
            buttonStyle={{ borderWidth: 1, borderColor: 'white' }}
            titleStyle={{ color: 'white' }}
            onPress={() => this.handleOnPressSignout()}
          />
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>
              Account Information
            </Text>
            <Card>
              <CardItem bordered>
                <Grid>
                  <Col>
                    <Text>Name</Text>
                  </Col>
                  <Col>
                    <Text>{this.state.name}</Text>
                  </Col>
                </Grid>
              </CardItem>
              <CardItem bordered>
                <Grid>
                  <Col>
                    <Text>Email</Text>
                  </Col>
                  <Col>
                    <Text>{this.state.email ? this.state.email : ''}</Text>
                  </Col>
                </Grid>
              </CardItem>
              <CardItem>
                <Grid>
                  <Col>
                    <Text>Account type</Text>
                  </Col>
                  <Col>
                    <Text>{this.state.type}</Text>
                  </Col>
                </Grid>
              </CardItem>
            </Card>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

// define properties of this component
Settings.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  signoutEmailPasswordUser: PropTypes.func.isRequired,
  signoutFacebookUser: PropTypes.func.isRequired
};

// load redux state to properties
const mapStateToProps = state => ({
  name: state.auth.userInfo.name,
  email: state.auth.userInfo.email,
  _id: state.auth.userInfo._id,
  user_id: state.auth.userInfo.user_id, // this is required for facebook users
  accessToken: state.auth.userInfo.accessToken,
  type: state.auth.userInfo.type
});

export default connect(
  mapStateToProps,
  { signoutEmailPasswordUser, signoutFacebookUser }
)(Settings);
