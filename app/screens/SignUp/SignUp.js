import React, {Component} from 'react';
import {Button, Container, Content, Form, Input, Item, Label, Text, Toast} from 'native-base';
import {AsyncStorage, StyleSheet} from 'react-native';
import {SignUpServices} from './Services/Services';
import {generateKeyPair} from '../../auth';
import Loader from '../../components/Loader';
import {connect} from 'react-redux';
import {setLoading} from '../../redux/actions';

class SignUp extends Component {
  constructor() {
    super();

    this.service = new SignUpServices();

    this.state = {
      login: null,
      password: null,
      confirmPassword: null,
      email: null
    }
  }

  async submitSignUp() {
    if (this.state.confirmPassword !== this.state.password) {
      Toast.show({
        text: 'Passwords do not match!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'warning'
      });
    } else {
      this.props.setLoading(true, 'Generating key');
      await AsyncStorage.setItem('login', this.state.login);
      const publicPem = await generateKeyPair();
      this.props.setLoading(true, 'Creating user');
      const body = JSON.stringify({
        login: this.state.login,
        password: this.state.password,
        email: this.state.email,
        name: '',
        surname: '',
        publicPem: publicPem
      });

      this.service.signUp(body).then(res => {
        if (res) {
          Toast.show({
            text: 'User was created successfully!',
            buttonText: 'Ok',
            duration: 3000,
            type: 'success'
          });
          this.props.setLoading(false);
          this.props.navigation.navigate('SignIn');
        }
      }).catch(error => {
        this.props.setLoading(false);
        if (error.response && error.response.data.message) {
          error = error.response.data.message;
        }
        console.log('Error: ', error);
        Toast.show({
          text: typeof error === 'string' || error instanceof String ? error : 'Error!',
          buttonText: 'Ok',
          duration: 3000,
          type: 'danger'
        });
      });
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

  onChangeConfirmPassword(confirmPassword) {
    this.setState({
      confirmPassword: confirmPassword
    });
  }

  onChangeEmail(email) {
    this.setState({
      email: email
    });
  }

  render() {
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
              <Label>E-mail</Label>
              <Input value={this.state.email}
                     autoCapitalize='none'
                     onChangeText={(email) => this.onChangeEmail(email)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input value={this.state.password}
                     secureTextEntry
                     autoCapitalize='none'
                     onChangeText={(password) => this.onChangePassword(password)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Confirm password</Label>
              <Input value={this.state.confirmPassword}
                     secureTextEntry
                     autoCapitalize='none'
                     onChangeText={(confirmPassword) => this.onChangeConfirmPassword(confirmPassword)}/>
            </Item>
            <Button onPress={() => this.submitSignUp()} block success style={styles.signInBtn}>
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
        <Loader/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    alignSelf: 'center',
    width: 275,
    height: 345
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

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (loading, loaderText) => dispatch(setLoading(loading, loaderText))
  }
};

export default connect(null, mapDispatchToProps, null)(SignUp);