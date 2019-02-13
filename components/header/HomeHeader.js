import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header, Body } from 'native-base';

// import custom styles
import styles, { appName } from '../../styles';

class HomeHeader extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: 'black', elevation: 0 }}
        androidStatusBarColor='black'
      >
        <Body>
          <Text style={{ ...styles.header_text }}>{appName}</Text>
        </Body>
      </Header>
    );
  }
}

export default HomeHeader;
