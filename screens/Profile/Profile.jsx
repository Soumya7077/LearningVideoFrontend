import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ProfileStyle";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { color } from "../../assets/colors/theme";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      setUserDetails(userData);
    };

    getUserData();
  }, []);

  const signoutPress = async () => {
    await AsyncStorage.removeItem("userData");
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>
            {userDetails?.name ? userDetails.name[0] : ""}
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{userDetails?.name}</Text>
          <Text style={styles.emailText}>{userDetails?.email}</Text>
        </View>
      </View>

      <View style={styles.profileCardBottomContainer}>
        <TouchableOpacity style={styles.profileCardBottom}>
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
        <TouchableOpacity style={styles.profileCardBottom}>
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
