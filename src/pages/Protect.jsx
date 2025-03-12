import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../Services/Apis/AllServices";
import { useLogin2 } from "../Services/Query/AllQuery";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/AuthSlice";

function getTokenExpirationDate(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  if (!expirationDate) {
    return true;
  }
  return expirationDate < new Date();
}

const Protect = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { refetch } = useLogin2();
  useEffect(() => {
    async function checkAuth() {
      try {
        const userData = await verifyToken(token);
        console.log("valid", userData.valid);
        // {valid: true, userId: '6d2e2f2f-4171-467f-ad2e-8601dbc81620'}
        if (!userData.valid) {
          dispatch(logoutSuccess());
          refetch();
        }
      } catch (error) {}
    }
    if (token) checkAuth();
  }, [token, dispatch]);

  return <Outlet />;
};

export default Protect;
