import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { styles } from "./HomeStyle";
import storage from "@react-native-firebase/storage";
import { Video, ResizeMode } from "expo-av";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";

export default function Home() {
  const [courseData, setCousrseData] = useState([]);

  useEffect(() => {
    const getCourseList = async () => {
      axios({
        method: "get",
        url: `${BASEURL}/courseList`,
        params:{
          limit: 4
        }
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
  <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Remove ScrollView wrapping around PagerView */}
      <View style={styles.bannerContainer}>
        <PagerView style={styles.pagerView} initialPage={0}>
          <View key="1">
            {/* <View style={styles.card} key="2">
              <Text>First Banner</Text>
              <Text>Swipe ➡️</Text>
            </View> */}
            <Image source={require('../../assets/banners/Banner1.png')} style={{width:'100%', height:130, resizeMode:'contain'}}/>
          </View>
          <View key="3" >
          <Image source={require('../../assets/banners/Banner3.png')} style={{width:'100%', height:130, resizeMode:'contain'}}/>
          </View>
          <View key="4" >
          <Image source={require('../../assets/banners/Banner2.png')} style={{width:'100%', height:130, resizeMode:'contain'}}/>
          </View>
        </PagerView>
      </View>

      {/* Rest of your content inside ScrollView */}
      <View>
        <Text style={styles.popularCourses}>Popular Courses</Text>
      </View>
      <View style={styles.popularContainer}>
        {courseData.map((course) => {
          const courseDesc = course?.courseDesc;
          const description = courseDesc.substring(0, 20);
          return (
            <Pressable
              style={styles.coursecard}
              onPress={() =>
                navigation.navigate("CourseDetails", {
                  courseDetails: JSON.stringify(course),
                })
              }
              key={course?._id}
            >
              <View style={styles.cardHeader}>
                <Image
                  source={{
                    uri: course?.courseImage,
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
