import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";


export const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginLeft:12,
        marginRight:12,
        // marginBottom:12,
        paddingLeft:12,
        paddingRight:12,
        paddingBottom:12,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   backgroundColor: color.white,
    },
    profileCard:{
        margin:'3%',
        padding:'2%',
        // backgroundColor:color.white,
        borderRadius:12,
        justifyContent:'center',
        alignSelf:'center'
    },
    profileImage:{
        width:120,
        height:120,
        borderRadius:70,
        backgroundColor:color.secondary,
        justifyContent:'center',
        alignItems:'center',
        marginRight:'5%'
    },
    profileImageText:{
        color:color.white,
        fontSize:65,
        fontWeight:'500'
    },
    inputView:{
        marginTop:12
    },
    label:{
        fontSize:16,
        fontWeight:'500',
        color:color.black
    },
    inputbox:{
        // marginStart:10,
        marginTop:8,
        padding:10,
        borderWidth:1,
        borderColor:color.secondary,
        borderRadius:8,
        backgroundColor:color.neutral[100]
        // width:'80%',
    },
    buttonView:{
        marginTop:15,
        marginBottom:25
        // padding:10
    },
    button:{
        backgroundColor: color.secondary,
        padding:15,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color:color.white,
        fontSize:18,
        fontWeight:'500'
    }
})