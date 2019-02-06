import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

import styles, { appColor } from '../styles';

class NewPost extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...styles.text_head }}>Register new post</Text>
        <Input
          label="subject"
          placeholder="max 50 characters"
          containerStyle={{ paddingVertical: 10 }}
          inputStyle={{ paddingLeft: 10 }}
          maxLength={50}
          multiline={true}
        />
        <Input
          label="brief description"
          placeholder="max 300 characters"
          inputStyle={{ paddingLeft: 10 }}
          containerStyle={{ paddingVertical: 10 }}
          maxLength={300}
        />
        <View>
          <Button
            title="Register"
            containerStyle={{ ...styles.button_style }}
            buttonStyle={{ backgroundColor: appColor }}
          />
        </View>
      </View>
    );
  }
}

export default NewPost;
