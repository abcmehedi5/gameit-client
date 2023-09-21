import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const Main = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      {
        user && 
      <Navbar></Navbar>
      }
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
