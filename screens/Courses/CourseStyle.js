import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // justifyContent:'flex-start',
    // alignItems:'flex-start',
    flexWrap: "wrap",
  },
  card: {
    width: "44%",
   marginLeft:'3%',
   marginRight:'3%',
   marginTop:'3%',
    backgroundColor:color.white,
    borderRadius: 12,
    padding: 15,
    
  },
  cardImage:{
    width:100,
    height:100,
    resizeMode: 'cover',
   alignSelf:'center'
  },
  cardHeader:{
    borderBottomColor:color.neutral[300],
    borderBottomWidth:0.7,
    marginTop:5,
    marginBottom:5
  },
  courseName:{
    fontSize:18,
    fontWeight:'500',
    color:color.fontcolor
  },
  courseDesc:{
    color:color.neutral[300]
  },
  searchBox:{
    marginLeft:'3%',
   marginRight:'3%',
   marginTop:'3%',
   borderWidth:1,
    borderColor:color.black,
    borderRadius:12,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  search:{
    padding:10,
    
  },
  courseNameContainer:{
    margin:6,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  freeTypeStyle:{
    backgroundColor:color.success,
    color:color.white,
    padding:5,
    borderRadius:8
  },
  paidTypeStyle:{
    backgroundColor:color.lightPink,
    color:color.white,
    padding:5,
    borderRadius:8
  }
});
