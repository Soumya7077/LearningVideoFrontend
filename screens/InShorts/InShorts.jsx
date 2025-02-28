import { ActivityIndicator, Dimensions, FlatList, Image, Text, View } from "react-native";
import { styles } from "./InShortsStyle";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from "@react-native-firebase/storage";
import { color } from "../../assets/colors/theme";

export default function InShorts() {
  const [inshortsData, setInShortsData] = useState([]);
  const { height } = Dimensions.get("window");

  const [loading, setLoading] = useState(false);

  const getInshortsData = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      const id = userData?.user?._id;

      const res = await axios.get(`${BASEURL}/getstatment/${id}`);
      
      const arrangedStatements = res.data?.arrangedStatements
        .map((item) => item?.statements)
        .flat();
      
      const dataWithImages = await Promise.all(
        arrangedStatements.map(async (item) => {
          if (item?.imgUrl !== "") {
            try {
              const img = await storage()
                .ref(`statements/${item.imgUrl}`)
                .getDownloadURL();
              return { ...item, img };
            } catch (error) {
              console.warn(`Image not found for imgUrl: ${item.imgUrl}`);
              return { ...item, img: null };
            }
          }else{
            const img = res.data?.arrangedStatements.find((e) => e._id == item?.courseId);
            return { ...item, img: img?.courseImage };
          }

          

          
        })
      );

      // console.log(dataWithImages,"llll")

      setInShortsData(dataWithImages);
    } catch (err) {
      console.error("Error fetching data:", err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getInshortsData();
  }, []);

  if(loading){
    return(
      <ActivityIndicator color={color.primary} style={{flex:1,justifyContent:'center', alignSelf:'center'}} size="large" />
    )
  }

  const renderItem = ({ item }) => (
    <View style={[styles.container, { height }]}>
      {item.img && (
        <Image
          source={{ uri: item.img, cache: "only-if-cached" }}
          style={styles.image}
        />
      )}
      <Text style={styles.textStyle}>{item?.statement}</Text>
    </View>
  );

  return (
    <FlatList
      data={inshortsData}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      pagingEnabled
      snapToInterval={height} 
      snapToAlignment="start"
      decelerationRate="fast" 
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={{marginBottom:150}}
    />
  );
}