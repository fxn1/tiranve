'use strict';

import React, { Component } from 'react';

import  {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import StyleVars from 'Code/Styles/StyleVars';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)"
  },
  text: {
    fontFamily: StyleVars.Fonts.general,
    color: StyleVars.Colors.primary,
    textAlign: "center",
    alignSelf:'center',
    marginTop: 12
  }
});

export default class LoadingView extends React.Component {
  render() {
    if (this.props.backgroundColor)
      var containerStyle = { backgroundColor: this.props.backgroundColor };

    return (
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator color={StyleVars.Colors.primary} />
        <Text style={styles.text}>{this.props.children}</Text>
      </View>
    );
  }
}
