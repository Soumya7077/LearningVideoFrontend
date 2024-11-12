import {
  Button,
  FlatList,
  Image,
  ImageBackground,
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
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [courseData, setCousrseData] = useState([]);
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  const [backgroundBanner, setBackgroundBanner] = useState(
    require("../../assets/banners/banner4.jpg")
  );
  
  const [loading, setLoading] = useState(false);

  const getCourseList = async () => {
    axios({
      method: "get",
      url: `${BASEURL}/courseList`,
      params: {
        limit: 4,
      },
    })
      .then((res) => {
        setCousrseData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBanners = async () => {
    try {
      const response = await axios.get(`${BASEURL}/noticelist`);
      const banners = response.data;
      

      const updatedBanners = await Promise.all(
        banners.map(async (banner) => {
          let imageUrl;
          if (banner?.image) {

            imageUrl = await getBannerImage(banner?.image);
          } else {
            imageUrl = await getBannerImage('staticbanner.jpg');
          }
  
          return { ...banner, image: imageUrl };
        })
      );
  
      setBanners(updatedBanners);
      console.log(updatedBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };
  

  useEffect(() => {
    getBanners();
    getCourseList();
  }, []);

  const getBannerImage = async (bannerUrl) => {
    try {
      setLoading(true);
      const banner = await storage()
        .ref(`banners/${bannerUrl}`)
        .getDownloadURL();
      return banner;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.bannerContainer}>
        <PagerView style={styles.pagerView} initialPage={0}>
          {banners?.map((banner, index) => {
            
            return (
              <ImageBackground
              key={index}
                source={{ uri: banner?.image }}
                style={styles.bannerBackground}
              >
                <Text style={styles.shortDesc}>{banner?.descShort}</Text>
                <Text style={styles.longDesc}>{banner?.descLong}</Text>
              </ImageBackground>
            );
          })}
          
        </PagerView>
      </View>

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
