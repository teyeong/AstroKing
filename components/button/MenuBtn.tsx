import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

const MenuBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View>
      <Pressable style={styles.wrapper} onPress={() => setIsOpen(!isOpen)}>
        <Image
          source={require("../../assets/images/Earth.png")}
          style={styles.image}
        />
      </Pressable>
      {isOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.navigate("/")}
          >
            <Text style={styles.text}>퀴즈</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.navigate("/CalendarPage")}
          >
            <Text style={styles.text}>달력</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.navigate("/TitlePage")}
          >
            <Text style={styles.text}>칭호</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    right: 30,
    width: 90,
    height: 90,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  menuContainer: {
    position: "absolute",
    width: 150,
    bottom: 115,
    right: 5,
    backgroundColor: "#F7F7F7",
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  itemContainer: {
    paddingVertical: 20,
  },
  line: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  text: {
    fontSize: 20,
  },
});

export default MenuBtn;
