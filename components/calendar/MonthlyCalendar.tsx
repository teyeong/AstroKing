import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { Image } from "react-native";
import { isSameMonth } from "../functions/isSameDate";

interface markedDate {
  customImage: boolean;
}

const MonthlyCalendar = () => {
  const [dateList, setDateList] = useState<string[]>([]);

  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const markedDates = dateList.reduce<Record<string, markedDate>>(
    (acc, date) => {
      acc[date] = { customImage: true }; // 이미지 표시 여부 플래그
      return acc;
    },
    {}
  );

  useEffect(() => {
    const getLocalData = async () => {
      const dateListData = await AsyncStorage.getItem("dateList");

      // 파싱
      const parsedDateList = dateListData ? JSON.parse(dateListData) : [];

      if (parsedDateList.length > 0) {
        if (isSameMonth(parsedDateList[parsedDateList.length - 1]) === true) {
          // 같은 달일 때
          setDateList(parsedDateList);
        } else {
          // 다른 달일 때
          await AsyncStorage.removeItem("dateList");
        }
      }
    };
    getLocalData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <Text style={styles.titleText}>우주 달력</Text>
        <Text style={styles.content}>
          이번 달에 {dateList.length}개의 퀴즈를 맞혔어요!
        </Text>
      </View>
      <Calendar
        disableArrowLeft={true}
        disableArrowRight={true}
        onMonthChange={null}
        onDayPress={null}
        dayComponent={({ date }: { date: DateData }) => {
          const dateKey = date.dateString;
          const isMarked = markedDates[dateKey];
          const isToday = dateKey === localDate;

          return (
            <View style={styles.dayContainer}>
              <Text style={[styles.dayText, isToday && styles.todayText]}>
                {date.day}
              </Text>
              {isMarked && (
                <Image
                  source={require("../../assets/images/Earth.png")}
                  style={styles.image}
                />
              )}
            </View>
          );
        }}
      />
      <Text style={styles.notice}>
        퀴즈는 한국 시간 오후 2시에 업데이트 돼요.
      </Text>
      <Text style={styles.notice}>
        2시 전에 참여한 경우{"\n"}어제 날짜에 도장이 찍힐 수 있어요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  box: {
    gap: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 500,
  },
  content: {
    fontSize: 20,
  },
  dayContainer: {
    alignItems: "center",
    width: 40,
    height: 60,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  todayText: {
    color: "#008CFF",
  },
  image: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  notice: {
    textAlign: "center",
    fontSize: 16,
    padding: 5,
  },
});

export default MonthlyCalendar;
