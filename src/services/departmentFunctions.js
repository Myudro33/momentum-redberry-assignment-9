const department = [
  {
    id: 1,
    name: "ადმინ. დეპ.",
    color: "#FA4D4D",
  },
  {
    id: 2,
    name: "HR",
    color: "#FF66A8",
  },
  {
    id: 3,
    name: "ფინანსები",
    color: "#8338EC",
  },
  {
    id: 4,
    name: "გაყიდვები",
    color: "#FD9A6A",
  },
  {
    id: 5,
    name: "ლოჯისტიკა",
    color: "#89B6FF",
  },
  {
    id: 6,
    name: "ინფ. ტექ.",
    color: "#FFD86D",
  },
  {
    id: 7,
    name: "მედია",
    color: "#08A508",
  },
];
const getDepartmentInfo = (id) => {
  const index = (item) => item.id === id;
  return department[department.findIndex(index)];
};

export { getDepartmentInfo };
