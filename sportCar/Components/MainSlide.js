import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Dimensions, Animated, Easing,LayoutAnimation} from 'react-native';
import dataSource from './DataSource';
import _ from 'lodash';
LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const {width} = Dimensions.get('window');

export default class MainSlide extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            scrollX: new Animated.Value(0),
            fadeIn: new Animated.Value(0),
            fadeOut: new Animated.Value(1),
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
                useNativeDriver:true
            }
        ).start();
    };
    
    
    render() {
        let scrollIndicator = dataSource;
        let position = Animated.divide(this.state.scrollX, width);
        
        return (
            <View style={styles.mainSlider}>
                <View style={styles.loadingDot}>
                    
                    {scrollIndicator.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - .8, i, i + .8],
                            outputRange: [0.15, 1, 0.15],
                            extrapolate: 'extend',
                        });
                        return (
                            <Animated.View key={i} style={{
                                opacity,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                backgroundColor: 'transparent',
                                margin: 8
                            }}>
                                
                                <Animated.Text style={{
                                    opacity: this.state.fadeIn,
                                    color: '#fff',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace'
                                }}>{scrollIndicator[i].yearOfMake}
                                </Animated.Text>
                            
                            
                            </Animated.View>
                        )
                        
                    })}
                </View>
                <FlatList
                    pagingEnabled
                    data={dataSource}
                    disableVirtualization={true}
                    horizontal={true}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.state.scrollX}}}])}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.model}
                    renderItem={({item}) =>
                        <View style={{height: deviceHeight, width: deviceWidth}}>
                            <Image source={item.image}
                                   style={{height: deviceHeight, width: deviceWidth, position: 'absolute'}}/>
                            <Animated.View style={[styles.generation, {opacity: this.state.fadeOut}]}>
                                <Text style={{color: '#fff'}}>{item.generation}</Text>
                            </Animated.View>
                            <Animated.View style={[styles._nameView, {opacity: this.state.fadeIn}]}>
                                <View>
                                    <Text style={styles._name}>{item.name}</Text>
                                    <Text style={styles._name}>{item.model}</Text>
                                    <Text style={styles.whiteFont}>{item.description}</Text>
                                    <Text style={styles.whiteFont}>{item.yearOfMake}</Text>
                                </View>
                                <View style={{alignSelf: 'center'}}>
                                    <Image
                                        source={require('../Assets/image/chevroletLogoWhite.png')}
                                        style={{width:40,height:40}}
                                    />
                                </View>
                            </Animated.View>
                            <Animated.View style={[styles._footer, {opacity: this.state.fadeIn}]}>
                                <View>
                                    <Text style={styles.footerTitle}>Production</Text>
                                    <Text style={styles.whiteFont}>{item.production}</Text>
                                </View>
                                
                                <Animated.View style={{opacity: this.state.fadeIn}}>
                                    <Text style={styles.footerTitle}>Class</Text>
                                    <Text style={styles.whiteFont}>{item.class}</Text>
                                </Animated.View>
                            </Animated.View>
                        </View>
                    }
                />
            
            
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainSlider: {
        flex: 1,
    },
    loadingDot: {
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2
    },
    whiteFont: {
        color: '#b8c7c9',
        fontFamily: 'monospace'
    },
    generation: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _nameView: {
        flex: 2,
        marginHorizontal: 40,
        marginBottom: 80,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    flex1: {
        flex: 2
    },
    _name: {
        fontFamily: 'monospace',
        color: '#b8c7c9',
        fontSize: 25,
        fontWeight: 'bold'
    },
    
    _footer: {
        flex: 1,
        margin: 40,
        marginRight: 0,
        marginBottom: 100,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        borderTopColor: '#575757',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 50
    },
    footerTitle: {
        color: '#b8c7c9',
        fontFamily: 'monospace'
    }
});