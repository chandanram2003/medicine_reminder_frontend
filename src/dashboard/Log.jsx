import axios from "axios";

const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/users/logout",
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