import React, { Component } from 'react';
import { View, Alert, ImageBackground } from 'react-native';
import { Container, Text } from 'native-base';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { connect } from 'react-redux';

// import auth actions
import {
  loginEmailPasswordUser,
  loginFacebookUser
} from '../../actions/authActions';

// import styles
import styles, { appColor, appComplementColor } from '../../styles';

// import backgrounnd wallpaper
import wallpaper from '../../backgroundWallpapers/auth.jpg';

// import components
import Header from '../header/LoginHeader';

class Login extends Component {
  // component's state
  state = {
    spinner: false,
    // input field values
    email: undefined,
    password: undefined,
    // input field errors
    emailError: undefined,
    passwordError: undefined
  };

  // method to handle on press action on login button
  handleOnPressLogin = () => {
    this.setState({ spinner: true });

    const { email, password } = this.state;
    let { emailError, passwordError } = this.state;

    // resetting error fields
    emailError = undefined;
    passwordError = undefined;

    // flag to check if there are any errors
    let errors = false;

    if (!email || email == '') {
      this.setState({ emailError: 'empty field' });
      errors = true;
    }
    if (!password || password == '') {
      this.setState({ passwordError: 'empty field' });
      errors = true;
    }

    // some errors exists
    if (errors) return this.setState({ spinner: false });

    // send info to server to login user
    this.props
      .loginEmailPasswordUser(email, password)
      .then(() => {
        // send user to home screen after logging in
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        this.setState({ spinner: false });
        // display server errors
        Alert.alert(null, error);
      });
  };

  handleOnPressFacebook = () => {
    this.setState({ spinner: true });
    try {
      LoginManager.setLoginBehavior('web_only');
      LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then(value => {
          // user cancelled facebook login
          if (value.isCancelled === true)
            return this.setState({ spinner: false });

          // get user access token
          AccessToken.getCurrentAccessToken()
            .then(accessToken => {
              // send access token to server to login user
              this.props
                .loginFacebookUser(accessToken.accessToken)
                .then(() => {
                  // send user to home screen after logging in
                  this.props.navigation.navigate('Home');
                })
                .catch(error => {
                  this.setState({ spinner: false });
                  Alert.alert(null, error);
                });
            })
            .catch(error => {
              this.setState({ spinner: false });
              Alert.alert(JSON.stringify(error, undefined, 2));
            });
        })
        .catch(error => {
          this.setState({ spinner: false });
          Alert.alert(JSON.stringify(error, undefined, 2));
        });
    } catch (error) {
      this.setState({ spinner: false });
      Alert.alert(JSON.stringify(error, undefined, 2));
    }
  };

  render() {
    return (
      <Container>
        <Spinner visible={this.state.spinner} size='large' color={appColor} />
        <ImageBackground
          source={wallpaper}
          style={{ width: '100%', height: '100%' }}
        >
          <Header toSignUp={() => this.props.navigation.navigate('SignUp')} />
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Input
              containerStyle={{ paddingBottom: 20 }}
              inputStyle={{ paddingLeft: 10, color: 'white' }}
              placeholder='email'
              autoCapitalize='none'
              placeholderTextColor='white'
              onChangeText={email => this.setState({ email })}
              errorMessage={this.state.emailError}
              leftIcon={<Icon name='envelope' size={20} color='white' />}
            />
            <Input
              containerStyle={{ paddingVertical: 20 }}
              inputStyle={{ paddingLeft: 10, color: 'white' }}
              placeholder='password'
              secureTextEntry
              placeholderTextColor='white'
              onChangeText={password => this.setState({ password })}
              errorMessage={this.state.passwordError}
              leftIcon={<Icon name='unlock-alt' size={20} color='white' />}
            />
            <View style={{ paddingVertical: 20 }}>
              <Button
                containerStyle={{
                  width: 200
                }}
                title='Login'
                buttonStyle={{
                  backgroundColor: appColor,
                  borderWidth: 1,
                  borderColor: appColor
                }}
                onPress={() => this.handleOnPressLogin()}
                titleStyle={{ color: appComplementColor }}
                raised={true}
              />
            </View>
            <Text
              style={{
                ...styles.text_head,
                alignSelf: 'center',
                paddingVertical: 30,
                color: 'white'
              }}
            >
              OR
            </Text>
            <Button
              icon={<Icon name='facebook' size={20} color='#ffffff' />}
              title='   Continue using facebook'
              buttonStyle={{
                backgroundColor: '#3b5998',
                borderWidth: 1,
                borderColor: '#3b5998'
              }}
              raised={true}
              onPress={() => this.handleOnPressFacebook()}
            />
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default connect(
  null,
  { loginEmailPasswordUser, loginFacebookUser }
)(Login);
