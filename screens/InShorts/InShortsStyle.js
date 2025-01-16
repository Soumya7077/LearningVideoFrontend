import { Dimensions, StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";

const { height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin:10,
    justifyContent: "start",
    height,
    // padding:12
  },
  image: {
    width: "100%",
    height: "40%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: "cover",
    backgroundColor: color.white,
    elevation: 8,
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textStyle: {
    margin: 10,
    color: color.fontcolor,
    fontWeight: "500",
    lineHeight: 25,
    textAlign: "start",
    alignSelf: "baseline",
  },
});
