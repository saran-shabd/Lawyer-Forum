import React, { Component } from 'react';
import { Header, Title, Body, Right } from 'native-base';

// import custom styles
import styles, { appName } from '../../styles';

class HeaderComp extends Component {
  render() {
    return (
      <Header style={{ ...styles.header }}>
        <Body>
          <Title style={{ ...styles.header_text }}>{appName}</Title>
        </Body>
        <Body />
        <Right />
      </Header>
    );
  }
}

export default HeaderComp;
