import { Alert, BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color } from "../assets/colors/theme";
import { useEffect, useState } from "react";

export default function ThankYou({navigation, route}) {

  const [obtainedScore, setObtainedScore] = useState(0);
  const [questionsNo, setQuestionNo] = useState(0);
  const [assessment, setAssessment] = useState({});

  useEffect(() => {
    const {item } = route.params;
    const assessmentData = JSON.parse(item);
    setAssessment(assessmentData);
    const totalScore = assessmentData?.totalScore;
    const noOfQuestion = assessmentData?.optionAttendByUser?.length;
    setObtainedScore(totalScore);
    setQuestionNo(noOfQuestion);
    const backAction = () => {
      
      navigation.navigate("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quiz Result</Text>
      <Image source={require('../assets/trophy.jpg')} style={{width:200, height:200,resizeMode:'contain' }} />
      <Text style={styles.heading}>🎉 Thank You! 🎉</Text>
      <Text style={styles.message}>
          Your assessment has been successfully submitted.
        </Text>
        <Text style={styles.score}>
          Your Score
        </Text>
        <View style={styles.scorecontainer}>
        <Text style={styles.scoreText}>{obtainedScore}</Text>
        <Text style={styles.totalScoreTxt}>/</Text>
        <Text style={styles.totalScoreTxt}>{questionsNo}</Text>
        </View>
      {/* <View style={styles.container}>
        
      </View> */}
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ScoreResult", {item: JSON.stringify(assessment)})}>
        <Text style={styles.btnText}>Check Score</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: color.white,
  },
  heading: {
    fontSize: 24,
    marginTop: 12,
    color: color.fontcolor,
    fontWeight: "600",
  },
  message: {
    fontSize: 16,
    color: color.neutral[500],
    marginTop: 12,
    textAlign: "center",
    padding: 12,
  },
  btn: {
    backgroundColor: color.primary,
    padding: 15,
    width: "100%",
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  score:{
    fontSize: 24,
    color: color.neutral[500],
    marginTop: 15,
    fontWeight: "600",
  },

  btnText: {
    color: color.white,
    fontSize: 20,
    fontWeight: "600",
  },
  scorecontainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText:{
    fontSize:24,
    color: color.success,
    fontWeight: "600",
  },
  totalScoreTxt:{
    fontSize:24,
    color: color.fontcolor,
    fontWeight: "600",
  }
});
