import React, { Component } from 'react';
import { Header, Title, Body } from 'native-base';

// import custom styles
import styles, { appName } from '../../styles';

class HeaderComp extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: 'transparent', elevation: 0 }}
        androidStatusBarColor='black'
      >
        <Body>
          <Title style={{ ...styles.header_text }}>{appName}</Title>
        </Body>
      </Header>
    );
  }
}

export default HeaderComp;
