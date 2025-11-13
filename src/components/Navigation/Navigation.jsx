import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import {
  Film,
  Home,
  Grid,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  Plus,
  UserPlus,
  LogIn,
} from "lucide-react";
import CustomNavLink from "./NavLink";
import MobileNavLink from "./MobileNavLink";
import useAuth from "../../hooks/useAuth";
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

  const navigate = useNavigate();

  //   const location = useLocation();
  //   const currentPath = location.pathname;

  const handleLogout = () => {
    console.log("first");
    signOutUser()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
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
          <NavLink to="/" className="flex items-center space-x-2">
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
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden space-x-4 lg:flex">
            <CustomNavLink icon={Home} label="Home" to="/" />
            <CustomNavLink icon={Grid} label="All Movies" to="/all-movies" />
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
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.title}
                  referrerPolicy="no-referrer"
                  className="object-cover w-10 h-10 border-2 border-blue-500 rounded-full cursor-pointer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/100x100/3b82f6/ffffff?text=U";
                  }}
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 space-x-2 text-white transition bg-red-600 shadow-md cursor-pointer rounded-xl hover:bg-red-700"
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
          <div className="flex items-center space-x-4 lg:hidden">
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

            <img
              src={currentUser?.photoURL}
              alt={currentUser?.title}
              referrerPolicy="no-referrer"
              className="inline object-cover w-10 h-10 border-2 border-blue-500 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/100x100/3b82f6/ffffff?text=U";
              }}
            />

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
              <MobileNavLink icon={Grid} label="All Movies" to="/all-movies" />
              {currentUser && (
                <>
                  <CustomNavLink
                    icon={Film}
                    label="My Collection"
                    to="/my-collection"
                  />
                  <CustomNavLink
                    icon={Heart}
                    label="Watchlist"
                    to="/watchlist"
                  />
                  <CustomNavLink icon={Plus} label="Add Movie" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 space-x-2 text-white bg-red-600 cursor-pointer rounded-xl"
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
