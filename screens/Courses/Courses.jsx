import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./CourseStyle";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";

export default function Courses() {
  const navigation = useNavigation();
  const [courseData, setCousrseData] = useState([]);

  useEffect(() => {
    const getCourseList = async () => {
      axios({
        method: "get",
        url: `${BASEURL}/courseList`,
      })
        .then((res) => {
          setCousrseData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCourseList();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {courseData.map((course) => {
            const courseDesc = course?.courseDesc;
            const description = courseDesc.substring(0,20)
          return (
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate("CourseDetails", {courseDetails: JSON.stringify(course)})}
              key={course?._id}
            >
              <View style={styles.cardHeader}>
                <Image
                  source={{
                    uri: course?.courseImage,
                    cache:'only-if-cached'
                  }}
                  style={styles.cardImage}
                />
              </View>
              <Text style={styles.courseName}>{course?.courseName}</Text>
              <Text style={styles.courseDesc}>{description}...</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
