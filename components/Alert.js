import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { color } from "../assets/colors/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

export default function CustomConfirm({ visible, onClose, onConfirm, heading, message, confirmText, cancelText, confirmBtnColor }) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={onClose}>
            <Entypo name="cross" size={30} color={color.neutral[500]} />
          </TouchableOpacity>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>{heading}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor:confirmBtnColor}]} onPress={onConfirm}>
            <Text style={styles.btnText}>{confirmText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>{cancelText}</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertContainer: {
    backgroundColor: color.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  heading: {
    color: color.fontcolor,
    fontSize: 20,
    fontWeight: "600",
  },
  message: {
    color: color.neutral[500],
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    padding: 10,
  },
  btnContainer:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 15,
    // backgroundColor: color.primary,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  cancelBtn:{
    padding: 15,
    backgroundColor: color.neutral[200],
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  btnText: {
    color: color.white,
    fontSize: 20,
    fontWeight: "500",
    alignSelf:'center'
  },
 cancelBtnText: {
    color: color.fontcolor,
    fontSize: 20,
    fontWeight: "500",
    alignSelf:'center'
  },
  iconContainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  headingContainer:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10
  },
  messageContainer:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
});
