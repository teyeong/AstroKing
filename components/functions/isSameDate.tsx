export const isSameDate = (dateString: string) => {
  // 오늘
  const today = new Date();

  // 어제 날짜
  const yesterdayDate = new Date(today);
  yesterdayDate.setDate(today.getDate() - 1);

  // "yyyy-MM-DD" 형식으로 포맷팅된 어제 날짜
  const yesterday = `${yesterdayDate.getFullYear()}-${String(
    yesterdayDate.getMonth() + 1
  ).padStart(2, "0")}-${String(yesterdayDate.getDate()).padStart(2, "0")}`;

  return dateString === yesterday;
};

export const isSameMonth = (dateString: string) => {
  const today = new Date();
  const date = dateString.split("-");
  return date[1] === String(today.getMonth() + 1).padStart(2, "0");
};
