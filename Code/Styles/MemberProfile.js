import StyleVars from 'Code/Styles/StyleVars';
import { StyleSheet, Platform, Dimensions } from 'react-native';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default {

    subHeaderView: {
        alignItems:'center'
    },
    
    pagetitle:{
        marginTop:windowHeight*0.03,
        alignSelf:'center',
        fontSize:StyleVars.FontSize.normal,
        fontFamily:StyleVars.Fonts.demiBold,
        color:StyleVars.Colors.primaryText
    },

    uploadImageText: {
        marginTop:windowHeight*0.03,
        fontSize:StyleVars.FontSize.normal,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.subText,
        marginLeft:windowWidth*0.1
    },

    uploadImagesContainer:{
        height:windowWidth*0.625,
        flex:1,
        flexDirection:'row',
        marginBottom: windowWidth * 0.0625
    },


    new_photo: {
        height:( windowWidth / 7) * 4,
        width: (windowWidth / 7) * 4,
        borderRadius:( windowWidth / 7) * 2,
        borderWidth:1,
        alignSelf:'center', 
    },

    new_photo_camera: {
        width:( windowWidth / 28) * 4, 
        height:( windowWidth / 28) * 4,
        alignSelf:'center', 
        justifyContent:'center',
        alignItems:'center',
        marginTop:70,
        marginLeft:70 
    },



    family_photo:{
        height:( windowWidth / 18) * 4,
        width: (windowWidth / 18) * 4,
        borderRadius:( windowWidth / 18) * 2,
        borderWidth:1,
        alignSelf:'center',
        marginLeft:50
    },

    family_photo_camera: {
        width:( windowWidth / 72) * 4, 
        height:( windowWidth / 72) * 4, 
        alignSelf:'center', 
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        marginLeft:50
    },

    old_photo: {
        height:( windowWidth / 18) * 4,
        width: (windowWidth / 18) * 4,
        borderRadius:( windowWidth / 18) * 2,
        borderWidth:1,
        alignSelf:'center',
        marginLeft:50
    },

    old_photo_camera: {
        width:( windowWidth / 72) * 4, 
        height:( windowWidth / 72) * 4, 
        alignSelf:'center', 
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        marginLeft:50 
    },

    saveDetailsButton: {
        marginVertical:windowWidth*0.09375
    }
};