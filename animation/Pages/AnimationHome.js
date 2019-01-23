import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AnimateProgressBar from "../Components/AnimateProgressBar";

export default class AnimationHome extends Component {
    render() {
        return (
            <View style={styles.className}>
                <AnimateProgressBar/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    className: {
        flex: 1,
    }
});