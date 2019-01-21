import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MainSlide from "../Components/MainSlide";

export default class Home extends Component {
    render() {
        return (
            <View style={styles.className}>
                <MainSlide/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    className: {
        flex: 1,
        backgroundColor:'#000'
    }
});