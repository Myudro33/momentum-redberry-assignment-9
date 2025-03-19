const getStatusBackgroundColor = () => {
  const root = document.documentElement;
  const colors = [
    getComputedStyle(root).getPropertyValue("--yellow"),
    getComputedStyle(root).getPropertyValue("--orange"),
    getComputedStyle(root).getPropertyValue("--pink"),
    getComputedStyle(root).getPropertyValue("--blue"),
  ];
  return colors;
};
const getPriorityBackgroundColor = (id) => {
  if (id === 1) {
    return "#08A508";
  } else if (id === 2) {
    return "#FFBE0B";
  } else {
    return "#FA4D4D";
  }
};

export { getStatusBackgroundColor, getPriorityBackgroundColor };
