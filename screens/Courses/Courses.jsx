import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./CourseStyle";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";
import { color } from "../../assets/colors/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Courses() {
  const navigation = useNavigation();
  const [courseData, setCousrseData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [favouriteCourseIds, setFavouriteCourseIds] = useState([]);

  useEffect(() => {
    const getCourseList = async () => {
      axios({
        method: "get",
        url: `${BASEURL}/courseList`,
      })
        .then((res) => {
          setCousrseData(res.data);
          setCourses(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCourseList();
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    const userId = userData?.user?._id;
    axios({
      method: "get",
      url: `${BASEURL}/getuser/${userId}`,
    }).then((res) => {
      // console.log(res.data, ";;;");
      setUserDetails(res.data);
      setFavouriteCourseIds(res.data.user.favouriteCourseIds);
    });
  };

  // Add Remove from favaourite

  const addremoveFavourite = async (courseId, isFav) => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    const userId = userData?.user?._id;
    axios({
      method: "put",
      url: `${BASEURL}/updatefavcourse/${userId}`,
      data: {
        courseIds: courseId,
      },
    })
      .then((res) => {
        // console.log(isFav);

        if (!isFav) {
          Alert.alert("Course added to your favourite list");
          setFavouriteCourseIds((prev) => [...prev, courseId]);
        } else {
          Alert.alert("Course removed from your favourite list");
          setFavouriteCourseIds((prev) => prev.filter((id) => id !== courseId));
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Add remove favourite courses

  const searchCourse = (text) => {
    if (text.trim() === "") {
      setCousrseData(courses);
      return;
    } else {
      const lowerCaseQuery = text.toLowerCase();
      const filterCourse = courseData.filter((course) => {
        return course.courseName.toLowerCase().includes(lowerCaseQuery);
      });
      setCousrseData(filterCourse);
    }
  };

  const renderItem = ({ item }) => {
    let isFav;
    const courseDesc = item?.courseDesc;
    const description = courseDesc.substring(0, 20);
    isFav = favouriteCourseIds.includes(item._id);
    return (
      <View style={styles.card}>
        <Pressable
          style={styles.cardHeader}
          onPress={() => {
            item?.courseType === "free"
              ? navigation.navigate("CourseDetails", {
                  courseDetails: JSON.stringify(item),
                })
              : Alert.alert(
                  "Please contact to admin for accessing this course"
                );
          }}
        >
          <Image
            source={{
              uri: item?.courseImage,
              cache: "only-if-cached",
            }}
            style={styles.cardImage}
          />
        </Pressable>
        <View style={styles.courseNameContainer}>
          <Text style={styles.courseName}>{item?.courseName}</Text>
          <Text
            style={
              item?.courseType === "free"
                ? styles.freeTypeStyle
                : styles.paidTypeStyle
            }
          >
            {item?.courseType === "free" ? "Free" : "Paid"}
          </Text>
        </View>

        <Text style={styles.courseDesc}>{description}...</Text>
        <View style={styles.courseNameContainer}>
          <Feather name="shopping-cart" size={24} color="black" />

          <AntDesign
            name={isFav ? "heart" : "hearto"}
            size={24}
            color={isFav ? color.danger : color.black}
            onPress={() => {
              addremoveFavourite(item?._id, isFav);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search course name..."
          style={styles.search}
          onChangeText={(text) => searchCourse(text)}
        />
        <Feather
          name="search"
          size={24}
          color={color.black}
          style={{ marginRight: 15 }}
        />
      </View>
      <FlatList
        data={courseData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.container}
      />
    </View>
  );
}
