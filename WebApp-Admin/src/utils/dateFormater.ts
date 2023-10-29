export const formatDate = (date: any) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
};

export const formatDate2 = (isoDate: any) => {
  const date = new Date(isoDate);

  // Lấy thông tin về giờ, phút, giây, ngày, tháng và năm
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  // Tạo định dạng theo yêu cầu "HH:mm:ss dd-mm-yyyy"
  const formattedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

  return formattedDate;
};
