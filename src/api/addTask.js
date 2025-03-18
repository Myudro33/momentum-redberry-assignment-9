import axios from "../services/axiosService";
import { useLocalStorage } from "../services/useLocalStorage";
const {getItem} = useLocalStorage()
const addTask = async (data) => {
  data.priority_id = getItem('priority_id')?.id||2
  data.status_id = getItem('status_id')?.id||1
  try {
    const response = await axios({ method: "POST", endpoint: "/tasks", body: data })
    localStorage.clear()
    return response.data;
  } catch (error) {
    alert("Error fetching data:", error);
  }
};

export default addTask;
