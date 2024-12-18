import { Platform } from "react-native";

const today = new Date();
const yesterdayDate = new Date(today);
yesterdayDate.setDate(today.getDate() - 1);

const yesterday = `${yesterdayDate.getFullYear()}-${String(
  yesterdayDate.getMonth() + 1
).padStart(2, "0")}-${String(yesterdayDate.getDate()).padStart(2, "0")}`;

const apod_url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.EXPO_PUBLIC_APOD_KEY}&date=${yesterday}`;
const apod_extra_url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.EXPO_PUBLIC_APOD_KEY}&count=3`;
const deepl_url = "https://api-free.deepl.com/v2/translate";

export const getData = async () => {
  const res = await fetch(apod_url)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("", err));
  return res;
};

export const getExtraData = async () => {
  const res = await fetch(apod_extra_url)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("", err));
  return res;
};

export const translateData = async (msg: string) => {
  const data = {
    text: [msg],
    target_lang: "ko",
  };

  const deepl_key = process.env.EXPO_PUBLIC_DEEPL_KEY ?? "";

  const isWeb = Platform.OS === "web";

  if (isWeb) {
    return null;
  }

  const res = await fetch(deepl_url, {
    method: "POST",
    headers: {
      Authorization: "DeepL-Auth-Key " + deepl_key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => json.translations[0].text)
    .catch((err) => console.error(err));
  return res;
};
