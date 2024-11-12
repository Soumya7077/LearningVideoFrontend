import { Image, ScrollView, Text, View } from "react-native";
import styles from "./ContactUsStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { color } from "../../assets/colors/theme";

export default function ContactUs() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>GET IN TOUCH</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/contactus.jpeg")}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.subheading}>
            Don't hesitate to contact us whether you have a suggestion on our
            improvement, a complain to discuss or an issue to solve.
          </Text>
        </View>

        <View style={styles.contactContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Ionicons name="call" size={28} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.contactText}>+91 987-654-3210</Text>
            </View>
          </View>
        </View>
        <View style={styles.contactContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Entypo name="mail" size={28} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.contactText}>learing@support.com</Text>
            </View>
          </View>
        </View>
        <View style={styles.contactContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Entypo name="location-pin" size={28} color={color.secondary} />
            </View>
            <View>
              <Text style={styles.contactText}>
                123 Anywhere St., Any City, ST, Country, 123456
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>MONDAY TO FRIDAY</Text>
          <Text style={styles.text}>from 9:00 am to 7:00 pm</Text>
        </View>
      </View>
    </ScrollView>
  );
}
