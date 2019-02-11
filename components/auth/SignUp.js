import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Container, Content } from 'native-base';
import { Input, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

// import auth actions
import { registerEmailPasswordUser } from '../../actions/authActions';

// import styles
import { appColor, appComplementColor } from '../../styles';

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
    termsCheckBox: false,
    // input field errors
    nameError: undefined,
    emailError: undefined,
    passwordError: undefined,
    rePasswordError: undefined
  };

  // method to handle on press action on login button
  handleOnPressSignUp = () => {
    this.setState({ spinner: true });

    const { name, email, password, rePassword, termsCheckBox } = this.state;

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

    if (!termsCheckBox) {
      this.setState({ spinner: false });
      return Alert.alert(
        null,
        'You must agree to our terms and conditions in order to continue'
      );
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
        <Header />
        <View style={{ height: 100 }} />
        <Input
          containerStyle={{ paddingBottom: 5 }}
          inputStyle={{ paddingLeft: 10 }}
          placeholder='full name'
          onChangeText={name => this.setState({ name })}
          errorMessage={this.state.nameError}
          leftIcon={<Icon name='id-badge' size={20} />}
        />
        <Input
          containerStyle={{ paddingBottom: 5 }}
          inputStyle={{ paddingLeft: 10 }}
          placeholder='email'
          autoCapitalize='none'
          onChangeText={email => this.setState({ email })}
          errorMessage={this.state.emailError}
          leftIcon={<Icon name='envelope' size={20} />}
        />
        <Input
          containerStyle={{ paddingVertical: 5 }}
          inputStyle={{ paddingLeft: 10 }}
          placeholder='password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          errorMessage={this.state.passwordError}
          leftIcon={<Icon name='unlock-alt' size={20} />}
        />
        <Input
          containerStyle={{ paddingVertical: 5 }}
          inputStyle={{ paddingLeft: 10 }}
          placeholder='confirm password'
          secureTextEntry
          onChangeText={rePassword => this.setState({ rePassword })}
          errorMessage={this.state.rePasswordError}
          leftIcon={<Icon name='unlock-alt' size={20} />}
        />
        <CheckBox
          title='I agree to all the terms and conditions'
          checked={this.state.termsCheckBox}
          checkedColor={appColor}
          containerStyle={{
            backgroundColor: appComplementColor,
            borderColor: appComplementColor
          }}
          onPress={() =>
            this.setState({ termsCheckBox: !this.state.termsCheckBox })
          }
        />
        <Content style={{ alignSelf: 'center' }}>
          <Button
            containerStyle={{ paddingVertical: 5, width: 200 }}
            title='Sign Up'
            buttonStyle={{ backgroundColor: appColor }}
            onPress={() => this.handleOnPressSignUp()}
          />
        </Content>
        <Spinner
          visible={this.state.spinner}
          size='large'
          textStyle={{ color: appColor }}
          color={appColor}
        />
      </Container>
    );
  }
}

export default connect(
  null,
  { registerEmailPasswordUser }
)(SignUp);
