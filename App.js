import React, {Component} from 'react';
import {View, Text, Button, Animated, Easing} from 'react-native';
import {createAppContainer, createStackNavigator, StackActions, NavigationActions} from 'react-navigation'; // Version can be specified in package.json

class Fade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1),
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.display);
        if (nextProps.display === 'flex') {
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear()
            }).start()
        }
        if (nextProps.display === 'none') {
            console.log(this.state.fadeAnim);
            Animated.timing(this.state.fadeAnim, {
                toValue: 0,
                duration: 100
            }).start()
        }
    }


    render() {
        return (
            <Animated.View style={{
                ...this.props.style,
                display: this.props.display,
                // opacity: this.state.fadeAnim,
                transform: [
                    // {scale: this.state.fadeAnim},
                    {translateX: this.state.fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [200,100]
                        })
                    }
                ],
                borderWidth: 1
            }}>
                {this.props.children}
                <Text>haha</Text>
            </Animated.View>
        )
    }

    // componentDidMount() {
    //     this.setState({display: 'flex'})
    //     Animated.timing(this.state.fadeAnim, {
    //         toValue: 1,
    //         duration: 3000
    //     }).start()
    // }
    //
    // componentWillUnmount() {
    //     this.setState({display: 'flex'})
    //     Animated.timing(this.state.fadeAnim, {
    //         toValue: 0,
    //         duration: 3000
    //     }).start()
    //     console.log('我要死了');
    // }
}


class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        headerRight: (
            <Button
                onPress={() => {
                    alert('haha')
                }}
                title="Info"
                color="#fff"
            />
        ),
    };

    constructor() {
        super()
        this.state = {
            display: 'none'
        }
        this.menu = React.createRef()
    }

    showAnimation() {
        console.log(this.menu.current);
        this.setState({display: this.state.display === 'none' ? 'flex' : 'none'})
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Page1"
                    onPress={() => {
                        this.props.navigation.navigate('Page1')
                    }}
                />

                <Button
                    title="Go to Page2"
                    onPress={() => {
                        this.props.navigation.navigate('Page2', {
                            message: 'haha'
                        })
                    }}
                />
                <Button title={'点我'} onPress={() => {
                    this.showAnimation()
                }}/>


                <Fade ref={this.menu} style={{backgroundColor: 'blue'}} display={this.state.display}>
                    <Text style={{color: 'red', fontSize: 24}}>haha</Text>
                </Fade>

            </View>
        );
    }
}

class Page1 extends React.Component {
    static navigationOptions = {
        title: '1111111',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Details Screen</Text>
                <Button
                    title="Go Back"
                    onPress={() => {
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Home'})
                            ],
                        }))
                    }}
                />
            </View>
        );
    }
}

class Page2 extends React.Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{this.props.navigation.getParam('message')}</Text>
                <Button
                    title="Go Back"
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                />
            </View>
        );
    }
}

const AppNavigator = createStackNavigator({
        Home: {
            screen: HomeScreen,
        },
        Page1: {
            screen: Page1,
        },
        Page2: {
            screen: Page2,
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });

export default createAppContainer(AppNavigator);