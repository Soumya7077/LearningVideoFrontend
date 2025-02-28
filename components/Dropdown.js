import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { color } from "../assets/colors/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Dropdown({ data, onchangeDropdown }) {
  const [isDropdownClick, setIsDropdownClick] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [selectedDropdownName, setSelectedDropdownName] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const searchData = (text) => {
    const filteredData = data.filter((item) => item.name.includes(text));
    setFilteredData(filteredData);
  };

  const toggleDropdown = () => {
    LayoutAnimation.easeInEaseOut(); // Smooth animation
    setIsDropdownClick(!isDropdownClick);
  };

  const dropdownSelect = (item) => {
    toggleDropdown(); // Close dropdown smoothly
    setSelectedDropdownValue(item.value);
    setSelectedDropdownName(item.name);
    onchangeDropdown(item.value);
  };

  return (
    <View>
      {/* Dropdown Button */}
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.ddlbl}>
          {selectedDropdownName !== "" ? selectedDropdownName : "--Select--"}
        </Text>
        <AntDesign name="caretdown" size={20} color={color.neutral[500]} />
      </TouchableOpacity>

      {/* Dropdown List (With Smooth Animation) */}
      {isDropdownClick && (
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.textinput}
            placeholder="Search..."
            onChangeText={searchData}
          />
          <ScrollView style={styles.dropdownlistview}>
            {filteredData.map((item) => (
              <TouchableOpacity key={item.value} onPress={() => dropdownSelect(item)}>
                <Text style={styles.ddtext}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
            {filteredData.length === 0 && (
              <Text style={styles.textError}>No Data Found</Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// 🌟 STYLES 🌟
const styles = StyleSheet.create({
  dropdown: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: color.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ddlbl: {
    fontSize: 14,
    fontWeight: "500",
    color: color.neutral[500],
  },
  dropdownContainer: {
    backgroundColor: color.white,
    borderRadius: 10,
    marginTop: 5,
  },
  dropdownlistview: {
    padding: 16,
    maxHeight: 150,
  },
  ddtext: {
    fontSize: 16,
    fontWeight: "500",
    color: color.fontcolor,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    borderBottomColor: color.neutral[300],
  },
  textinput: {
    borderWidth: 1.5,
    borderColor: color.secondary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  textError: {
    color: color.danger,
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5,
  },
});
