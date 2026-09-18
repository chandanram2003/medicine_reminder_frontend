import axios from "axios";

const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("token");

    return response.data;

  } catch (error) {
    console.error(error);

    throw error;
  }
};

export default logoutUser;