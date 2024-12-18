import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface modalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const WrongModal = ({ setModal }: modalProps) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getLocalData = async () => {
      const quizData = (await AsyncStorage.getItem("quiz")) ?? "";
      const parsedQuizData = quizData ? JSON.parse(quizData) : {};

      setTitle(parsedQuizData.quiz);
    };
    getLocalData();
  }, []);
  return (
    <View style={styles.bg}>
      <View style={styles.wrapper}>
        <Text style={styles.correctText}>정답이 아니에요</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>오늘의 우주는</Text>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <TouchableOpacity onPress={() => setModal(false)} style={styles.btn}>
          <Text style={styles.btnText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 모달 배경용 너비, 높이
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  bg: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute",
  },
  wrapper: {
    backgroundColor: "#F5F5F5",
    padding: 30,
    marginHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    top: "40%",
    gap: 30,
    shadowColor: "#000", // 그림자 색상
    shadowOffset: { width: 4, height: 4 }, // 그림자 위치
    shadowOpacity: 0.5, // 그림자 투명도
    shadowRadius: 10, // 그림자 반경
  },
  correctText: {
    fontSize: 24,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 500,
    textAlign: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008CFF",
    borderRadius: 10,
    width: "100%",
    height: 60,
    marginTop: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default WrongModal;
