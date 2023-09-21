import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useToast from "../../Hooks/useToast";
import useSingleUser from "../../Hooks/useSingleUser";
import axios from "axios";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [successAlert, errorAlert] = useToast();
  const [userData] = useSingleUser();
  //  logout user
  const handleLogout = () => {
    logOut().then(() => {
      successAlert("logout successfull");
    });
  };

  // Define an event handler to update the lavel
  const handleStatusChange = async (newLevel) => {
    // Send a PUT or PATCH request to your API to update the status
    try {
      const result = await axios.patch(
        `https://gameit-server.vercel.app/games/level?email=${userData.email}`,
        {
          difficultyLevel: newLevel,
        }
      );

      successAlert(`${result.data.message}`);
    } catch (error) {
      errorAlert("Failed to update level");
    }
  };

  return (
    <div className="navbar bg-slate-300 sticky top-0 z-0">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          ></ul>
        </div>
        <a href="/" className="btn btn-ghost normal-case text-xl">
          GAME-IT
        </a>
        <h4 className="font-bold mx-5"> MY SCORE: {userData?.score}</h4>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[18px]">
          <h1 className="text-xl font-semibold  uppercase">
            Green Light Red Light Game
          </h1>
          {!user && (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <select
          className={`font-bold  select select-primary mx-6 max-w-xs `}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option disabled selected>
            {userData.difficultyLevel}
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {user && (
          <div className="flex justify-center items-center">
            <button onClick={() => handleLogout()} className="btn btn-info">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
