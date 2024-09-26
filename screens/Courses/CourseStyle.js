import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'space-evenly',
    flexWrap: "wrap",
  },
  card: {
    width: "43%",
    marginTop: "3%",
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
  }
});
