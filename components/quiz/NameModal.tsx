import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

interface modalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NameModal = ({ setModal }: modalProps) => {
  const [name, setName] = useState("");

  const handleClick = async () => {
    if (!name) {
      return;
    }
    // 로컬에 저장하기
    await AsyncStorage.setItem("name", name);
    setModal(false);
  };
  return (
    <View style={styles.bg}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>이름을 알려주세요</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />
        <TouchableOpacity onPress={handleClick} style={styles.btn}>
          <Text style={styles.btnText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 모달 높이 설정
const screenHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  bg: {
    height: screenHeight,
  },
  wrapper: {
    backgroundColor: "#F5F5F5",
    padding: 30,
    marginHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    top: "35%",
    gap: 40,
    shadowColor: "#000", // 그림자 색상
    shadowOffset: { width: 4, height: 4 }, // 그림자 위치
    shadowOpacity: 0.5, // 그림자 투명도
    shadowRadius: 10, // 그림자 반경
  },
  text: {
    fontSize: 24,
  },
  input: {
    fontSize: 20,
    width: "100%",
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    backgroundColor: "#FFFFFF",
    padding: 20,
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

export default NameModal;
