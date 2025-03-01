import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
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
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { BASEURL } from "./config";
import InShorts from "./screens/InShorts/InShorts";
import Assessment from "./screens/Assessment/Assessment";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ThankYou from "./components/ThankYou";

const BottomNavigation = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  const scale = useSharedValue(focused ? 1.2 : 1);
  const translateY = useSharedValue(focused ? -24 : 7);
  const circleScale = useSharedValue(focused ? 1 : 0);
  const textScale = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    scale.value = withTiming(focused ? 1.2 : 1, { duration: 200 });
    translateY.value = withTiming(focused ? -24 : 7, { duration: 200 });
    circleScale.value = withTiming(focused ? 1 : 0, { duration: 200 });
    textScale.value = withTiming(focused ? 1 : 0, { duration: 200 });
  }, [focused]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ scale: textScale.value }],
  }));

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animated.View style={[styles.container, animatedButtonStyle]}>
        <View
          style={[
            styles.btn,
            { borderColor: focused ? color.bg : color.primary }, // Adjust colors accordingly
          ]}
        >
          <Animated.View style={[styles.circle, animatedCircleStyle]} />
          <Ionicons name={item.icon} size={24} color={color.white} />
        </View>
        <Animated.Text style={[styles.text, animatedTextStyle]}>
          {item.label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const TabArr = [
  {
    route: "Home",
    label: "Home",
    icon: "home",
    component: Home,
  },
  {
    route: "Reels",
    label: "Reels",
    icon: "play-circle",
    component: ShortsFeed,
  },
  {
    route: "InShorts",
    label: "InShorts",
    icon: "document-text",
    component: InShorts,
  },
  {
    route: "Courses",
    label: "Courses",
    icon: "book",
    component: Courses,
  },
  {
    route: "Profile",
    label: "Profile",
    icon: "person",
    component: Profile,
  },
];

function BottomNav() {
  

  return (
    <BottomNavigation.Navigator
      screenOptions={{
        headerShown: false,
        // header: () => (
        //   <View style={styles.bottomHeaderView}>
        //     <View style={styles.leftHeader}>
        //       <Text style={styles.hello}>Hello,</Text>
        //       <Text style={styles.name}>{user} 👋</Text>
        //     </View>
        //     <View style={styles.rightHeader}>
        //       <Image
        //         style={styles.headerImage}
        //         source={require("./assets/icon.png")}
        //       />
        //     </View>
        //   </View>
        // ),
        tabBarStyle: {
          position: "absolute",
          height: 70,
          bottom: 24,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: color.primary,
          borderTopWidth: 1,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <BottomNavigation.Screen
            key={index}
            name={item.route}
            component={item.component}
            
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
              
            }}
          />
        );
      })}
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
      screenOptions={{
        statusBarColor: color.secondary,
        animation: "slide_from_right",
        animationDuration: 2000,
      }}
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
        name="Assessment"
        component={Assessment}
        options={{
          headerTitle: "My Assessment",
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
        name="ThankYou"
        component={ThankYou}
        options={{
          headerShown:false,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderWidth: 4,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  text: {
    color: color.white,
    fontSize: 10,
    textAlign: "center",
    marginTop: 6,
    fontWeight: "500",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    borderRadius: 25,
  },
  
});
