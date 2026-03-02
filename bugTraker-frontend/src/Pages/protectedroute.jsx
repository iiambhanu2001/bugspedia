import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

function Protectedroute({ islogin, authfrontend }) {
  useEffect(() => {
    if (islogin === undefined) {
      authfrontend();
    }
  }, [islogin,authfrontend]);

  if (islogin === undefined) return null;
  if (islogin === null) {
 
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default Protectedroute;
