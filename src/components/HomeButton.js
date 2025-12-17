// import React from "react";
// import HomeIcon from "@mui/icons-material/Home";

// const HomeButton = ({ ho }) => {
//   if (ho !== "1") return null;

//   return (
//     <HomeIcon
//       style={{ cursor: "pointer" }}
//       onClick={() => (window.location.href = "https://beats.altruistindia.com/#/")}
//     />
//   );
// };

// export default HomeButton;
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Api_base_url from './Api_base_url/Api_base_url';
 // Replace with your actual API base URL

const HomeButton = ({ ho }) => {
  const navigate = useNavigate();

  const handleLogoutAndRedirect = async () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("jwttoken");

    if (!token || !userId) {
      console.error("Token or User ID is missing");
      return;
    }

    try {
      const response = await axios.delete(`${Api_base_url}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      });

      if (response.status !== 200) {
        console.error("Logout failed:", response.status);
        throw new Error(`Logout failed with status: ${response.status}`);
      }

      // Clear local storage
      localStorage.removeItem("jwttoken");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("roleId");
      localStorage.removeItem("home");

      console.log("Logout successful, token and userId removed");

      // Redirect to the external site after logout
      window.location.href = "https://beats.altruistindia.com/#/";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  if (ho !== "1") return null;

  return <HomeIcon style={{ cursor: "pointer" }} onClick={handleLogoutAndRedirect} />;
};

export default HomeButton;
