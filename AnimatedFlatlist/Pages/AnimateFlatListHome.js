import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,FlatList} from 'react-native';
import Flat from "../Components/Flat";
import Flat2 from "../Components/Flat2";

export default class AnimateFlatListHome extends Component {
    render() {
        return (
            <View style={styles.flex1}>
                <Flat2/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    }
});