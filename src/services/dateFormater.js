const DateFormatter = (date) => {
  
  const givenDate = new Date(date);

  const georgianMonths = [
    "იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", 
    "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"
  ];

  const day = givenDate.getDate();
  const month = givenDate.getMonth();
  const year = givenDate.getFullYear();

  const formattedDate = `${day} ${georgianMonths[month]}, ${year}`;

  return formattedDate
};

export default DateFormatter;
