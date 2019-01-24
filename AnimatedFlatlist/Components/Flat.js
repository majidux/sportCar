import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Dimensions,
    Animated,
    Easing,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import dataSource from './Datas';
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class Flat extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: new Animated.Value(0),
            scrollX: new Animated.Value(0),
            fadeOut: new Animated.Value(1),
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
    
    componentDidMount() {
        this.fadeIn();
    }
    
    fadeIn = () => {
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 1,
                duration: 1000,
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
        var scrollIndicator = dataSource;
        var position = Animated.divide(this.state.scrollX, deviceWidth);
        
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
                                
                                <Animated.View style={[styles.imageView, styles.deviceDimension]}>
                                    <Image
                                        source={item.image}
                                        style={[styles.deviceDimension, styles.image]}
                                    />
                                </Animated.View>
                                {scrollIndicator.map((_, i) => {
                                    let opacity = position.interpolate({
                                        inputRange: [i - .5, i, i + .5],
                                        outputRange: [.0, 1, .0],
                                        extrapolate: 'clamp',
                                    });
                                    return (
                                        <Animated.View key={i} style={[styles.animatedViewMain,{opacity}]}>
                                            <Animated.View style={[styles.animatedViewInside,{opacity}]}>
                                                <Animated.View style={[styles.animatedTitleView,{opacity: this.state.fadeIn}]}>
                                                    <Animated.View>
                                                        <Animated.Text style={styles.animatedText}>{scrollIndicator[i].place}</Animated.Text>
                                                    </Animated.View>
                                                    <Animated.View style={styles.sss}>
                                                        <Animated.Text>FOLLOW</Animated.Text>
                                                    </Animated.View>
                                                </Animated.View>
                                                <Animated.View style={styles.footer}>
                                                    <Animated.Text>lll</Animated.Text>
                                                </Animated.View>
                                            </Animated.View>
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
        backgroundColor: 'pink'
    },
    deviceDimension: {
        width: deviceWidth,
        height: deviceHeight
    },
    imageView: {
        flex: 1
    },
    image: {
        position: 'absolute'
    },
    animatedViewMain:{
        justifyContent: 'flex-end',
        // flexDirection: 'row',
        position: 'absolute',
        // backgroundColor:'blue',
        alignItems:'flex-end',
        width:deviceWidth,
        height:'100%'
    },
    animatedViewInside:{
        justifyContent: 'space-between',
        backgroundColor:'green',
        alignItems:'center',
        width: deviceWidth,
        height: deviceHeight/3,
        borderTopRightRadius:50,
        borderTopLeftRadius:50
    },
    animatedText:{
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        
    },
    animatedTitleView:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection: 'row',
        // backgroundColor:'lightgreen',
        width: deviceWidth,
        borderTopRightRadius:50,
        borderTopLeftRadius:50
    
    },
    footer:{
        backgroundColor: 'red',
        flex:1,
        width:deviceWidth,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center'
    }
    
});