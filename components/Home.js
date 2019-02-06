import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Fab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

// import styles
import { appColor } from '../styles';

class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        {/* button to add new posts */}
        <Fab
          position="topRight"
          style={{ backgroundColor: appColor }}
          onPress={() => this.props.navigation.navigate('NewPost')}
        >
          <Icon name="plus" />
        </Fab>
      </View>
    );
  }
}

export default Home;
