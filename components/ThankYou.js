import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color } from "../assets/colors/theme";
import { useEffect } from "react";

export default function ThankYou({navigation}) {

  useEffect(() => {
    const backAction = () => {
      // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => null,
      //     style: 'cancel',
      //   },
      //   {text: 'YES', onPress: () => BackHandler.exitApp()},
      // ]);
      navigation.navigate("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <AntDesign name="checkcircle" size={50} color={color.primary} />
        <Text style={styles.heading}>🎉 Thank You! 🎉</Text>
        <Text style={styles.message}>
          Your assessment has been successfully submitted.
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.btnText}>HOME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  heading: {
    fontSize: 24,
    marginTop: 12,
    color: color.fontcolor,
    fontWeight: "600",
  },
  message: {
    fontSize: 16,
    color: color.neutral[500],
    marginTop: 12,
    textAlign: "center",
    padding: 12,
  },
  btn: {
    backgroundColor: color.primary,
    padding: 15,
    width: "100%",
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  btnText: {
    color: color.white,
    fontSize: 20,
    fontWeight: "600",
  },
});
