import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router";

const RecentlyAdded = () => {
  const { isDarkMode, movies } = useAuth();
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  useEffect(() => {
    const recentAdd = movies.sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    setRecentlyAdded(recentAdd);
  }, [movies]);

//   console.log(recentlyAdded);

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h2
          className={`text-3xl font-bold  ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recently Added
        </h2>
        <Link
          className={`hover:underline hover:text-blue-400 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
          to={"/all-movies"}
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {recentlyAdded.slice(0, 6).map((movie) => (
          <MovieCard key={movie._id} movie={movie} isEdit={true} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
