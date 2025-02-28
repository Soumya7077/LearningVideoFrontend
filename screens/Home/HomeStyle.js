import { Dimensions, StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 85,
    marginBottom: 5,
    backgroundColor:color.bg
  },
  bannerView:{
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  bottomHeaderView: {
    backgroundColor: color.white,
    padding: 12,
    position:'absolute',
    left:0,
    right: 0,
    zIndex: 2,
    marginBottom:Dimensions.get('screen').height,
    
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  leftHeader: {
    flexDirection: "column",
    justifyContent: "space-betwen",
    width: "65%",
    marginLeft: '2%',
  },
  hello: {
    fontSize: 22,
    fontWeight: "300",
    color: color.neutral[500],
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
    color: color.fontcolor,
  },
  rightHeader: {
    width: "15%",
    marginRight: '2%',
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  bannerBackground: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    rowGap:8,
    // opacity:1
  },
  bannerContainer: {
    height: 150, 
    // marginBottom: 10,
  },
  shortDesc:{
    color:color.white,
    fontSize:16,
  },
  longDesc:{
    color:color.white,
    fontSize:15,
    marginLeft:35,
    marginRight:35
  },
  pagerView: {
    flex: 1,
    height: 150, // Same height as bannerContainer
    marginLeft:'2%',
    marginRight:'3%',
    // marginBottom:'3%',
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1,
    padding: 10,

    borderRadius: 2,
    width: "100%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  testImg:{
    width:150,
    height:120,
    resizeMode:'cover',
  },
  btnView:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor:color.primary,
    elevation: 1,
    padding: 12,

    marginLeft:'2%',
    marginRight:'3%',
    marginBottom:'3%',
    borderRadius: 20,
    flexDirection:'row',
    width:'95%',
    justifyContent:'space-between',
    alignItems:'center'
  },
  testFirstView:{
    width:'55%',
    flexDirection:'column',
    // rowGap:15,
    justifyContent:'center',
    alignItems:'start'
  },
  testDesc:{
    color:color.neutral[300],
    fontSize:13,
  },  
  testSecondView:{
    width:'40%',
    justifyContent:'center',
    alignItems:'end'
  },
  testTitle:{
    color:color.white,
    fontSize:22,
    fontWeight:'500'
  },
  btnStyle:{
    marginTop:10,
    backgroundColor:color.white,
    borderRadius:10,
    padding:10,
    width:'70%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  btnText:{
    color:color.black,
    fontWeight:'500',
    fontSize:13,
    alignSelf:'center'
  },
  assessment: {
    fontSize: 20,
    color: color.primary,
    fontWeight: "500",
    marginLeft: "3%",
    marginBottom: "3%",
  },
  popularContainer: {
    // flex: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems:'flex-start',
    flexWrap: "wrap",
  },
  popularCourses: {
    fontSize: 20,
    color: color.fontcolor,
    fontWeight: "500",
    marginLeft: "3%",
    marginBottom: "3%",
  },
  coursecard: {
    width: "44%",
    //  marginLeft:'3%',
    //  marginRight:'3%',
    marginBottom: "3%",
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    alignSelf: "center",
  },
  cardHeader: {
    borderBottomColor: color.neutral[300],
    borderBottomWidth: 0.7,
    marginTop: 5,
    marginBottom: 5,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "500",
    color: color.fontcolor,
  },
  courseDesc: {
    color: color.neutral[300],
  },
  video: {
    width: "100%", // Make the video take up 90% of the screen's width
    height: "48%", // Set a fixed height for the video player
    backgroundColor: "black", // Background color for the video area
  },
  buttons: {
    marginTop: 20, // Add some space between the video and the button
    flexDirection: "row", // Layout the buttons horizontally
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 10, // Add space between the buttons
  },
});
