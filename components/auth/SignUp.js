import React, { Component } from 'react';
import { View, Alert, ImageBackground } from 'react-native';
import { Container } from 'native-base';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

// import auth actions
import { registerEmailPasswordUser } from '../../actions/authActions';

// import styles
import { appColor, appComplementColor } from '../../styles';

// import background image
import wallpaper from '../../backgroundWallpapers/auth.jpg';

// import components
import Header from '../header';

class SignUp extends Component {
  // component's state
  state = {
    spinner: false,
    // input field values
    name: undefined,
    email: undefined,
    password: undefined,
    rePassword: undefined,
    // input field errors
    nameError: undefined,
    emailError: undefined,
    passwordError: undefined,
    rePasswordError: undefined
  };

  // method to handle on press action on login button
  handleOnPressSignUp = () => {
    this.setState({ spinner: true });

    const { name, email, password, rePassword } = this.state;

    // resetting all error fields
    this.setState({
      nameError: undefined,
      emailError: undefined,
      passwordError: undefined,
      rePasswordError: undefined
    });

    // flag to check if there are any errors
    let anyErrors = false;

    if (!name || name == '') {
      this.setState({ nameError: 'empty field' });
      anyErrors = true;
    }

    if (!email || email == '') {
      this.setState({ emailError: 'empty field' });
      anyErrors = true;
    }

    if (!password || password == '') {
      this.setState({ passwordError: 'empty field' });
      anyErrors = true;
    } else if (!rePassword || rePassword == '') {
      this.setState({ rePasswordError: 'empty field' });
      anyErrors = true;
    } else if (rePassword != password) {
      this.setState({ rePasswordError: 'password does not match' });
      anyErrors = true;
    }

    if (anyErrors) {
      this.setState({ spinner: false });
      return;
    }

    // send info to server to register the user
    this.props
      .registerEmailPasswordUser(name, email, password)
      .then(() => {
        // send user to home screen after signing in
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        this.setState({ spinner: false });
        // display server errors
        Alert.alert(null, error);
      });
  };

  render() {
    return (
      <Container>
        <Spinner visible={this.state.spinner} size='large' color={appColor} />
        <ImageBackground
          source={wallpaper}
          style={{ width: '100%', height: '100%' }}
        >
          <Header />
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Input
              containerStyle={{ paddingBottom: 20 }}
              inputStyle={{ paddingLeft: 10, color: 'white' }}
              placeholder='full name'
              placeholderTextColor='white'
              onChangeText={name => this.setState({ name })}
              errorMessage={this.state.nameError}
              leftIcon={<Icon name='id-badge' size={20} color='white' />}
            />
            <Input
              containerStyle={{ paddingVertical: 20 }}
              inputStyle={{ paddingLeft: 10, color: 'white' }}
              placeholder='email'
              placeholderTextColor='white'
              autoCapitalize='none'
              onChangeText={email => this.setState({ email })}
              errorMessage={this.state.emailError}
              leftIcon={<Icon name='envelope' size={20} color='white' />}
            />
            <Input
              containerStyle={{ paddingVertical: 20 }}
              inputStyle={{ paddingLeft: 10, color: 'white' }}
              placeholder='password'
              placeholderTextColor='white'
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              errorMessage={this.state.passwordError}
              leftIcon={<Icon name='unlock-alt' size={20} color='white' />}
            />
            <Input
              containerStyle={{ paddingVertical: 20 }}
              inputStyle={{ paddingLeft: 10, color: 'white' }}
              placeholder='confirm password'
              placeholderTextColor='white'
              secureTextEntry
              onChangeText={rePassword => this.setState({ rePassword })}
              errorMessage={this.state.rePasswordError}
              leftIcon={<Icon name='unlock-alt' size={20} color='white' />}
            />
            <View style={{ paddingTop: 20 }}>
              <Button
                containerStyle={{ width: 200 }}
                title='Sign Up'
                buttonStyle={{
                  backgroundColor: appColor,
                  borderWidth: 1,
                  borderColor: appColor
                }}
                titleStyle={{ color: appComplementColor }}
                raised={true}
                onPress={() => this.handleOnPressSignUp()}
              />
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default connect(
  null,
  { registerEmailPasswordUser }
)(SignUp);
