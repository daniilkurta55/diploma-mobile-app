import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {setLoading} from './../../../redux/actions';
import {Button, Container, Content, Form, Input, Item, Label, Text, Toast} from 'native-base';
import {connect} from 'react-redux';
import Loader from './../../../components/Loader';
import {CommonServices} from './../../../services/Services';

class ChangePassword extends Component {

  constructor() {
    super();

    this.state = {
      password: null,
      confirmPassword: null
    };

    this.service = new CommonServices();
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

  submitChangePassword() {
    this.props.setLoading(true, 'Changing password');
    if (this.state.confirmPassword !== this.state.password) {
      this.props.setLoading(false);
      Toast.show({
        text: 'Passwords do not match!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'warning'
      });
    } else {
      const body = JSON.stringify({
        password: this.state.password
      });

      this.service.changePassword(body, this.props.userId).then(res => {
        if (res) {
          Toast.show({
            text: 'Password was changed successfully!',
            buttonText: 'Ok',
            duration: 3000,
            type: 'success'
          });
          this.props.setLoading(false);
          this.props.navigation.goBack();
        }
      }).catch(res => {
        this.props.setLoading(false);
        console.log('Error: ', res);
        Toast.show({
          text: typeof res === 'string' || res instanceof String ? res : 'Error!',
          buttonText: 'Ok',
          duration: 3000,
          type: 'danger'
        });
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Form style={styles.form}>
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
            <Button block success style={styles.submitBtn} onPress={() => this.submitChangePassword()}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
        <Loader/>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (loading, loaderText) => dispatch(setLoading(loading, loaderText))
  }
};

export default connect(mapStateToProps, mapDispatchToProps, null)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    width: 275,
    alignSelf: 'center',
    height: 345
  },
  submitBtn: {
    marginTop: 30,
  }
});