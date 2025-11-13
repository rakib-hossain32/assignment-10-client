import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import {
  Film,
  Home,
  Clapperboard ,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  Plus,
  UserPlus,
  LogIn,
  Sparkles,
  ChevronDown,
  User,
  Settings,
} from "lucide-react";
import CustomNavLink from "./NavLink";
import MobileNavLink from "./MobileNavLink";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
// import { useAuth } from "../context/AuthProvider";

export default function Navigation() {
  const {
    isDarkMode,
    toggleTheme,
    user: currentUser,
    showMobileMenu,
    setShowMobileMenu,
    signOutUser,
  } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  //   const location = useLocation();
  //   const currentPath = location.pathname;

  const handleLogout = () => {
    // console.log("first");
    signOutUser()
      .then(() => setShowDropdown(false))
      .catch((error) => {
        // console.log(error.message);
      });
  };

  return (
    <nav
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }
      border-b sticky top-0 z-40 transition-colors`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {/* <NavLink to="/" className="flex items-center space-x-2">
            <Film
              className={`w-8 h-8 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <span
              className={`text-2xl font-extrabold leading-5 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Movie <br />
              Master Pro
            </span>
          </NavLink> */}
          <motion.a
            href="/"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {" "}
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-rose-500 to-rose-700">
              {" "}
              <Sparkles className="w-5 h-5 text-white" />{" "}
            </div>{" "}
            <span className="text-xl font-bold leading-4 text-transparent bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text">
              {" "}
              Movies <br /> Master Pro{" "}
            </span>{" "}
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden space-x-4 lg:flex">
            <CustomNavLink icon={Home} label="Home" to="/" />
            <CustomNavLink icon={Clapperboard } label="All Movies" to="/all-movies" />
            {currentUser && (
              <>
                <CustomNavLink
                  icon={Film}
                  label="My Collection"
                  to="/my-collection"
                />
                <CustomNavLink icon={Heart} label="Watchlist" to="/watchlist" />
                <CustomNavLink icon={Plus} label="Add Movie" to="/add-movie" />
              </>
            )}
          </div>

          {/* Actions */}
          <div className="items-center hidden space-x-4 lg:flex">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white ${
                isDarkMode
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Auth */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      referrerPolicy="no-referrer"
                      className="object-cover w-10 h-10 border-2 rounded-full shadow-md border-rose-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/100x100/3b82f6/ffffff?text=U";
                      }}
                    />
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Glass Dropdown */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-xl border backdrop-blur-md overflow-hidden ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-white/70 border-gray-200"
                        }`}
                      >
                        {/* Top Section */}
                        <div
                          className={`p-4 border-b ${
                            isDarkMode
                              ? "border-white/10 text-white"
                              : "border-gray-200 text-gray-800"
                          }`}
                        >
                          <p className="text-sm font-semibold">
                            {currentUser.displayName || "User"}
                          </p>
                          <p className="text-xs truncate opacity-70">
                            {currentUser.email}
                          </p>
                        </div>

                        {/* Menu Links */}
                        <div className="p-2">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            onClick={() => {
                              navigate("/");
                              setShowDropdown(false);
                            }}
                            className={`flex items-center w-full gap-2 px-3 py-2 text-sm transition rounded-lg hover:bg-rose-500/10  ${
                              isDarkMode ? "" : "text-gray-700  "
                            }`}
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            onClick={() => {
                              navigate("/");
                              setShowDropdown(false);
                            }}
                            className={`flex items-center w-full gap-2 px-3 py-2 text-sm transition rounded-lg hover:bg-rose-500/10 ${
                              isDarkMode ? "" : "text-gray-700  "
                            }`}
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={handleLogout}
                            className="flex items-center w-full gap-2 px-3 py-2 mt-2 text-sm font-medium text-white rounded-lg cursor-pointer bg-linear-to-br from-rose-500 to-rose-700 hover:opacity-90"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 space-x-2 text-white transition shadow-md cursor-pointer bg-linear-to-br from-rose-500 to-rose-700 rounded-xl hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center gap-1 px-4 py-2 text-white bg-blue-600 rounded-lg"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </NavLink>
                <NavLink
                  to={"/register"}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-xl transition font-medium gap-1 ${
                      isActive
                        ? isDarkMode
                          ? "bg-gray-700 text-blue-400"
                          : "bg-blue-100 text-blue-600"
                        : isDarkMode
                        ? "text-white hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 mr-2 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white ${
                isDarkMode
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                    referrerPolicy="no-referrer"
                    className="object-cover w-10 h-10 border-2 rounded-full shadow-md border-rose-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/100x100/3b82f6/ffffff?text=U";
                    }}
                  />
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Glass Dropdown */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-xl border backdrop-blur-md overflow-hidden ${
                        isDarkMode
                          ? "bg-white/5 border-white/10"
                          : "bg-white/70 border-gray-200"
                      }`}
                    >
                      {/* Top Section */}
                      <div
                        className={`p-4 border-b ${
                          isDarkMode
                            ? "border-white/10 text-white"
                            : "border-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm font-semibold">
                          {currentUser.displayName || "User"}
                        </p>
                        <p className="text-xs truncate opacity-70">
                          {currentUser.email}
                        </p>
                      </div>

                      {/* Menu Links */}
                      <div className="p-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          onClick={() => {
                            navigate("/");
                            setShowDropdown(false);
                          }}
                          className={`flex items-center w-full gap-2 px-3 py-2 text-sm transition rounded-lg hover:bg-rose-500/10  ${
                            isDarkMode ? "" : "text-gray-700  "
                          }`}
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          onClick={() => {
                            navigate("/");
                            setShowDropdown(false);
                          }}
                          className={`flex items-center w-full gap-2 px-3 py-2 text-sm transition rounded-lg hover:bg-rose-500/10 ${
                            isDarkMode ? "" : "text-gray-700  "
                          }`}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={handleLogout}
                          className="flex items-center w-full gap-2 px-3 py-2 mt-2 text-sm font-medium text-white rounded-lg cursor-pointer bg-linear-to-br from-rose-500 to-rose-700 hover:opacity-90"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={` p-2 cursor-pointer ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            } lg:hidden border-t`}
          >
            <div className="px-4 py-3 space-y-2">
              <MobileNavLink icon={Home} label="Home" to="/" />
              <MobileNavLink icon={Clapperboard } label="All Movies" to="/all-movies" />
              {currentUser && (
                <>
                  <MobileNavLink
                    icon={Film}
                    label="My Collection"
                    to="/my-collection"
                  />
                  <MobileNavLink
                    icon={Heart}
                    label="Watchlist"
                    to="/watchlist"
                  />
                  <MobileNavLink
                    icon={Plus}
                    label="Add Movie"
                    to={"/add-movie"}
                  />
                  <button
                    onClick={() => {
                      handleLogout(), setShowMobileMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 space-x-2 text-white cursor-pointer bg-linear-to-br from-rose-500 to-rose-700 rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
              {!currentUser && (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 font-medium text-left text-white bg-blue-600 rounded-xl"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 font-medium text-left text-blue-600 border border-blue-600 rounded-xl"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
