import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ProfileStyle";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color } from "../../assets/colors/theme";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import axios from "axios";
import { BASEURL } from "../../config";

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const navigation = useNavigation();

  const getUserData = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    const userId = userData?.user?._id;
    axios({
      method: "get",
      url: `${BASEURL}/getuser/${userId}`,
    }).then((res) => {
      // console.log(res.data, ";;;");
      setUserDetails(res.data);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
      // No cleanup needed here, so no return value
    }, [])
  );

  const signoutPress = async () => {
    await AsyncStorage.removeItem("userData");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>
            {userDetails?.user?.name ? userDetails?.user?.name[0] : ""}
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{userDetails?.user?.name}</Text>
          <Text style={styles.emailText}>{userDetails?.user?.email}</Text>
        </View>
      </View>

      <View style={styles.profileCardBottomContainer}>
        <TouchableOpacity
          style={styles.profileCardBottom}
          onPress={() =>
            navigation.navigate("MyAccount", {
              userDetails: JSON.stringify(userDetails),
            })
          }
        >
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Ionicons name="person" size={24} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.bottomText}>My Account</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={color.secondary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileCardBottom}
          onPress={() => navigation.navigate("SubscribedCourse", { user: userDetails })}
        >
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Ionicons name="book-sharp" size={24} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.bottomText}>My Courses</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={color.secondary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileCardBottom}
          onPress={() =>
            navigation.navigate("FavouriteCourse", { user: userDetails })
          }
        >
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Ionicons name="heart-sharp" size={24} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.bottomText}>My Favourite Courses</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={color.secondary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileCardBottom}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <FontAwesome5 name="history" size={22} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.bottomText}>Purchase History</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={color.secondary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileCardBottom}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Ionicons name="help-sharp" size={24} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.bottomText}>Help</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={color.secondary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileCardBottom}
          onPress={() => navigation.navigate("ContactUs")}
        >
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <AntDesign name="message1" size={23} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.bottomText}>Contact Us</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={color.secondary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileCardBottomLast}
          onPress={() => signoutPress()}
        >
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Ionicons
                name="log-out-sharp"
                size={24}
                color={color.secondary}
              />
            </View>
            <View>
              <Text style={styles.bottomText}>Logout</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={color.secondary}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
