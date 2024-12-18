import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface itemProps {
  item: {
    title: string;
    count: number;
    image: string;
  };
  cnt: number;
}

const Item = ({ item, cnt }: itemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const images: { [key: string]: any } = {
    title1: require("../../assets/images/title1.png"),
    title2: require("../../assets/images/title2.png"),
    title3: require("../../assets/images/title3.png"),
    title4: require("../../assets/images/title4.png"),
    title5: require("../../assets/images/title5.png"),
    title6: require("../../assets/images/title6.png"),
  };

  useEffect(() => {
    if (cnt >= item.count) {
      setIsOpen(true);
    }
  }, [cnt]);

  return (
    <View style={styles.wrapper}>
      {isOpen ? (
        <View style={[styles.imageContainer, { backgroundColor: "#F0F0F0" }]}>
          <Image source={images[item.image]} style={styles.image} />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/lock.png")}
            style={styles.lock}
          />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.cntText}>퀴즈 {item.count}개를 맞혔어요!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E1",
  },
  image: {
    width: 150,
    height: 150,
  },
  lock: {
    width: 70,
    height: 70,
  },
  textContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 5,
    gap: 10,
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 500,
  },
  cntText: {
    fontSize: 16,
  },
});

export default Item;
