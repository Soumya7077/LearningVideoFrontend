import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.white,
    //   opacity:0.6
    },
    loginvector:{
        width:280,
        height:280,
        // bottom:80
    },
    signtext:{
        fontWeight:'900',
        fontSize:30,
        padding:20,
        margin:10,
        // backgroundColor:'#7D97F4',
        color:color.lightPink,
        borderRadius:100,
        // letterSpacing:2
    },
    inputview:{
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        margin:10,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:color.secondary,
    },
    inputbox:{
        marginStart:10,
        padding:5,
        width:'80%',
    },
    buttonView:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        padding:15,
        margin:15,
        backgroundColor:color.primary,
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10
    },
    buttontext:{
        fontWeight:'700',
        fontSize:20,
        color:color.white,
    },
    signupcontainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    signuptext:{
        marginStart:5,
        borderBottomWidth:1,
        borderBottomColor:color.secondary,
    },
    forgotcontainer:{
        width:'80%',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        margin:10,
        // padding:10
    },
    forgottext:{
        color:color.neutral[500]
    },
    note:{
        color:color.neutral[500]
    }
  });