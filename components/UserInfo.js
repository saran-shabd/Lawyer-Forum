import React, { Component } from 'react';
import { Text, ImageBackground } from 'react-native';
import { Container, Content, Card, CardItem } from 'native-base';

// import background image
import wallpaper from '../backgroundWallpapers/home.jpg';

class UserInfo extends Component {
  render() {
    return (
      <Container>
        <ImageBackground
          source={wallpaper}
          style={{ width: '100%', height: '100%' }}
        >
          <Content>
            <Card>
              <CardItem bordered>
                <Text>Title of the first post</Text>
              </CardItem>
              <CardItem bordered>
                <Text>
                  When the state object gets persisted, it first gets serialized
                  with JSON.stringify(). If parts of your state object are not
                  mappable to JSON objects, the serialization process may
                  transform these parts of your state in unexpected ways. For
                  example, the javascript Set type does not exist in JSON. When
                  you try to serialize a Set via JSON.stringify(), it gets
                  converted to an empty object. Probably not what you want.
                </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem bordered>
                <Text>Title of the first post</Text>
              </CardItem>
              <CardItem bordered>
                <Text>
                  When the state object gets persisted, it first gets serialized
                  with JSON.stringify(). If parts of your state object are not
                  mappable to JSON objects, the serialization process may
                  transform these parts of your state in unexpected ways. For
                  example, the javascript Set type does not exist in JSON. When
                  you try to serialize a Set via JSON.stringify(), it gets
                  converted to an empty object. Probably not what you want.
                </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem bordered>
                <Text>Title of the first post</Text>
              </CardItem>
              <CardItem bordered>
                <Text>
                  When the state object gets persisted, it first gets serialized
                  with JSON.stringify(). If parts of your state object are not
                  mappable to JSON objects, the serialization process may
                  transform these parts of your state in unexpected ways. For
                  example, the javascript Set type does not exist in JSON. When
                  you try to serialize a Set via JSON.stringify(), it gets
                  converted to an empty object. Probably not what you want.
                </Text>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default UserInfo;
