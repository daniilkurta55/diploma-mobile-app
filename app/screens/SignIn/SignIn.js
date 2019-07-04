import React, {Component} from 'react';
import {Button, Container, Content, Form, Input, Item, Label, Text, Toast} from 'native-base';
import {StyleSheet} from 'react-native';
import {login} from '../../auth';
import {connect} from 'react-redux';

class SignIn extends Component {
  constructor(props) {
    super();

    this.state = {
      login: null,
      password: null,
      alreadyExistingLogin: null
    }
  }

  onChangeLogin(login) {
    this.setState({
      login: login
    });
  }

  onChangePassword(password) {
    this.setState({
      password: password
    });
  }

  submitLogin() {
    login(this.state.login, this.state.password).then(res => {
      if (res) {
        this.props.navigation.navigate('SignedIn');
      }
    }).catch(res => {
      Toast.show({
        text: typeof res === 'string' || res instanceof String ? res : 'Error!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'warning'
      });
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Form style={styles.form}>
            <Item floatingLabel last>
              <Label>Login</Label>
              <Input value={this.state.login}
                     autoCapitalize='none'
                     onChangeText={(login) => this.onChangeLogin(login)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry
                     value={this.state.password}
                     onChangeText={(password) => this.onChangePassword(password)}/>
            </Item>
            <Button block success style={styles.signInBtn} onPress={() => this.submitLogin()}>
              <Text>Sign In</Text>
            </Button>
            <Button transparent style={styles.signUpBtn} onPress={() => navigate('SignUp')}>
              <Text style={styles.signUpTxt}>Don`t you have an account? Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(SignIn)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: 275,
    height: 256
  },
  signInBtn: {
    marginTop: 30,
  },
  signUpBtn: {
    marginTop: 5,
    alignSelf: 'center',
  },
  signUpTxt: {
    fontSize: 12
  }
});
