/**
 * @providesModule StyledText
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export class LightText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.light, this.props.style]} />
    );
  }
}

export class RegularText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.regular, this.props.style]} />
    );
  }
}

export class BoldText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.bold, this.props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  light: {
    fontWeight: '200',
  },
  regular: {
    fontWeight: '300',
  },
  bold: {
    fontWeight: 'bold',
  },
});