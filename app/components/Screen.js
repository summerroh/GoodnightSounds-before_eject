//use it for safearea(ipone), status bar(android) to be not covered by elements 

import React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';

function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <StatusBar barStyle="light-content" backgroundColor="#00000000" translucent={true}/>
            <View style={[styles.view, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
    view: {
        flex: 1,
    },
})

export default Screen;