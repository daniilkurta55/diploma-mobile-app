import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {setAuth} from '../../redux/actions';
import {Container, Content, Icon, Left, List, ListItem, Right, Separator, Text} from 'native-base';
import {connect} from 'react-redux';

class Profile extends Component {

  componentDidMount() {

  }

  signOut() {
    this.props.setAuth({token: null});
    this.props.navigation.navigate('SignedOut');
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Left>
                <Text>Change password</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
            <Separator/>
            <ListItem selected onPress={() => this.signOut()}>
              <Left>
                <Text>Sign out</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (auth) => dispatch(setAuth(auth))
  }
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  signOut: {
    fontWeight: 'bold'
  }
});