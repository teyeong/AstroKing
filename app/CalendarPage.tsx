import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import MenuBtn from "@/components/button/MenuBtn";

const { width } = Dimensions.get("window");

const CalendarPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        style={[styles.bg, { width }]}
        resizeMode="cover"
      >
        <MonthlyCalendar />
      </ImageBackground>
      <MenuBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
});

export default CalendarPage;
