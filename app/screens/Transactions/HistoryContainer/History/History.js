import React, {Component} from 'react';
import {FlatList, RefreshControl, StyleSheet, ScrollView} from 'react-native';

import {Body, Container, Content, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail, Toast} from 'native-base';
import {TransactionsServices} from './../../Services/Services';
import {connect} from 'react-redux';
import {setRefreshing} from './../../../../redux/actions';
import moment from 'moment';

class History extends Component {
  constructor() {
    super();

    this.state = {
      transactionsList: [],
      firstLoading: true
    };

    this.service = new TransactionsServices();
  }

  getTransactions() {
    this.service.getTransactions(this.props.type, this.props.userId).then(data => {
      this.setState({
        transactionsList: data.data,
        firstLoading: false
      });
      this.props.setRefreshing(false);
    }).catch(res => {
      this.props.setRefreshing(false);
      this.setState({
        firstLoading: false
      });
      console.log('Error: ', res);
      Toast.show({
        text: typeof res === 'string' || res instanceof String ? res : 'Error!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger'
      });
    });
  }

  onRefresh() {
    this.props.setRefreshing(true);
    this.getTransactions();
  }

  componentDidMount() {
    this.getTransactions();
  }

  displayFile(item) {
    this.props.navigateToPdfView(item);
  }

  render() {
    let layout = null;

    if (this.state.firstLoading) {
      layout = (
        <Content contentContainerStyle={styles.emptyContent}>
          <Spinner color="#D3D3D3"/>
        </Content>
      );
    }

    if (this.state.transactionsList.length === 0 && !this.state.firstLoading) {
      layout = (
        <ScrollView contentContainerStyle={styles.emptyContent}
          refreshControl={<RefreshControl refreshing={this.props.refreshing} onRefresh={() => this.onRefresh()}/>}>
          <Content contentContainerStyle={styles.emptyContent}>
            <Text style={styles.noData}>No data</Text>
          </Content>
        </ScrollView>
      );
    }

    if (this.state.transactionsList.length > 0) {
      layout = (
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.props.refreshing} onRefresh={() => this.onRefresh()}/>}>
          <FlatList
            data={this.state.transactionsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              const isSender = this.props.userLogin === item.senderLogin;
              return (
                <ListItem button thumbnail onPress={() => this.displayFile(item)}>
                  <Left>
                    <Thumbnail
                      source={{uri: (isSender ? `data:image/jpg;base64,${item.receiverAvatarImg}` : `data:image/jpg;base64,${item.senderAvatarImg}`)}}/>
                  </Left>
                  <Body>
                  <Text>{item.fileName}</Text>
                  <Text note>
                    {isSender ? `Sent to ${item.receiverLogin}` : `Received from ${item.senderLogin}`} at {moment(item.createDate).format('h:mm | DD MMMM YYYY')}
                  </Text>
                  </Body>
                  <Right>
                    <Icon type="AntDesign" name={item.isVerified ? 'smileo' : 'frowno'}/>
                  </Right>
                </ListItem>
              );
            }}/>
        </ScrollView>
      );
    }

    return (
      <Container>
        {layout}
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    refreshing: state.refreshing,
    userId: state.user.id,
    userLogin: state.user.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRefreshing: (refreshing) => dispatch(setRefreshing(refreshing))
  }
};

export default connect(mapStateToProps, mapDispatchToProps, null)(History);

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noData: {
    color: '#D3D3D3',
    fontWeight: 'bold'
  }
});