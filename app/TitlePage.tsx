import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

import Title from "@/components/title/Title";
import MenuBtn from "@/components/button/MenuBtn";

const TitlePage = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/images/bg.jpg")}
          style={styles.bg}
          resizeMode="cover"
        >
          <Title />
        </ImageBackground>
      </ScrollView>
      <MenuBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#000000",
    flex: 1,
  },
  bg: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
});

export default TitlePage;
