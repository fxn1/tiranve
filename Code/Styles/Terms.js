'use strict';

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

import SharedStyles from 'Code/Styles/SharedStyles';
import StyleVars from 'Code/Styles/StyleVars';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: StyleVars.Colors.appBackground,
    },

    mainView: {
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: 'column'
    },

    content: {
        marginTop: 100,
        marginBottom: 50,
        marginHorizontal: 10
    },

    header: {
        position: 'absolute',
        top: 22,
        right: 0,
        left: 0,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#c4c4c4'
    },
    header_text: {
        alignSelf: 'center',
        paddingTop: 10,
        fontSize: 20,
        color: '#F27070'
    },

    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },

    agreebtn: {
        borderWidth: 0,
        marginVertical: 10,
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 100,
        width: 80,
        backgroundColor: StyleVars.Colors.secondary,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {
            height: 0.3,
            width: 0
        }

    },
    
    cancelbtn: {
        marginHorizontal: 5,
        borderWidth: 0,
        marginVertical: 17,
    },

});