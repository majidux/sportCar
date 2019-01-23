import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Home from "./sportCar/Pages/Home";
import AnimationHome from "./animation/Pages/AnimationHome";


export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/*<Home/>*/}
                <AnimationHome/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
