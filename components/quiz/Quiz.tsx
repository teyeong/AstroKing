import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Selection from "./Selection";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface quizParams {
  quiz: string;
  image: string;
  content: string;
  date: string;
  setCorrectModal: React.Dispatch<React.SetStateAction<boolean>>;
  setWrongModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDone: boolean;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
  options: string[];
  dateList: string[];
}

const Quiz = ({
  quiz,
  image,
  content,
  date,
  setCorrectModal,
  setWrongModal,
  isDone,
  setIsDone,
  options,
  dateList,
}: quizParams) => {
  const [result, setResult] = useState(" 퀴즈를 풀어보세요!");
  const [username, setUsername] = useState("사용자");

  useEffect(() => {
    const callLocalData = async () => {
      setUsername((await AsyncStorage.getItem("name")) ?? "");
    };
    callLocalData();
  }, [AsyncStorage]);

  useEffect(() => {
    if (isDone) {
      setResult("은 퀴즈를 풀었어요!");
    } else {
      setResult(" 퀴즈를 풀어보세요!");
    }
  }, [isDone]);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={[styles.box, { marginBottom: 50 }]}>
        <Text style={[styles.appName, { marginBottom: 20 }]}>AstroKing</Text>
        <Text style={styles.title}>오늘의 우주 퀴즈</Text>
        <Text style={{ fontSize: 20 }}>
          {username}님{result}
        </Text>
      </View>
      <View style={styles.box}>
        {isDone ? (
          <Text style={styles.quiz}>{quiz}</Text>
        ) : (
          <Text style={styles.quiz}>이 사진은 이름이 무엇일까요?</Text>
        )}
        {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
        <Text style={styles.content}>{content}</Text>
        {!isDone && (
          <Selection
            setCorrectModal={setCorrectModal}
            setWrongModal={setWrongModal}
            setIsDone={setIsDone}
            options={options}
            answer={quiz}
            date={date}
            dateList={dateList}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 60,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10,
  },
  box: {
    gap: 5,
    width: "100%",
    alignItems: "center",
  },
  appName: {
    fontSize: 60,
    fontWeight: 700,
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  quiz: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    minHeight: 200,
  },
});

export default Quiz;
