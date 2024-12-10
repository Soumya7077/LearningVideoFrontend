import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BASEURL } from "../../config";
import { useEffect, useState } from "react";
import { styles } from "./SubscribedCourseListStyle";

export default function SubscribedCourseList() {
  const route = useRoute();
  const { user } = route.params;
  const navigation = useNavigation();
  const [subscribedCourse, setSubscribedCourse] = useState([]);

  const getUserPaidCourseData = async () => {
    axios({
      method: "get",
      url: `${BASEURL}/getpaidcourse/${user?.user?._id}`,
    })
      .then((res) => {
        console.log(res.data);
        setSubscribedCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserPaidCourseData();
  }, [route]);

  const renderItem = ({ item }) => {
    const courseDesc = item?.courseDesc;
    const description = courseDesc.substring(0, 50);
    const purchaseDate = item?.purchaseDate
      ? item.purchaseDate.split("-").reverse().join("-")
      : "";
    const expiryDate = item?.expiryDate
      ? new Date(item.expiryDate)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-")
      : "";
    const today = new Date()
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
    const isExpire = today > expiryDate ? true : false;

    return (
      <View style={styles.container}>
        <View style={styles.courseBox}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              !isExpire
                ? navigation.navigate("CourseDetails", {
                    courseDetails: JSON.stringify(item),
                  })
                : Alert.alert(
                    "This course has expired",
                    "Please purchase again"
                  );
            }}
          >
            <Image
              source={{ uri: item?.courseImage }}
              style={styles.imageStyle}
            />
            <Text style={styles.courseNameStyle}>{item?.courseName}</Text>
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <Text style={styles.descStyle}>{description}...</Text>
            <View style={styles.lastContainer}>
              <View>
                <Text style={styles.labelText}>Purchase Date: </Text>
              </View>
              <View>
                <Text style={styles.text}>{purchaseDate}</Text>
              </View>
            </View>
            <View style={styles.lastContainer}>
              {!isExpire && (
                <>
                  <View>
                    <Text style={styles.labelText}>Expiry Date: </Text>
                  </View>

                  <View>
                    <Text style={styles.text}>{expiryDate}</Text>
                  </View>
                </>
              )}
              {isExpire && (
                <View>
                  <Text style={styles.paidTypeStyle}>Expired</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No subscribed course found</Text>
    </View>
  );

  return (
    <>
      <FlatList
        data={subscribedCourse}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </>
  );
}
