import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useToast from "../../Hooks/useToast";
const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [successAlert, errorAlert] = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
      .then((result) => {
        navigate(from, { replace: true });
        setLoading(false);
        successAlert("User login successfull");
      })
      .catch((error) => {
        setLoading(false);
        errorAlert(error.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
          LOGIN GAME IT
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg p-2 flex justify-center gap-3 hover:bg-blue-600 transition-colors duration-300"
          >
            {loading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
            Login
          </button>
        </form>
        <div className="flex  justify-between">
          <div>
            <Link className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            <Link to="/register" className="text-blue-500 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
