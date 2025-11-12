import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router";

const TopRatedMovies = () => {
  const { movies, isDarkMode } = useAuth();
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  // console.log(movies)
    
    // const a = movies.sort((a, b) => a.rating - b.rating)
    // console.log(a)

    // console.log(movies)

  useEffect(() => {
      const topRated = [...movies];
      topRated.sort((a, b) => b.rating - a.rating);
    //   console.log(topRated)
    setTopRatedMovies(topRated);
  }, [movies]);
    
//     console.log(topRatedMovies);

  return (
    <div className="px-4 mx-auto my-15 max-w-7xl">
      {/* <h2
        className={`text-3xl font-bold mb-8 text-center ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      ></h2> */}
      <div className="flex items-center justify-between mb-8">
        <h2
          className={`text-3xl font-bold  ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Top Rated Movies
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
        {topRatedMovies.slice(0, 5).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
