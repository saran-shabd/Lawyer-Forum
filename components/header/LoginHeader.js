import React, { Component } from 'react';
import { Header, Title, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

// import custom styles
import styles, { appName, appComplementColor, appColor } from '../../styles';

class LoginHeader extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: 'transparent', elevation: 0 }}
        androidStatusBarColor='black'
      >
        <Body>
          <Title style={{ ...styles.header_text }}>{appName}</Title>
        </Body>
        <Right>
          <Icon
            name='user-plus'
            size={20}
            color={appColor}
            onPress={() => this.props.toSignUp()}
          />
        </Right>
      </Header>
    );
  }
}

LoginHeader.propTypes = {
  toSignUp: PropTypes.func.isRequired
};

export default LoginHeader;
