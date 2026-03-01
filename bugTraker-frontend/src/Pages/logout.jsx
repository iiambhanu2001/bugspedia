import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
function Logout({ logout,setUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    const dologout = async () => {
      try {
     
        await logout();
        setUser("")
           navigate("/login", { replace: "true" });

      } catch (err) {
        console.error("Logout failed", err);
      }
    };
    dologout();
  }, [logout, navigate,setUser]);

  return (
    <div>
      <Navbar />
      <p>Logging you out...</p>
    </div>
  );
}

export default Logout;
