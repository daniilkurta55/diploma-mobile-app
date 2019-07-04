import React, {Component} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Content, Spinner, Label, Text} from 'native-base';
import {connect} from 'react-redux';

class Loader extends Component {

  render() {
    return (
      <Modal transparent visible={this.props.loading}>
        <Content contentContainerStyle={styles.loaderContent}>
          <View style={styles.loaderBlock}>
            <Spinner color="rgba(13, 13, 13, 1)"/>
            {!!this.props.loaderText ?
              <Label style={styles.labelBlock}>
                <Text style={styles.loaderText}>{this.props.loaderText}</Text>
              </Label> : null}
          </View>
        </Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loadingObj.loading,
    loaderText: state.loadingObj.loaderText
  };
};

export default connect(mapStateToProps, null, null)(Loader);

const styles = StyleSheet.create({
  loaderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderBlock: {
    backgroundColor: 'rgba(237, 237, 237, 0.8);',
    borderRadius: 15
  },
  labelBlock: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  loaderText: {
    color: 'rgba(13, 13, 13, 1)',
    fontWeight: 'bold'
  }
});