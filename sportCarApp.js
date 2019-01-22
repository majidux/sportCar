import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Home from "./sportCar/Pages/Home";


export default class SportCarApp extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Home/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
