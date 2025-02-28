import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { styles } from "./HomeStyle";
import storage from "@react-native-firebase/storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../assets/colors/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function Home() {
  const [courseData, setCousrseData] = useState([]);
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState('');


  const onRefresh = React.useCallback(() => {
      setRefresh(true);
      setTimeout(() => {
        getCourseList();
        setRefresh(false);
      }, 2000);
    }, []);

  // useEffect(() => {
    const getUser = async () => {
      const authData = await AsyncStorage.getItem("userData");
      const userData= JSON.parse(authData);
      const userFirstName = userData?.user?.name.split(" ").slice(0,1).join('');
      // console.log(userFirstName);
      setUser(userFirstName);
    };
    // getUser();
  // }, []);

  const getCourseList = async () => {
    setLoading(true);
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
      }).finally(() => {
        setLoading(false);
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
            imageUrl = await getBannerImage("staticbanner.jpg");
          }

          return { ...banner, image: imageUrl };
        })
      );

      setBanners(updatedBanners);
      // console.log(updatedBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    getUser();
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


  const BannerLoading = () => {
    return(
      <View style={styles.bannerBackground}>
        <SkeletonLoader width="100%" height="100%" borderRadius={10} />
      </View>
    )
  }


  const ExamLoading =() => {
    return(
      <View style={[styles.btnView]}>
          <View style={styles.testFirstView}>
            <View style={styles.testTitle}><SkeletonLoader width="100%" height={25} borderRadius={10} /></View>
            <View style={styles.testDesc}>
            <SkeletonLoader width="100%" height={25} borderRadius={10} />
            </View>
            
          </View>
          <View style={styles.testSecondView}>
            <SkeletonLoader width={100} height={120} borderRadius={10} />
          </View>

      </View>
    )
  }


  const CourseLoading = () => {
    return(
      <View style={styles.coursecard}>
        <View style={styles.cardHeader}>
          <SkeletonLoader width={120} height={100} borderRadius={8} />
        </View>
        <View style={styles.courseName}>
          <SkeletonLoader width={120} height={15} borderRadius={4} />
        </View>
        <View style={styles.courseDesc}>
        <SkeletonLoader width={130} height={10} borderRadius={4} />

        </View>
        
      </View>
    )
  }

  return (
    <>
      <View style={styles.bottomHeaderView}>
        <View style={styles.leftHeader}>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.name}>{user} 👋</Text>
        </View>
        <View style={styles.rightHeader}>
          <Image
            style={styles.headerImage}
            source={require("../../assets/icon.png")}
          />
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={onRefresh}
                  colors={[color.white]}
                  progressBackgroundColor={color.primary}
                />
              }>
      <View style={styles.bannerView}>
        {
          loading ? <BannerLoading /> : <View style={styles.bannerContainer}>
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
        }
        
        {
          loading ? <ExamLoading /> : <View style={styles.btnView}>
          <View style={styles.testFirstView}>
            <Text style={styles.testTitle}>Ace Your Exams</Text>
            <Text style={styles.testDesc}>
              Generate custom papers that targets your weekness
            </Text>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => navigation.navigate("Assessment")}
            >
              <Text style={styles.btnText}>Try it now</Text>
              <AntDesign
                style={{ alignSelf: "center" }}
                name="arrowright"
                size={18}
                color={color.black}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.testSecondView}>
            <Image
              source={require("../../assets/test.png")}
              style={styles.testImg}
            />
          </View>
        </View>
        }
        

        <View>
          <Text style={styles.popularCourses}>Popular Courses</Text>
        </View>
        <View style={styles.popularContainer}>
        {loading
  ? Array.from({ length: 6 }).map((_, index) => (
      <CourseLoading key={index} />
    ))
  : courseData.map((course) => {
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
        <View style={{ marginBottom: 150 }} />
      </View>
    </ScrollView>
    </>
  );
}
