import StyleVars from 'Code/Styles/StyleVars';
import { StyleSheet, Platform, Dimensions } from 'react-native';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default {

    container: {
        backgroundColor:StyleVars.Colors.lightBackground,
        marginHorizontal:windowWidth*0.0
    },


    subHeaderView: {
        marginVertical:windowHeight*0.02
    },

    subHeadertext: {
        marginTop: 10, 
        fontSize:StyleVars.FontSize.normal, 
        alignSelf:'center',
        color: StyleVars.Colors.primaryText,
        fontFamily:StyleVars.Fonts.regular
    }, 

    memberName: {
        alignSelf:'center',
        fontSize:StyleVars.FontSize.smallText,
        fontFamily:StyleVars.Fonts.demiBold,
        color:StyleVars.Colors.primaryText,
        height:StyleVars.FontSize.smallText+5,
    },

    memberDesc: {
        alignSelf:'center',
        fontSize:StyleVars.FontSize.smallTextSecondary,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
        textAlign: 'center'
    },

    /*Not used */
    imageItem: {
        width:windowWidth/3,
        height:windowWidth/2,
        backgroundColor:'red',
    },

    imageRow: {
        flexDirection:'row',
        height:(windowWidth*0.3625) * 1.3,
        marginHorizontal:windowWidth*0.042,
        justifyContent:'space-between'
    },

    /*Not used */
    
    singleRow: {
        flexDirection:'row',
        height:(windowWidth*0.3625) * 1.3,
        marginHorizontal:windowWidth*0.042,
        justifyContent:'space-between'
    },

    singleRowItem:{
        width:windowWidth*0.2625,
        height:windowWidth*0.3625,  
    },

    memberImage: {
        alignSelf:'center',
        width:windowWidth*0.2625,
        height:windowWidth*0.2625,
        borderRadius:windowWidth*0.2525/2
    }
    

};