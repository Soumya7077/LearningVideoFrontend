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
  import { styles } from "./RegisterStyle";
  import Fontisto from "@expo/vector-icons/Fontisto";
  import { useEffect, useRef, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
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
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
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
  
    const handleRegister = async () => {
      setLoading(true);
  
      setTimeout(() => {
        axios({
          method: "post",
          url: `${BASEURL}/signup`,
          data: {
            name:fullName,
            email: email,
            password: password,
            userType:1
          },
        })
          .then(async (res) => {
            console.log(res.data);
            Alert.alert("Register Successfully");
            navigation.navigate('Login');
            // if (res.data === "Username does not exist, Kindly Signup first") {
            //   Alert.alert(res.data);
            // } else if (res.data == "Invalid Password") {
            //   Alert.alert(res.data);
            // } else {
            //   const userData = JSON.stringify(res.data);
            //   await AsyncStorage.setItem('userData', userData);
            //   navigation.navigate('BottomNav');
            //   console.log(res.data);
            // }
          })
          .catch((err) => {
            if(err?.response?.status == 400){
                Alert.alert(err?.response?.data?.message);
            }
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
          source={require("../../assets/register.jpg")}
          style={[styles.loginvector, { opacity: fadeAnim1 }]}
        />
        <Animated.Text style={[styles.signtext, { opacity: fadeAnim2 }]}>
          LOGO
        </Animated.Text>
        <Animated.View style={[styles.inputview, { opacity: fadeAnim2 }]}>
          <Fontisto name="person" size={24} color={color.secondary} />
          <TextInput
            placeholder="Enter Full Name"
            style={styles.inputbox}
            onChangeText={(text) => setFullName(text)}
          />
        </Animated.View>
        <Animated.View style={[styles.inputview, { opacity: fadeAnim2 }]}>
          <Fontisto name="email" size={24} color={color.secondary} />
          <TextInput
            placeholder="Enter Email"
            style={styles.inputbox}
            onChangeText={(text) => setEmail(text)}
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

        <Animated.View style={[styles.buttonView, { opacity: fadeAnim2 }]}>
          <TouchableOpacity
            style={[styles.button,globalStyles.flexrow, { transform: [{ scale: buttonScale }] }]}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            onPress={() => handleRegister()}
          >
            <Text style={styles.buttontext}>Register</Text>
            {loading && <ActivityIndicator size="small" color={color.white} />}
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.signupcontainer, { opacity: fadeAnim2 }]}>
          <View>
            <Text style={styles.note}>Already have an account?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signuptext}>Signin</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
  