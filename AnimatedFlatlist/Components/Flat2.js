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
    ScrollView,
    UIManager,
    TouchableOpacity,
    TouchableHighlight
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
            onOff: false,
            followButton: '',
            showMenu: false
        }
    }
    
    animate = {
        duration: 1000,
        create: {
            property: 'scaleXY',
            type: 'easeInEaseOut',
            duration: 400,
            springDamping: 0.2
        },
        update: {
            property: 'scaleXY',
            type: 'easeInEaseOut',
            duration: 400,
            springDamping: 0.7,
            initialVelocity: .1
        },
        delete: {
            property: 'scaleXY',
            type: 'spring',
            duration: 1000,
            springDamping: 0.5
        }
    };
    
    
    followButton = () => {
        LayoutAnimation.configureNext(this.animate);
        this.setState({followButton: !this.state.followButton})
    };
    
    showMenu = () => {
        LayoutAnimation.configureNext(this.animate);
        this.setState({showMenu: !this.state.showMenu})
    };
    
    componentDidMount() {
        this.fadeIn();
        this.followButton()
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
    
    menu = () => <Animated.View style={styles.menuView}>
        <TouchableOpacity onPress={this.showMenu}>
            {this.state.showMenu ?
                <Animated.Text style={styles.menuText}>MAJID</Animated.Text>
                :
                <Animated.Text style={styles.menuText}>Menu</Animated.Text>
            }
        </TouchableOpacity>
    </Animated.View>;
    
    render() {
        var scrollIndicator = dataSource;
        var position = Animated.divide(this.state.scrollX, deviceWidth);
        let i = Math.ceil(this.state.scrollX/deviceWidth) || 0;
        
        return (
            
            <View style={styles.flex1}>
                
                <View style={styles.flex1}>
                    <Animated.ScrollView
                        pagingEnabled
                        onScroll={({nativeEvent}) => {
                            this.setState({scrollX:nativeEvent.contentOffset.x})
                            // Animated.event([{nativeEvent: {contentOffset: {x: this.state.scrollX}}}])
                        }}
                        horizontal
                        // scrollEventThrottle={16}
                        // showsHorizontalScrollIndicator={false}
                    >
                        {
                            scrollIndicator.map((item, i) =>
                                <Animated.View key={i} style={styles.flex1}>
                                    
                                    <Animated.View style={[styles.imageView, styles.deviceDimension]}>
                                        <Image
                                            source={scrollIndicator[i].image}
                                            style={[styles.deviceDimension, styles.image]}
                                        />
                                    </Animated.View>
                                
                                </Animated.View>
                            )
                        }
                    
                    
                    </Animated.ScrollView>
                
                </View>
                <Animated.View>
        
        
                    <Animated.View key={i} style={[styles.animatedViewMain]}>
                        <Animated.View>
            
                        </Animated.View>
                        <Animated.View style={[styles.animatedViewInside]}>
                            <Animated.View style={[styles.animatedTitleView, {opacity: this.state.fadeIn}]}>
                                <Animated.View style={[styles.sss, styles.flex2]}>
                                    <Animated.Text
                                        style={[styles.animatedText, {opacity: this.state.fadeIn}]}>{scrollIndicator[i].place}</Animated.Text>
                                </Animated.View>
                                
                                <TouchableOpacity onPress={this.followButton}
                                                  style={[styles.flex1, {alignItems: 'flex-end'}]}>
                                    {this.state.followButton ?
                                        <Animated.View style={styles.follow}>
                                            <Text style={styles.followText}>FOLLOW</Text>
                                        </Animated.View>
                                        :
                                        <Animated.View style={styles.userImage}>
                                            <Image
                                                source={require('../Assets/image/user.png')}
                                            />
                                        </Animated.View>
                                    }
                                </TouchableOpacity>
                
                
                            </Animated.View>
                            <View style={styles.footer}>
                                <View style={styles.footerImage}>
                                    <Image
                                        source={require('../Assets/image/file.png')}
                                    />
                                </View>
                                <View style={styles.footerImage}>
                                    <Image
                                        source={require('../Assets/image/search.png')}
                                    />
                                </View>
                                <TouchableOpacity style={styles.footerImagePlus}>
                                    <Image
                                        source={require('../Assets/image/plus.png')}
                                    />
                                </TouchableOpacity>
                                <View style={styles.footerImage}>
                                    <Image
                                        source={require('../Assets/image/bell.png')}
                                    />
                                </View>
                                <View style={styles.footerImage}>
                                    <Image
                                        source={require('../Assets/image/speech.png')}
                                    />
                                </View>
                            </View>
                        </Animated.View>
                    </Animated.View>
    
                </Animated.View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    deviceDimension: {
        width: deviceWidth,
        height: deviceHeight
    },
    imageView: {
        flex: 1
    },
    image: {
        // position: 'absolute'
    },
    animatedViewMain: {
        justifyContent: 'flex-end',
        // flexDirection: 'row',
        position: 'absolute',
        // backgroundColor:'blue',
        alignItems: 'flex-end',
        width: deviceWidth,
        height: '100%'
    },
    animatedViewInside: {
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight / 3,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    animatedText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        
    },
    animatedTitleView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: deviceWidth,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 20
    },
    footer: {
        backgroundColor: '#fff',
        flex: 1,
        width: deviceWidth,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        overflow: 'hidden',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    sss: {
        // justifyContent:'center',
        alignItems: 'flex-start',
        // backgroundColor:'red'
    },
    follow: {
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#f63829',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    followText: {
        color: '#f63829',
        fontWeight: 'bold',
        fontSize: 15
    },
    userImage: {
        backgroundColor: '#f63829',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 20
    },
    menuText: {
        color: 'red',
        fontSize: 20,
        // position:'absolute',
        // top:20,
    },
    menuView: {
        // position:'absolute',
        // right:20,
        // top:20,
        backgroundColor: 'pink',
        // marginRight: 100,
        flex: 1,
        width: deviceWidth / 5,
    },
    footerImagePlus:{
        backgroundColor:'#f63829',
        borderRadius:50,
        padding: 15,
        elevation: 20
    }
    
});