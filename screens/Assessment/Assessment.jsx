import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./AssessmentStyle";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color } from "../../assets/colors/theme";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import axios from "axios";
import { BASEURL } from "../../config";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Assessment() {
  const [courseData, setCousrseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedNoOfQuestion, setSelectedNoOfQuestion] = useState("");
  const [questionAns, setQuestionAns] = useState({});
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [optionAttendByUser, setOptionAttendByUser] = useState([]);

  const noOfCourse = [
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 15, name: "15" },
    { value: 20, name: "20" },
    { value: 25, name: "25" },
  ];

  const type = [
    { value: "quiz", name: "Quiz" },
    { value: "assessment", name: "Assessment" },
  ];

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    axios({
      method: "get",
      url: `${BASEURL}/getcoursefromquestionans`,
    })
      .then((res) => {
        // console.log(res.data);
        const dropdownData = res.data?.course.map((item) => {
          return { value: item._id, name: item.courseName };
        });
        // console.log(dropdownData);
        setCousrseData(dropdownData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const noOfQuestionChange = (value) => {
    setSelectedNoOfQuestion(value);
  };

  const courseChange = (value) => {
    setSelectedCourse(value);
  };

  const typeChange = (value) => {
    setSelectedType(value);
  };

  const fetchQuestionAns = async () => {
    axios({
      method: "get",
      url: `${BASEURL}/getquestionansbycourse/${selectedCourse}`,
      params: {
        limit: selectedNoOfQuestion,
        page: page,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setQuestionAns(res.data);
        setCurrentIndex(0);
        setSelectedOptions({});
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 404) {
          Alert.alert(
            "Please select any course and no of question you want to attend"
          );
        }
      });
  };

  const nextClick = () => {
    // console.log(selectedOptions);
    if (Object.keys(selectedOptions).length !== currentIndex + 1) {
      setIsOptionSelected(false);
      Alert.alert("Oops!", "Please select one option before clicking on next");
      return;
    }
    if (currentIndex < questionAns?.questionAnswer.length - 1) {
      setIsOptionSelected(true);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const backClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));

    const question = questionAns?.questionAnswer[currentIndex];
    question.selectedOption = option;
    const isCorrectAns = question.correctAnswer === option ? true : false;
    question.isCorrectAns = isCorrectAns;
    setCourseId(question.courseId);

    setOptionAttendByUser((prev) => {
      const existingIndex = prev.findIndex((q) => q._id === question._id);

      if (existingIndex !== -1) {
        // Update the existing question's selected option
        const updatedOptions = [...prev];
        updatedOptions[existingIndex] = {
          ...updatedOptions[existingIndex],
          selectedOption: option,
          isCorrectAns,
        };
        return updatedOptions;
      } else {
        // Add new entry if not already in the list
        return [...prev, question];
      }
    });

    // console.log(question);
  };

  const finishClick = async () => {
    if (Object.keys(selectedOptions).length !== currentIndex + 1) {
      setIsOptionSelected(false);
      Alert.alert(
        "Oops!",
        "Please select one option before clicking on Finish"
      );
      return;
    }

    Alert.alert("Are you sure you want to submit the assessment?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => submitAssessment() },
    ]);
  };

  const submitAssessment = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    const userId = userData?.user?._id;

    axios({
      method: "post",
      url: `${BASEURL}/submitassessment`,
      data: {
        userId: userId,
        courseId: courseId,
        optionAttendByUser: optionAttendByUser,
        assessmentType: selectedType,
      },
    })
      .then((res) => {
        console.log(res.data);
        Alert.alert("Assessment submitted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {Object.keys(questionAns).length == 0 && (
        <View style={styles.container}>
          <Text style={styles.heading}>
            Start your exam preparation by selecting any given course
          </Text>
          <View style={styles.ddView}>
            <Text style={styles.textlbl}>Select Any Course</Text>
            <Dropdown data={courseData} onchangeDropdown={courseChange} />
          </View>
          <View style={styles.ddView}>
            <Text style={styles.textlbl}>
              Select no. of question you want to attend
            </Text>
            <Dropdown data={noOfCourse} onchangeDropdown={noOfQuestionChange} />
          </View>
          <View style={styles.ddView}>
            <Text style={styles.textlbl}>Select any</Text>
            <Dropdown data={type} onchangeDropdown={typeChange} />
          </View>
          <TouchableOpacity style={styles.btn} onPress={fetchQuestionAns}>
            <Text style={styles.btntext}>Start Test</Text>
          </TouchableOpacity>
        </View>
      )}
      {Object.keys(questionAns).length > 0 && (
        <View style={styles.questionContainer}>
          {/* {questionAns?.questionAnswer?.map((item, index) => {
            return ( */}
          <View>
            <Text style={styles.quesLbl}>
              Questions {currentIndex + 1} of{" "}
              {questionAns?.questionAnswer.length}
            </Text>
            <Text style={styles.questionText}>
              {questionAns?.questionAnswer[currentIndex]?.question}
            </Text>
            <View>
              {questionAns?.questionAnswer[currentIndex].options.map(
                (option, index) => {
                  return (
                    <TouchableOpacity
                      style={
                        selectedOptions[currentIndex] === option
                          ? styles.pressedOption
                          : styles.answerContainer
                      }
                      key={option}
                      onPress={() => handleOptionSelect(option)}
                    >
                      <Text
                        style={
                          selectedOptions[currentIndex] === option
                            ? styles.pressedText
                            : styles.optionText
                        }
                      >
                        {option}
                      </Text>
                      {selectedOptions[currentIndex] === option ? (
                        <FontAwesome
                          name="check-circle"
                          size={24}
                          color={color.white}
                          style={styles.iconStyle}
                        />
                      ) : (
                        <Entypo
                          name="circle"
                          size={20}
                          color="black"
                          style={styles.iconStyle}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }
              )}
            </View>

            <View
              style={
                currentIndex !== 0
                  ? [styles.btnView]
                  : { justifyContent: "flex-end" }
              }
            >
              {currentIndex !== 0 && (
                <TouchableOpacity
                  style={styles.nextContainer}
                  onPress={backClick}
                >
                  <Text style={styles.nextText}>BACK</Text>
                </TouchableOpacity>
              )}

              {currentIndex + 1 !== questionAns?.questionAnswer.length && (
                <TouchableOpacity
                  style={styles.nextContainer}
                  onPress={nextClick}
                >
                  <Text style={styles.nextText}>NEXT</Text>
                </TouchableOpacity>
              )}

              {currentIndex + 1 == questionAns?.questionAnswer.length && (
                <TouchableOpacity
                  style={styles.nextContainer}
                  onPress={finishClick}
                >
                  <Text style={styles.nextText}>FINISH</Text>
                </TouchableOpacity>
              )}
            </View>
            {selectedType == "quiz" && selectedOptions[currentIndex] && (
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.correctOption}>
                  <Text style={styles.correctText}>
                    {questionAns?.questionAnswer[currentIndex].correctAnswer}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
}
