import StyleVars from 'Code/Styles/StyleVars';
import { Navigator } from 'react-native-deprecated-custom-components';

export default {
    navBar: {
      backgroundColor:StyleVars.Colors.navBarBackground,
      borderBottomWidth:0,
      shadowOffset: { width: 0, height: 2 },
      shadowColor: '#dedede',
      shadowOpacity: 0.7,
      elevation: 1,
      shadowRadius: 2,
    },

     // navBar:{
    //   shadowColor: '#dedede',
    //   shadowOffset: { width: 0, height: 1 },
    //   shadowOpacity: 0.5,
    //   shadowRadius: 2,
    //   elevation: 1
    // }

    buttonStyle: { marginTop: 13 },

    titleStyle: { 
      marginTop: 10, 
      fontSize:20, 
      alignSelf:'center',
    },

    sceneContainer: {
      flex: 1,
      paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
      backgroundColor:StyleVars.Colors.appBackground
    },
    
    navBarTitleText: {
        color: StyleVars.Colors.navBarTitle,
        fontFamily: StyleVars.Fonts.heading,
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 22
    },

   

};