import {
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
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";
import { color } from "../../assets/colors/theme";

export default function Courses() {
  const navigation = useNavigation();
  const [courseData, setCousrseData] = useState([]);
  const [courses, setCourses] = useState([]);

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
  }, []);

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
    const courseDesc = item?.courseDesc;
    const description = courseDesc.substring(0, 20);
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate("CourseDetails", {
            courseDetails: JSON.stringify(item),
          })
        }
      >
        <View style={styles.cardHeader}>
          <Image
            source={{
              uri: item?.courseImage,
              cache: "only-if-cached",
            }}
            style={styles.cardImage}
          />
        </View>
        <Text style={styles.courseName}>{item?.courseName}</Text>
        <Text style={styles.courseDesc}>{description}...</Text>
      </Pressable>
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
