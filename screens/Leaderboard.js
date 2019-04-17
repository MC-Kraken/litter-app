import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

export default class Leaderboard extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem avatar>
            <ListItem avatar></ListItem>
            <ListItem avatar></ListItem>
            <ListItem avatar></ListItem>
            <ListItem avatar></ListItem>
              <Left>
                <Thumbnail source={{ uri: 'Image URL' }} />
                <Thumbnail source={{ uri: 'Image URL' }} />
                <Thumbnail source={{ uri: 'Image URL' }} />
                <Thumbnail source={{ uri: 'Image URL' }} /> 
                <Thumbnail source={{ uri: 'Image URL' }} />
              </Left>
              <Body>
                <Text>Kumar Johnson</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:46 pm</Text>
                <Text note>5:00 pm</Text>
                <Text note>7:03 pm</Text>
                <Text note>12:13 pm</Text>
                <Text note>10:41 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
      
    );
  }
}
      