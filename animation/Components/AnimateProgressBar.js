import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, LayoutAnimation, UIManager, Platform,TouchableOpacity} from 'react-native';
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

export default class AnimateProgressBar extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            onOff:false
        }
    }
    
    animate={
        duration:1000,
        create:{
            property:'scaleXY',
            type:'spring',
            duration: 1000,
            springDamping:0.5
        },
        update:{
            property:'scaleXY',
            type:'easeInEaseOut',
            duration: 250,
            springDamping:0.7,
            initialVelocity:.1
        },
        delete:{
            property:'scaleXY',
            type:'spring',
            duration: 1000,
            springDamping:0.5
        }
    };
    
    _on = () => {LayoutAnimation.configureNext(this.animate);
        this.setState({onOff:!this.state.onOff})};
    
    
    render() {
        
        
        return (
            <View style={styles.animateProgress}>
                
                <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.lampView}>
                        <View style={[styles.lamp,this.state.onOff?styles.onLamp:styles.offLamp]}></View>
                    </View>
                </View>
                <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={this._on} style={[styles._button,!this.state.onOff ? styles.onBackground:styles.offBackground]}>
                            <TouchableOpacity onPress={this._on} style={[!this.state.onOff ? styles.offButton:styles.onButton]}></TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    animateProgress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lampView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    lamp: {

        borderRadius: 50,
        borderWidth: 1
    },
    _button: {
        width:100,
        height:25,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius:50
    },
    onButton:{
        width:40,
        height:40,
        borderRadius:50,
        backgroundColor:'#a6a6a6',
    },
    offButton:{
        backgroundColor:'#4374e0',
        width:40,
        height:40,
        marginLeft: 60,
        borderRadius:50,
    },
    onLamp:{
        width: 80,
        height: 80,
        backgroundColor: '#ffffff'
    },offLamp:{
        width: 110,
        height: 110,
        backgroundColor: '#ffe400'
    },
    onBackground:{
        backgroundColor:'#5ec1ff'
    },
    offBackground:{
        backgroundColor:'#cdcdcd'
    }
});