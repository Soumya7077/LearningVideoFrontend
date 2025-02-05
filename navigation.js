import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { color } from "./assets/colors/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import Courses from "./screens/Courses/Courses";
import Profile from "./screens/Profile/Profile";
import CourseDetails from "./screens/CourseDetails/CourseDetails";
import Register from "./screens/Register/Register";
import ContactUs from "./screens/ContactUs/ContactUs";
import ShortsFeed from "./screens/ShortsFeed/ShortsFeed";
import MyAccount from "./screens/MyAccount/MyAccount";
import FavouriteCourseList from "./screens/FavouriteCourses/FavouriteCourses";
import SubscribedCourseList from "./screens/SubscribedCourseList/SubscribedCourseList";
import { Image } from "react-native";
import axios from "axios";
import { BASEURL } from "./config";
import InShorts from "./screens/InShorts/InShorts";

const BottomNavigation = createBottomTabNavigator();

function BottomNav() {
  const [isReelShown, setIsReelShown] = useState(false);
  const [isInShortsShown, setIsInShortsShown] = useState(false);

  const getAppRelatedDetails = async () => {
    axios({
      method: "get",
      url: `${BASEURL}/getappdetails`,
    })
      .then((res) => {
        const reel = res.data.filter((e) => e.name === "reel");
        const inshorts = res.data.filter((e) => e.name === "inshorts");
        if (reel[0].isActive == 1) {
          setIsReelShown(true);
        } else {
          setIsReelShown(false);
        }
        if (inshorts[0].isActive == 1) {
          setIsInShortsShown(true);
        } else {
          setIsInShortsShown(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppRelatedDetails();
  }, []);

  return (
    <BottomNavigation.Navigator
      screenOptions={({ route }) => ({
        animation: "fade",
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          let IconComponent = Ionicons;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Courses") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Reels") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          } else if (route.name === "InShorts") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.neutral[500],
      })}
    >
      <BottomNavigation.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <Image
              source={require("./assets/icon.png")}
              style={{ width: 50, height: 50, marginLeft: 12 }}
            />
          ),
          headerTitle: "",
        }}
      />
      {isReelShown && (
        <BottomNavigation.Screen
          name="Reels"
          component={ShortsFeed}
          options={{ headerShown: false }}
        />
      )}

      {isInShortsShown && (
        <BottomNavigation.Screen name="InShorts" component={InShorts} />
      )}

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
      setIsLoading(true);
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
      <StackNavigation.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigation.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigation.Screen
        name="BottomNav"
        component={BottomNav}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigation.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{
          headerTitle: "Course Details",
        }}
      />
      <StackNavigation.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          headerTitle: "My Account",
        }}
      />
      <StackNavigation.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerTitle: "Contact Us",
        }}
      />
      <StackNavigation.Screen
        name="FavouriteCourse"
        component={FavouriteCourseList}
        options={{
          headerTitle: "Favourite Course List",
        }}
      />
      <StackNavigation.Screen
        name="SubscribedCourse"
        component={SubscribedCourseList}
        options={{
          headerTitle: "My Courses",
        }}
      />
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
