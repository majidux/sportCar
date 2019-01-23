import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Home from "./sportCar/Pages/Home";
import AnimationHome from "./animation/Pages/AnimationHome";
import AnimateFlatListHome from "./AnimatedFlatlist/Pages/AnimateFlatListHome";


export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/*<Home/>*/}
                {/*<AnimationHome/>*/}
                <AnimateFlatListHome/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
