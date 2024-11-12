import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";


const styles = StyleSheet.create({
    container:{
        flex:1,
        // alignItems:'center',
        margin:8,
        padding:12
    },
    imageContainer:{
        marginBottom:20
    },
    image:{
        width:'100%',
        height:200,
        resizeMode:'cover',
        borderRadius:12
    },
    heading:{
        fontSize:32,
        fontWeight:'600',
        color:color.secondary,
        marginBottom:10
    },
    subheading:{
        fontSize:18,
        color:color.fontcolor,
    },
    contactContainer:{
        marginTop:40,
    },
    iconContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderStyle:'dotted',
        paddingBottom:10
    },
    
    icon:{
    marginRight:15
    },
    contactText:{
        fontSize:20,
        color:color.fontcolor,
        fontWeight:'500',
        marginLeft:10
    },
    bottomContainer:{
        marginTop:30,
        justifyContent:'center',
        alignItems:'center',
        rowGap:12
    },
    bottomText:{
        fontSize:24,
        color:color.secondary,
        fontWeight:'500'
    },
    text:{
        fontSize:18,
        color:color.fontcolor
    }
})

export default styles;