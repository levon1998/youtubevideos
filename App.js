import React from 'react';
import {store} from './Utils/Store';
import styles from './Styles/Styles';
import {Provider} from 'react-redux';
import AuthWrapper from './Containers/AppWrapper';
import {StyleSheet, Text, View} from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    <AuthWrapper />
                </Provider>
            </View>
        );
    }
}

