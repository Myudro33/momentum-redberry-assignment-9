import axios from "../config/axios-config/index"

const getDepartments = async()=>{
    try {
        const response = await axios.get('/departments', {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
          },
        });
        return response.data
      } catch (error) {
        alert("Error fetching data:", error);
      }
}


export default getDepartments