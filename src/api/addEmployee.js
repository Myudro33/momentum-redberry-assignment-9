import axios from "../config/axios-config/index";

const addEmployee = async (data) => {
  const form = new FormData();
  form.append("name", data.firstName);
  form.append("surname", data.lastName);
  form.append("avatar", data.avatar);
  form.append("department_id", data.department_id);
  try {
    const response = await axios.post("/employees", form, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    alert("Error fetching data:", error);
  }
};

export default addEmployee;
