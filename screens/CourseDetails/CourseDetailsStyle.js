import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    videoContainer:{
        marginBottom:'2%'
    },
    video:{
        width:'100%',
        height:280,
        backgroundColor: 'black',
    },
    courseDetailsContainer:{
        flex:1,
        margin:'5%',
    },
    courseTitle:{
        fontSize:28,
        fontWeight:'800',
        color:color.fontcolor,
        marginBottom:'3%'
    },
    courseDesc:{
        fontSize:16,
        fontWeight:'500',
        color:color.fontcolor,
    },
    descContainer:{
        rowGap:100
    },
    contentDownloadBtn:{
        padding:15,
        margin:15,
        backgroundColor:color.secondary,
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10
    },
    btnText:{
        color:color.white,
        fontWeight:'700',
        fontSize:16
    }
})