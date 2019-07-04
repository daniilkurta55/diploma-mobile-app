import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Body, Container, Content, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail, Toast} from 'native-base';
import Pdf from 'react-native-pdf';

class PdfView extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('fileName'),
    };
  };


  constructor() {
    super();

    this.state = {};
  }

  render() {
    const source = {uri: `data:application/pdf;base64,${this.props.navigation.getParam('data')}`};

    return (
      <Container>
        <Content contentContainerStyle={styles.pdfContent}>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            style={styles.pdf}/>
        </Content>
      </Container>
    );
  }
}

export default PdfView;

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  pdfContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width
  }
});