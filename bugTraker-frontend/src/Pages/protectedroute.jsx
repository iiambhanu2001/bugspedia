import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

function Protectedroute({ islogin, authfrontend }) {
  useEffect(() => {
    if (islogin === "") {
      authfrontend();
    }
  }, [islogin]);

  if (islogin === "") return null;
  if (islogin === null) {
 
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default Protectedroute;
