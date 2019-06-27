import React from 'react';
import {View, Text, Button} from 'react-native';
import {createAppContainer, createStackNavigator, StackActions, NavigationActions} from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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