const DateFormatter = (date) => {
  const givenDate = new Date(date);

  const georgianMonths = [
    "იან",
    "თებ",
    "მარ",
    "აპრ",
    "მაი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექ",
    "ოქტ",
    "ნოე",
    "დეკ",
  ];

  const day = givenDate.getDate();
  const month = givenDate.getMonth();
  const year = givenDate.getFullYear();

  const formattedDate = `${day} ${georgianMonths[month]}, ${year}`;

  return formattedDate;
};
const getDateDay = (dateString) => {
  const daysInGeorgian = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

  const date = new Date(dateString);

  const dayOfWeek = daysInGeorgian[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${dayOfWeek} - ${day}/${month}/${year}`;
};

export  {DateFormatter,getDateDay};
