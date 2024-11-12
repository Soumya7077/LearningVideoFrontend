import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
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
    height: 150, // Ensure PagerView has a fixed height
    marginBottom: 10,
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
