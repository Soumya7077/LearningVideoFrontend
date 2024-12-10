import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:12,

  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: color.danger,
    textAlign: "center",
  },  
  courseBox: {
    width: "100%",
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 15,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  imageContainer:{
    width:'40%',
    padding:10
  },
  imageStyle:{
    width:100,
    height:100
  },
  contentContainer:{
    width:'55%',
    flexDirection:'column',
    gap:10,
    justifyContent:'center',
    alignItems:'flex-start'
  },
  freeTypeStyle:{
    backgroundColor:color.success,
    color:color.white,
    padding:10,
    borderRadius:8
  },
  paidTypeStyle:{
    backgroundColor:color.lightPink,
    color:color.white,
    padding:10,
    borderRadius:8
  },
  courseNameStyle:{
    color:color.fontcolor,
    fontSize:20,
    fontWeight:'600',
    alignSelf:'center'

  },
  descStyle:{
    fontSize:15,
    fontWeight:'400',
    color:color.neutral[500]
  },
  lastContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  buttonContainer:{
    padding:8,
    backgroundColor:color.danger,
    justifyContent:'center',
    borderRadius:10,
    marginLeft:12
  },
  buttonContent:{
    color:color.white,
    alignSelf:'flex-start',
    fontSize:15,
    fontWeight:'600',
  },
  labelText:{
    fontSize:14,
    alignSelf:'center',
    fontWeight:'600',
    color:color.fontcolor
  },
  text:{
    fontSize:13,
    alignSelf:'center',
    fontWeight:'400'
  }
});
