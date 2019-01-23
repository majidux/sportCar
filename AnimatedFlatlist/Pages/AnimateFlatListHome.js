import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,FlatList} from 'react-native';
import Flat from "../Components/Flat";

export default class AnimateFlatListHome extends Component {
    render() {
        return (
            <View style={styles.flex1}>
                <Flat/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    }
});