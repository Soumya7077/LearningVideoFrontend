import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight:10,
    marginTop:5,
    marginBottom:5
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
  popularContainer:{
    flex:3
  },
  video: {
    width: '100%',  // Make the video take up 90% of the screen's width
    height: 280,   // Set a fixed height for the video player
    backgroundColor: 'black', // Background color for the video area
  },
  buttons: {
    marginTop: 20,    // Add some space between the video and the button
    flexDirection: 'row', // Layout the buttons horizontally
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,   // Add space between the buttons
  },
});
