import React, {Component} from 'react';
import {FlatList, RefreshControl, StyleSheet, ScrollView} from 'react-native';
import {Body, Container, Content, Icon, Left, ListItem, Right, Text, Thumbnail, Toast} from 'native-base';
import {TransactionsServices} from '../Services/Services';
import {setRefreshing, setLoading} from '../../../redux/actions';
import {connect} from 'react-redux';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {encrypt, sign} from '../../../auth';
import Loader from './../../../components/Loader';

class Send extends Component {

  constructor() {
    super();

    this.state = {
      usersList: []
    };

    this.service = new TransactionsServices();
  }

  componentDidMount() {
    this.getUsers();
  }

  onRefresh() {
    this.props.setRefreshing(true);
    this.getUsers();
  }

  getUsers() {
    this.service.getUsers(this.props.userId).then(data => {
      this.setState({
        usersList: data.data
      });
      this.props.setRefreshing(false);
    }).catch(res => {
      console.log('Error: ', res);
      this.props.setRefreshing(false);
    });
  }

  async onChangeReceiver(item) {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.pdf()],
    }, (error, res) => {
      if (res) {
        RNFS.readFile(res.uri, 'base64')
          .then(async (base64) => {
            try {
              this.props.setLoading(true, 'Signing document');
              const signHex = await sign(base64);
              const body = JSON.stringify({
                sender: this.props.userId,
                receiver: item.id,
                data: base64,
                signHex: signHex,
                fileName: res.fileName
              });
              this.service.createTransaction(body).then(data => {
                this.props.setLoading(false);
                Toast.show({
                  text: 'Transaction was send!',
                  buttonText: 'Ok',
                  duration: 3000,
                  type: 'success'
                });
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
            } catch (error) {
              this.props.setLoading(false);
              console.log('Error: ', error);
              Toast.show({
                text: typeof error === 'string' || error instanceof String ? error : 'Error!',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger'
              });
            }
          })
      }
    });
  }

  render() {
    return (
      <Container>
        <ScrollView refreshControl={<RefreshControl refreshing={this.props.refreshing}
                                                    onRefresh={() => this.onRefresh()}/>}>
          <FlatList
            data={this.state.usersList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <ListItem button thumbnail onPress={() => this.onChangeReceiver(item)}>
                  <Left>
                    <Thumbnail source={{uri: `data:image/jpg;base64,${item.avatarImg}`}}/>
                  </Left>
                  <Body>
                  <Text>{item.login}</Text>
                  <Text note>{item.name} {item.surname}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward"/>
                  </Right>
                </ListItem>);
            }}/>
        </ScrollView>
        <Loader/>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    refreshing: state.refreshing,
    userId: state.user.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRefreshing: (refreshing) => dispatch(setRefreshing(refreshing)),
    setLoading: (loading, loaderText) => dispatch(setLoading(loading,loaderText))
  }
};

export default connect(mapStateToProps, mapDispatchToProps, null)(Send);

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});