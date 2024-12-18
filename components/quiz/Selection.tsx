import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";

interface selectionProps {
  setCorrectModal: React.Dispatch<React.SetStateAction<boolean>>;
  setWrongModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
  options: string[];
  answer: string;
  date: string;
  dateList: string[];
}

const Selection = ({
  setCorrectModal,
  setWrongModal,
  setIsDone,
  options,
  answer,
  date,
  dateList,
}: selectionProps) => {
  const [checked, setChecked] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [tomorrow, setTomorrow] = useState("");

  const handleClick = async () => {
    if (!checked) {
      return;
    }

    await AsyncStorage.setItem("isDone", "true");
    setIsDone(true);
    if (checked === answer) {
      setCorrectModal(true);
      if (dateList[dateList.length - 1] !== tomorrow) {
        await AsyncStorage.setItem(
          "dateList",
          JSON.stringify([...dateList, tomorrow])
        );
      }
    } else {
      setWrongModal(true);
    }
  };

  // 퀴즈 date 기준 다음 날 설정
  useEffect(() => {
    const dateObj = new Date(date);

    // 하루 더하기
    dateObj.setDate(dateObj.getDate() + 1);

    // 내일 날짜를 "yyyy-MM-DD" 형식으로 포맷팅
    setTomorrow(
      `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(dateObj.getDate()).padStart(2, "0")}`
    );
  }, [date]);

  // isDone 설정
  useEffect(() => {
    if (dateList[dateList.length - 1] === tomorrow) {
      // dateList 마지막 날짜가 퀴즈 업데이트 다음 날일 때
      setIsDone(true);
    }
  }, [dateList, tomorrow]);

  useEffect(() => {
    if (options.length > 0 && answer) {
      setChoices(shuffleArray([...options, answer]));
    }
  }, [options, answer]);

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      // 0에서 i 사이의 랜덤 인덱스 생성
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // 현재 요소와 랜덤 요소를 교환
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setChecked(choices[0])}
      >
        <Text style={styles.text}>{choices[0]}</Text>
        <RadioButton
          value={choices[0]}
          status={checked === choices[0] ? "checked" : "unchecked"}
          color={"#008CFF"}
          onPress={() => setChecked(choices[0])}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setChecked(choices[1])}
      >
        <Text style={styles.text}>{choices[1]}</Text>
        <RadioButton
          value={choices[1]}
          status={checked === choices[1] ? "checked" : "unchecked"}
          color={"#008CFF"}
          onPress={() => setChecked(choices[1])}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setChecked(choices[2])}
      >
        <Text style={styles.text}>{choices[2]}</Text>
        <RadioButton
          value={choices[2]}
          status={checked === choices[2] ? "checked" : "unchecked"}
          color={"#008CFF"}
          onPress={() => setChecked(choices[2])}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setChecked(choices[3])}
      >
        <Text style={styles.text}>{choices[3]}</Text>
        <RadioButton
          value={choices[3]}
          status={checked === choices[3] ? "checked" : "unchecked"}
          color={"#008CFF"}
          onPress={() => setChecked(choices[3])}
        />
      </TouchableOpacity>
      <View>
        <TouchableOpacity style={styles.btn} onPress={handleClick}>
          <Text style={styles.btnText}>확인</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    width: "100%",
    borderWidth: 1,
    borderColor: "#B8B8B8",
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flex: 1,
    padding: 5,
  },
  text: {
    fontSize: 20,
    flex: 1,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008CFF",
    borderRadius: 10,
    width: "100%",
    height: 60,
    marginTop: 10,
    marginBottom: 20,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default Selection;
