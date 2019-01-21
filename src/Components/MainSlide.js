import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Dimensions, Animated,TouchableOpacity} from 'react-native';
import dataSource from './DataSource';
import _ from 'lodash';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const {width} = Dimensions.get('window');

export default class MainSlide extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            scrollX: new Animated.Value(0),
            fadeIn: new Animated.Value(0),
            fadeOut:new Animated.Value(0)
        }
    }
    
    componentDidMount() {
        this.fadeIn();
    }
    
    fadeIn() {
        this.state.fadeIn.setValue(0);
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 1,
                duration: 3000,
            }
        ).start(() => this.fadeOut());
    }
    fadeOut() {
        this.state.fadeIn.setValue(1);
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 1,
                duration: 3000,
            }
        ).start();
    }
    
    
    render() {
        let scrollIndicator = dataSource;
        let position = Animated.divide(this.state.scrollX, width);
        
        return (
            <View style={styles.mainSlider}>
                <View style={styles.loadingDot}>
                    {/*<View style={{flex: 1, backgroundColor: '#000'}}>*/}
                        {/*<TouchableOpacity onPress={() => this.fadeIn()} activeOpacity={0.5}>*/}
                            {/*<Text style={{color:'#fff',fontSize: 20, textAlign: 'center'}}>Submit</Text>*/}
                        {/*</TouchableOpacity>*/}
                    
                        {/*<Animated.View style={{opacity: this.state.fadeIn}}>*/}
                            {/*<View>*/}
                                {/*<Text style={{color:'#fff',fontSize: 20, textAlign: 'center'}}>Your order has been submitted</Text>*/}
                            {/*</View>*/}
                        {/*</Animated.View>*/}
                    {/*</View>*/}
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
                                
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace'
                                }}>{scrollIndicator[i].yearOfMake}</Text>
                            
                            </Animated.View>
                        )
                        
                    })}
                </View>
                <FlatList
                    pagingEnabled
                    data={dataSource}
                    horizontal={true}
                    ref='_scrollView'
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.state.scrollX}}}])}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.model}
                    renderItem={({item}) =>
                        <View style={{height: deviceHeight, width: deviceWidth}}>
                            <Image source={item.image}
                                   style={{height: deviceHeight, width: deviceWidth, position: 'absolute'}}/>
                            <View style={styles.generation}>
                                <Text style={{color: '#fff'}}>{item.generation}</Text>
                            </View>
                                <Animated.View style={styles._nameView} onLayout={this.fadeIn()}>
                                    <Text style={styles._name}>{item.name}</Text>
                                    <Text style={styles._name}>{item.model}</Text>
                                    <Text style={styles.whiteFont}>{item.description}</Text>
                                    <Text style={styles.whiteFont}>{item.yearOfMake}</Text>
                                </Animated.View>
                                
                            <View style={styles._footer}>
                                    <View>
                                        <Text style={styles.footerTitle}>Production</Text>
                                        <Text style={styles.whiteFont}>{item.production}</Text>
                                    </View>
                                    
                                <View>
                                    <Text style={styles.footerTitle}>Class</Text>
                                    <Text style={styles.whiteFont}>{item.class}</Text>
                                </View>
                            </View>
                            
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
        color: '#fff',
        fontFamily: 'monospace'
    },
    generation: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    _nameView: {
        flex: 2,
        marginLeft: 40,
        marginBottom: 80
    },
    flex1: {
        flex: 2
    },
    _name: {
        fontFamily: 'monospace',
        color: '#fff',
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
        color: '#b3b3b3',
        fontFamily: 'monospace'
    }
});