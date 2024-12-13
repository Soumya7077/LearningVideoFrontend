import {
  Animated,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./LoginStyle";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useEffect, useRef, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { color } from "../../assets/colors/theme";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from "../../assets/styles/style";
import { BASEURL } from "../../config";

export default function Login() {
  const fadeAnim1 = useRef(new Animated.Value(1)).current; // Initially visible
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 600,
      delay: 200, // Delay for staggered effect
      useNativeDriver: true,
    }).start();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        // Hide image when keyboard is open
        Animated.timing(fadeAnim1, {
          toValue: 0, // Make image invisible
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(translateY, {
          toValue: -150,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Show image when keyboard is closed
        Animated.timing(fadeAnim1, {
          toValue: 1, // Make image visible
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      // Clean up listeners on unmount
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 1.1, // Scale up
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1, // Scale back to original size
      useNativeDriver: true,
    }).start();
  };

  /**=======================Login functionality===================== */

  const handleLogin = async () => {
    setLoading(true);

    setTimeout(() => {
      axios({
        method: "post",
        url: `${BASEURL}/login`,
        data: {
          email: userName,
          password: password,
        },
      })
        .then(async (res) => {
          if (res.data === "Username does not exist, Kindly Signup first") {
            Alert.alert(res.data);
          } else if (res.data == "Invalid Password") {
            Alert.alert(res.data);
          } else {
            const userData = JSON.stringify(res.data);
            await AsyncStorage.setItem('userData', userData);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'BottomNav' }],
              })
            );
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
  };

  /**=======================Login functionality===================== */

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Animated.Image
        source={require("../../assets/icon.png")}
        style={[styles.loginvector, { opacity: fadeAnim1 }]}
      />
      <Animated.Text style={[styles.signtext, { opacity: fadeAnim2 }]}>
        PARICHAY CLASSES
      </Animated.Text>
      <Animated.View style={[styles.inputview, { opacity: fadeAnim2 }]}>
        <Fontisto name="email" size={24} color={color.secondary} />
        <TextInput
          placeholder="Enter Email"
          style={styles.inputbox}
          onChangeText={(text) => setUserName(text)}
        />
      </Animated.View>
      <Animated.View style={[styles.inputview, { opacity: fadeAnim2 }]}>
        <Fontisto name="locked" size={24} color={color.secondary} />
        <TextInput
          placeholder="Enter Password"
          style={styles.inputbox}
          onChangeText={(text) => setPassword(text)}
        />
      </Animated.View>
      <Animated.View style={[styles.forgotcontainer, { opacity: fadeAnim2 }]}>
        <TouchableOpacity>
          <Text style={styles.forgottext}>Forgot password?</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.buttonView, { opacity: fadeAnim2 }]}>
        <TouchableOpacity
          style={[styles.button,globalStyles.flexrow, { transform: [{ scale: buttonScale }] }]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={() => handleLogin()}
        >
          <Text style={styles.buttontext}>Login</Text>
          {loading && <ActivityIndicator size="small" color={color.white} />}
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.signupcontainer, { opacity: fadeAnim2 }]}>
        <View>
          <Text style={styles.note}>Don't have an account?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signuptext}>Signup</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}
