import axios from "../config/axios-config/index";

const axiosService = async ({ method, endpoint, body = null }) => {
  try {
    const config = {
      method, 
      url: endpoint,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      },
      data: body,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default axiosService;
