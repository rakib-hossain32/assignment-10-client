import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const { isDarkMode, createUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      toast.error(
        "Password must contain at least one uppercase, one lowercase, and be at least 6 characters long.",
        "error"
      );
      return;
    }

    // console.log({ name, email, password, photoURL });
    createUser(email, password)
      .then((result) => {
        updateUser(name, photoURL)
          .then(() => {
            toast.success('successfully create account')
            navigate("/");
            // console.log(result.user);
          })
          .catch((error) => {
            // console.log(error.message);
          });
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };

  return (
    <div className="max-w-md px-4 py-16 mx-auto">
      <div
        className={`p-8 rounded-xl shadow-2xl ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Create Account
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="your name"
              // value={authForm.name}
              // onChange={(e) =>
              //   setAuthForm({ ...authForm, name: e.target.value })
              // }
              className={`w-full px-4 py-2 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
              // value={authForm.email}
              // onChange={(e) =>
              //   setAuthForm({ ...authForm, email: e.target.value })
              // }
              className={`w-full px-4 py-2 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Photo URL <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="photoURL"
              type="url"
              placeholder="photoURL"
              // value={authForm.photoUrl}
              // onChange={(e) =>
              //   setAuthForm({ ...authForm, photoUrl: e.target.value })
              // }
              className={`w-full px-4 py-2 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password123"
              required
              // value={authForm.password}
              // onChange={(e) =>
              //   setAuthForm({ ...authForm, password: e.target.value })
              // }
              className={`w-full px-4 py-2 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700`}
            />
            <p
              className={`text-xs mt-1 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Must contain uppercase, lowercase, and be at least 6 characters.
            </p>
          </div>
          <button
            type="submit"
            //   disabled={isLoading}
            className="w-full px-6 py-3 font-medium text-white transition bg-blue-600 shadow-md cursor-pointer rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {/* {isLoading ? "Registering..." : "Register"} */}
            Register
          </button>
        </form>
        <p
          className={`text-center mt-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to={"/login"}
            //   onClick={() => setCurrentPage("login")}
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
