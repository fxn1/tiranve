import StyleVars from 'Code/Styles/StyleVars';
import { StyleSheet, Platform, Dimensions } from 'react-native';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

var fontSizes = StyleVars.FontSize;


export default {

    subHeaderView: {
        alignItems:'center'
    },
    
    memberName:{
        marginTop:windowHeight*0.03,
        alignSelf:'center',
        fontSize:StyleVars.FontSize.normal,
        fontFamily:StyleVars.Fonts.demiBold,
        color:StyleVars.Colors.primaryText
    },

    memberNickName:{
        alignSelf:'center',
        fontSize:StyleVars.FontSize.smallText,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText
    }, 
    memberPhoneNumber:{
        marginTop:windowHeight*0.02,
        alignSelf:'center',
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText
    },

    memberEmail:{
        alignSelf:'center',
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText
    },

    sliderImage: {
        height:(windowWidth / 1.6),
        width: (windowWidth / 1.6),
        borderRadius:(windowWidth / 1.6) / 2,
        alignSelf:'center',
        marginTop:10
    },

    sliderView: {
        height:(windowWidth / 1.6),
        position:'absolute',
        top:windowWidth*0.25,
        bottom:windowHeight*0.22,
        left:0,
        right:0,
        zIndex:1
    },

    profileDataView:{
        backgroundColor:StyleVars.Colors.lightBackground,
        paddingTop:windowHeight*0.20,
        marginTop:windowHeight*0.22,
    },

    subBoxes:{
        marginHorizontal:windowWidth*0.03,
        marginVertical:windowWidth*0.015,
        backgroundColor:'#fff'
    },

    normalText:{
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
    },

    subHeading:{
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.demiBold,
        color:StyleVars.Colors.primaryText
    },

    yearsAgoText: {
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.demiBold,
        color:StyleVars.Colors.primaryText,
        marginTop:windowHeight*0.01,
        paddingHorizontal:windowWidth*0.06,
    },

    yearsAgoView: {
       
    },

    tabContent: {
        marginTop:windowWidth*0.06,
        height:windowHeight*0.35,
        paddingHorizontal:windowWidth*0.06,
    },

    subTextData:{
        marginTop:windowWidth*0.06,
        height:windowHeight*0.3
    },

    subBoxContentView:{
        borderColor :'#fff',
    },

    showNextProfileView:{
        flexDirection:'row',  
        height:windowHeight*0.09,
        alignItems:'center'
    },

    showNextText:{
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
        marginRight:windowWidth*0.03
    },

    showPreText:{
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
        marginLeft:windowWidth*0.03
    },

    nextProfileImage:{
        width:windowWidth*0.030,
        height:windowWidth*0.030
    },


    sortInfoView: {
        flexDirection:'column',
        flex:4,
    },

    sortInfoViewItem: {
        flex:5,
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:windowWidth*0.012,
        paddingHorizontal:windowWidth*0.04
   
    },

    


    sortInfoViewItemText: {
        flex:4, 
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
        lineHeight:windowWidth*0.05
    },

    sortInfoViewItemTextRight: {
        paddingLeft:windowWidth*0.05,
        flex:1
    },


    headerSubAreaView:{
        marginTop:windowHeight*0.006,
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1
    },

    headerSubAreaText:{
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
    },

    headerSubAreaTextSapratorView: {
        alignSelf:'center',
        width:5,
        marginHorizontal:5
    },


    headerSubAreaTextSaprator:{
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.bold,
        alignSelf:'center'
    },

    memberBranchNameView:{
        width:(windowWidth/2)- (5),
        
    },

    memberBranchName:{
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
        textAlign:'right'
    },

    memberHostelName:{
        fontSize:StyleVars.FontSize.smallTextThird,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
        textAlign:'left'
    },

    memberHostelNameView:{
        width:(windowWidth/2)- (5)
    },



    scrollableTabContainer: {
        justifyContent:'flex-start',
        borderWidth:0,
        borderColor:'#fff',
        paddingLeft:windowWidth*0.05,
    },

    popOverContentView: {
        width:windowWidth*0.5,
        flexDirection:'row',
        justifyContent:'space-between'
    },


    navBarView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around'
    }













};