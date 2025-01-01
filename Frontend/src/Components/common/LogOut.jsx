import React from "react";
import { logoutUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
function LogOut() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default LogOut;
