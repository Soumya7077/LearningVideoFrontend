import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoContainer: {
      height, 
      width: '100%',
    },
    video: {
      height: '100%',
      width: '100%',
    },
  });