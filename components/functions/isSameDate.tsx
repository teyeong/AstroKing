export const isSameDate = (dateString: string) => {
  // APOD가 업데이트되는 UTC 시간 생성
  const nowUTC = new Date();
  const apodUpdateTimeUTCMinus5 = new Date(
    nowUTC.getTime() - 5 * 60 * 60 * 1000 // UTC-5로 시간 조정 (5시간 빼기)
  );

  // UTC-5 기준 자정 설정
  apodUpdateTimeUTCMinus5.setUTCHours(0, 0, 0, 0);

  const apodUpdateTimeFormatted = `${apodUpdateTimeUTCMinus5.getFullYear()}-${String(
    apodUpdateTimeUTCMinus5.getMonth() + 1
  ).padStart(2, "0")}-${String(apodUpdateTimeUTCMinus5.getDate()).padStart(
    2,
    "0"
  )}`;

  return dateString === apodUpdateTimeFormatted;
};

export const isSameMonth = (dateString: string) => {
  const today = new Date();
  const date = dateString.split("-");
  return date[1] === String(today.getMonth() + 1).padStart(2, "0");
};
