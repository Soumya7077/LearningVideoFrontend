import {
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./CourseStyle";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";
import { color } from "../../assets/colors/theme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function Courses() {
  const navigation = useNavigation();
  const [courseData, setCousrseData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [favouriteCourseIds, setFavouriteCourseIds] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      getCourseList();
      setRefresh(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getCourseList();
    getUserData();
  }, []);

  const getCourseList = async () => {
    setLoading(true);
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
      }).finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      // getCourseList();
      getUserData();
      // No cleanup needed here, so no return value
    }, [])
  );
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
  
  

  const renderSkeleton = () => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
        <SkeletonLoader width={130} height={100} borderRadius={8} />
        </View>
        
        <View style={styles.courseNameContainer}>
          <SkeletonLoader width={120} height={15} borderRadius={4} />
        </View>
        <SkeletonLoader width={140} height={10} borderRadius={4} />
        <View style={styles.courseNameContainer}>
          <SkeletonLoader width={30} height={30} borderRadius={15} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
      </View>
    );
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
            item?.courseType == 0
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
          {/* <Text
            style={
              item?.courseType === 0
                ? styles.freeTypeStyle
                : styles.paidTypeStyle
            }
          >
            {item?.courseType === 0 ? "Free" : "Paid"}
          </Text> */}
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
    <>
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
      {loading ? (
      <FlatList
        data={Array.from({ length: 8 })} // Dummy array for skeletons
        renderItem={renderSkeleton}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.container}
      />
    ) : (
      <FlatList
        data={courseData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.container}
        
        contentContainerStyle={{ paddingBottom: 120, backgroundColor: color.bg }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            colors={[color.white]}
            progressBackgroundColor={color.primary}
          />
        }
      />
      
    )}
    
    </>
  );
}
