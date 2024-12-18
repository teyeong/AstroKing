import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Item from "./Item";

const Title = () => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [itemCnt, setItemCnt] = useState(0);

  const itemList = [
    {
      title: "우주 새내기",
      count: 1,
      image: "title1",
    },
    {
      title: "우주 학사",
      count: 3,
      image: "title2",
    },
    {
      title: "우주 석사",
      count: 5,
      image: "title3",
    },
    {
      title: "우주 박사",
      count: 10,
      image: "title4",
    },
    {
      title: "우주 수호자",
      count: 20,
      image: "title5",
    },
    {
      title: "우주 마스터",
      count: 25,
      image: "title6",
    },
  ];

  useEffect(() => {
    const callLocalData = async () => {
      const dateListData = (await AsyncStorage.getItem("dateList")) ?? "";
      const dateListCnt = (dateListData ? JSON.parse(dateListData) : []).length;

      setItemCnt(dateListCnt);
      setUsername((await AsyncStorage.getItem("name")) ?? "");
    };
    callLocalData();
  }, []);

  useEffect(() => {
    if (itemCnt >= 25) {
      setTitle("우주 마스터");
    } else if (itemCnt >= 20) {
      setTitle("우주 수호자");
    } else if (itemCnt >= 10) {
      setTitle("우주 박사");
    } else if (itemCnt >= 5) {
      setTitle("우주 석사");
    } else if (itemCnt >= 3) {
      setTitle("우주 학사");
    } else if (itemCnt >= 1) {
      setTitle("우주 새내기");
    }
  }, [itemCnt]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>칭호</Text>
      {title ? (
        <Text style={styles.contentText}>
          {username}님은 현재 {title}예요!
        </Text>
      ) : (
        <Text style={styles.contentText}>
          {username}님은 현재 획득한 칭호가 없어요
        </Text>
      )}
      <View>
        {itemList.map((item) => {
          return <Item item={item} cnt={itemCnt} key={item.title} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 500,
    textAlign: "center",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
});

export default Title;
