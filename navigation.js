import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { color } from "./assets/colors/theme";
import Ionicons from '@expo/vector-icons/Ionicons';
import Courses from "./screens/Courses/Courses";
import Profile from "./screens/Profile/Profile";
import CourseDetails from "./screens/CourseDetails/CourseDetails";
import Register from "./screens/Register/Register";

const BottomNavigation = createBottomTabNavigator();

function BottomNav() {
  return (
    <BottomNavigation.Navigator
      screenOptions={({ route }) => ({
        animation: "fade",
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          let IconComponent = Ionicons;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }else if(route.name ==="Courses"){
            iconName = focused ? "book" : "book-outline";
          }
          else if(route.name ==="Profile"){
            iconName = focused ? "person" : "person-outline";
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.neutral[500],
      })}
    >
      <BottomNavigation.Screen name="Home" component={Home} />
      <BottomNavigation.Screen name="Courses" component={Courses} />
      <BottomNavigation.Screen name="Profile" component={Profile} />
    </BottomNavigation.Navigator>
  );
}

const StackNavigation = createNativeStackNavigator();

function LoginStackNavigation() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  

  useEffect(() => {
    // GoogleSignin.revokeAccess();
    // GoogleSignin.signOut();
    const getUserData = async () => {
      const authData = await AsyncStorage.getItem("userData");
      if (authData) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // const timeout = setTimeout(() => {
      navigation.navigate(isLoggedIn ? "BottomNav" : "Login");
      // }, 5000);

      // return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  return ( 
    <StackNavigation.Navigator
      
      initialRouteName={isLoggedIn ? "BottomNav" : "Login"}
    >
      <StackNavigation.Screen name="Login" component={Login} options={{
        headerShown:false
      }} />
      <StackNavigation.Screen name="Register" component={Register} options={{
        headerShown:false
      }} />
      <StackNavigation.Screen name="BottomNav" component={BottomNav} options={{
        headerShown:false
      }} />
      <StackNavigation.Screen name="CourseDetails" component={CourseDetails} options={{
        headerTitle:"Course Details"
      }} />
    </StackNavigation.Navigator>
  );
}


export default function Navigation() {
 


  return (
    <NavigationContainer>
      
     <LoginStackNavigation />
    </NavigationContainer>
  );
}
