import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useToast from "../../Hooks/useToast";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    score: 0,
    difficultyLevel: "easy",
  });
  const [loading, setLoading] = useState(false);
  const { createUserEmail, updateUserProfile } = useContext(AuthContext);
  const [successAlert, errorAlert] = useToast();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // send data mongodb data base start
    createUserEmail(formData.email, formData.password)
      .then((result) => {
        const user = result.user;
        // send data mongodb data base start

        axios
          .post("https://gameit-server.vercel.app/users/user", formData)
          .then((result) => {
            successAlert("account create successfull");
            navigate("/");
            setLoading(false);
          });
        // send data mongodb data base start
      })
      .catch((error) => {
        successAlert(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg md:w-5/12 w-9/12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          User Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-lg font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="difficultyLevel"
              className="block text-lg font-medium"
            >
              Difficulty Level
            </label>
            <select
              id="difficultyLevel"
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Signup
            {loading && <span className="animate-spin ml-2">&#10240;</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
