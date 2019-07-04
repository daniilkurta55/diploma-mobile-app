import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {Container, Header, ScrollableTab, Tab, Tabs} from 'native-base';
import History from './History/History';

class HistoryContainer extends Component {

  navigateToPdfView(item) {
    this.props.navigation.navigate('PdfView', item);
  }

  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs renderTabBar={() => <ScrollableTab/>}>
          <Tab heading="All">
            <History navigateToPdfView={(item) => this.navigateToPdfView(item)} type="all"/>
          </Tab>
          <Tab heading="Received">
            <History navigateToPdfView={(item) => this.navigateToPdfView(item)} type="received"/>
          </Tab>
          <Tab heading="Sent">
            <History navigateToPdfView={(item) => this.navigateToPdfView(item)} type="sent"/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default (HistoryContainer);

const styles = StyleSheet.create({});