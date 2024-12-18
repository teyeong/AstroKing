import * as SplashScreen from "expo-splash-screen";

import { useCallback, useEffect, useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Quiz from "@/components/quiz/Quiz";
import CorrectModal from "@/components/quiz/CorrectModal";
import WrongModal from "@/components/quiz/WrongModal";
import NameModal from "@/components/quiz/NameModal";
import MenuBtn from "@/components/button/MenuBtn";

import {
  getData,
  getExtraData,
  translateData,
} from "@/components/functions/getData";
import { isSameDate, isSameMonth } from "@/components/functions/isSameDate";

SplashScreen.preventAutoHideAsync();

const Index = () => {
  const [nameModal, setNameModal] = useState(false);
  const [correctModal, setCorrectModal] = useState(false);
  const [wrongModal, setWrongModal] = useState(false);

  const [quiz, setQuiz] = useState(""); // 퀴즈 답
  const [image, setImage] = useState(""); // 퀴즈 이미지
  const [content, setContent] = useState(""); // 퀴즈 explanation
  const [date, setDate] = useState(""); // 퀴즈 날짜
  const [isDone, setIsDone] = useState(false); // 퀴즈 풀기 여부
  const [options, setOptions] = useState<string[]>([]); // 옵션(정답 외 3가지)
  const [dateList, setDateList] = useState<string[]>([]); // 정답 맞힌 날짜 리스트

  // 로컬스토리지 데이터 가져오기
  const getLocalData = async () => {
    const nameData = (await AsyncStorage.getItem("name")) ?? "";
    const quizData = (await AsyncStorage.getItem("quiz")) ?? "";
    const optionsData = (await AsyncStorage.getItem("options")) ?? "";
    const dateListData = (await AsyncStorage.getItem("dateList")) ?? "";
    const isDoneData = await AsyncStorage.getItem("isDone");

    // 파싱
    const parsedQuiz = quizData ? JSON.parse(quizData) : {};
    const parsedOptions = optionsData ? JSON.parse(optionsData) : [];
    const parsedDateList = dateListData ? JSON.parse(dateListData) : [];

    if (!nameData) {
      setNameModal(true);
    }

    if (!parsedQuiz) {
      // 퀴즈 저장 X
      callQuizAPI();
    } else if (isSameDate(parsedQuiz.date) === false) {
      // 저장된 날짜와 업데이트된 날짜가 다를 때
      setIsDone(false);
      callQuizAPI();
      callOptionsAPI();
      await AsyncStorage.setItem("isDone", "false");
    } else {
      // 퀴즈 저장 O && 저장 날짜 === 업데이트 날짜
      setQuiz(parsedQuiz.quiz);
      setImage(parsedQuiz.image);
      setContent(parsedQuiz.content);
      setDate(parsedQuiz.date);
      setIsDone(isDoneData === "true" ? true : false);
    }

    if (!parsedOptions) {
      // 옵션 없을 때
      callOptionsAPI();
    } else {
      // 옵션 있을 때
      setOptions(parsedOptions);
    }

    if (parsedDateList.length > 0) {
      if (isSameMonth(parsedDateList[parsedDateList.length - 1]) === true) {
        // 같은 달일 때
        setDateList(parsedDateList);
      } else {
        // 다른 달일 때
        await AsyncStorage.removeItem("dateList");
      }
    }

    if (!isDoneData) {
      // isDone 없을 때
      await AsyncStorage.setItem("isDone", "false");
    }
  };

  // 오늘의 퀴즈 데이터 가져오기
  const callQuizAPI = async () => {
    const res = await getData();
    if (res) {
      setQuiz(res.title);
      setImage(res.url);
      setContent(res.explanation);
      setDate(res.date);

      let data = {
        date: res.date,
        quiz: res.title,
        image: res.url,
        content: res.explanation,
      };

      const translation = await translateData(res.explanation);
      if (translation !== null) {
        // web이 아닌 경우
        setContent(translation);
        data = {
          ...data,
          content: translation,
        };
      }
      await AsyncStorage.setItem("quiz", JSON.stringify(data));
    }
  };

  // 선택지 3개 불러오기
  const callOptionsAPI = async () => {
    const res = await getExtraData();
    if (res.length > 0) {
      const data = [res[0].title, res[1].title, res[2].title];
      await AsyncStorage.setItem("options", JSON.stringify(data));
      setOptions(data);
    }
  };

  // 로컬스토리지 전체 삭제
  const clear = async () => {
    await AsyncStorage.clear();
  };

  useEffect(() => {
    // clear();
    getLocalData();
  }, []);

  // 폰트 불러오기
  const [fontLoaded] = useFonts({
    pretendard: require("../assets/fonts/Pretendard-Regular.otf"),
  });

  // 폰트 로드되면 스플래시 스크린 숨기기
  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  // 폰트 전역화
  const customTextProps = {
    style: {
      fontFamily: "pretendard",
    },
  };

  setCustomText(customTextProps);

  // 폰트 로딩 중일 때 스플래시 스크린
  if (!fontLoaded) {
    return (
      <ImageBackground
        source={require("../assets/images/splash.png")}
        style={{ height: "100%", width: "100%" }}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={{ backgroundColor: "#000000", flex: 1 }}>
      <ScrollView onLayout={onLayoutRootView}>
        {nameModal ? (
          <ImageBackground
            source={require("../assets/images/bg.jpg")}
            style={{ width: "100%", flex: 1 }}
            resizeMode="cover"
          >
            <NameModal setModal={setNameModal} />
          </ImageBackground>
        ) : (
          <ImageBackground
            source={require("../assets/images/bg.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          >
            <Quiz
              quiz={quiz}
              image={image}
              content={content}
              setCorrectModal={setCorrectModal}
              setWrongModal={setWrongModal}
              isDone={isDone}
              setIsDone={setIsDone}
              options={options}
              date={date}
              dateList={dateList}
            />
          </ImageBackground>
        )}
        {correctModal && <CorrectModal setModal={setCorrectModal} />}
        {wrongModal && <WrongModal setModal={setWrongModal} />}
      </ScrollView>
      {!nameModal && <MenuBtn />}
    </View>
  );
};

export default Index;
