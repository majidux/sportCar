import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Dimensions, Animated, Easing} from 'react-native';
import dataSource from './Datas';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class Flat extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: new Animated.Value(0),
            scrollX:new Animated.Value(0),
            fadeOut: new Animated.Value(1)
        }
    }
    
    componentDidMount() {
        this.fadeIn();
    }
    
    fadeIn = () => {
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.back(),
                useNativeDriver: true
            }
        ).start(() => this.fadeOut())
        
    };
    fadeOut = () => {
        this.state.fadeOut.setValue(1);
        Animated.timing(
            this.state.fadeOut,
            {
                toValue: 0,
                duration: 2000,
            }
        ).start();
    };
    
    render() {
        let scrollIndicator = dataSource;
        let position = Animated.divide(this.state.scrollX, deviceWidth);
    
        return (
            <View style={styles.flex1}>
                <View style={styles.flex1}>
                    <FlatList
                        data={dataSource}
                        pagingEnabled
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.state.scrollX}}}])}
                        horizontal={true}
                        scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({item}) =>
                            <Animated.View style={styles.flex1}>
                                
                                <Animated.View style={[styles.imageView,styles.deviceDimension]}>
                                    <Image
                                        source={item.image}
                                        style={[styles.deviceDimension,styles.image]}
                                    />
                                </Animated.View>
                                {scrollIndicator.map((_,i) =>{
                                    let opacity = position.interpolate({
                                    inputRange:[i - .1, i , i + .1],
                                    outputRange:[.0 ,1,.0],
                                    extrapolate:'clamp',
                                });
                                    return(
                                        <Animated.View key={i} style={{opacity,justifyContent: 'center',flexDirection: 'row',position:'absolute'}}>
                                            <Animated.Text style={{
                                                opacity: this.state.fadeIn,
                                                color: '#fff',
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                fontFamily: 'monospace'
                                            }}>{scrollIndicator[i].model}
                                            </Animated.Text>
                                        </Animated.View>
                                    )
                                    
                                })}
                                
                            </Animated.View>
                        }
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flex1: {
        flex: 1,
        backgroundColor:'pink'
    },
    deviceDimension: {
        width: deviceWidth,
        height: deviceHeight
    },
    imageView:{
        flex: 1
    },
    image:{
        position: 'absolute'
    }
    
});