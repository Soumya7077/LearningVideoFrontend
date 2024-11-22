import { useNavigation, useRoute } from "@react-navigation/native";
import {
    Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./MyAccountStyle";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyAccount() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");

  const route = useRoute();

  useEffect(() => {
    const user = route.params;
    const loggedInUser = JSON.parse(user?.userDetails);

    setName(loggedInUser?.user?.name);
    setEmail(loggedInUser?.user?.email);
    setPassword(loggedInUser?.user?.password);
    setDob(loggedInUser?.userDetails?.dob);
    setPhone(loggedInUser?.user?.phone);
    setUserId(loggedInUser?.user?._id);
  }, [route]);

  const updateUser = async () => {
    axios({
      method: "put",
      url: `${BASEURL}/updateuser/${userId}`,
      data: {
        name: name,
        email: email,
        password: password,
        dob: dob,
        displayName: name,
        phone: phone,
      },
    })
      .then(async(res) => {
        console.log(res.data);
        const userData= res.data;
        Alert.alert(res.data?.message);
        await AsyncStorage.setItem('userData', JSON.stringify(res.data));
        // navigation.navigate('Profile');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Text>My Account</Text> */}
      <View style={styles.profileCard}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>{name ? name[0] : ""}</Text>
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.inputbox}
          placeholder="Enter your full name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputbox}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputbox}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.inputbox}
          placeholder="Enter your DOB in dd-mm-yyyy"
          value={dob}
          onChangeText={(text) => setDob(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.inputbox}
          placeholder="Enter your mobile number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={() => updateUser()}>
          <Text style={styles.btnText}>Update User</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
