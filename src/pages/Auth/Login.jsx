import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { isDarkMode, signInUser, loginGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log({ email, password });
    signInUser(email, password)
      .then(() => {
        // console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogleLogin = () => {
    // console.log("first");
    loginGoogle()
      .then((result) => {
        navigate("/");
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    // Login Page

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
          Account Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              name="email"
              placeholder="example@gmail.com"
              type="email"
              required
              //   value={authForm.email}
              onChange={() =>
                "setAuthForm({ ...authForm, email: e.target.value })"
              }
              className={`w-full px-4 py-2 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="Password123"
              //   value={"authForm.password"}
              //   onChange={() =>
              //     "setAuthForm({ ...authForm, password: e.target.value })"
              //   }
              className={`w-full px-4 py-2 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700`}
            />
          </div>
          <button
            type="submit"
            // disabled={isLoading}
            className="w-full px-6 py-3 font-medium text-white transition bg-blue-600 shadow-md cursor-pointer rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {/* {isLoading ? "Logging in..." : "Login"} */}
            Login
          </button>
          <div className="text-sm italic font-medium text-center text-gray-500 dark:text-gray-400">
            Hint: user@example.com / Password123
          </div>
          <button
            type="button"
            // onClick={() => {
            //   setCurrentUser({
            //     name: "Google Demo User",
            //     email: "demo@google.com",
            //     photoUrl: "https://placehold.co/100x100/ea4335/ffffff?text=G",
            //   });
            //   showToast("Logged in with Google!");
            //   setCurrentPage("home");
            // }}
            onClick={handleGoogleLogin}
            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border font-medium transition cursor-pointer ${
              isDarkMode
                ? "border-gray-600 text-white hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FcGoogle size={24} />

            <span> Sign in with Google</span>
          </button>
        </form>
        <p
          className={`text-center mt-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to={"/register"}
            // onClick={() => setCurrentPage("register")}
            className="font-medium text-blue-600 hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
