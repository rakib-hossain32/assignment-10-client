import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import MovieCard from "../components/MovieCard";
import { Plus, Film } from "lucide-react";

import { useNavigate } from "react-router";

const AllMovies = () => {
  const { isDarkMode, user: currentUser } = useAuth();

  const [movies, setMovies] = useState([]);
  const [filterGenres, setFilterGenres] = useState([]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

  const GENRES = [
    "Action",
    "Drama",
    "Comedy",
    "Sci-Fi",
    "Horror",
    "Romance",
    "Thriller",
    "Animation",
    "Crime",
  ];

  // console.log(movies)

  // Fetch filtered movies
  const fetchFilteredMovies = async () => {
    setIsLoading(true);
    try {
      const genres = filterGenres.map((g) => g.toLowerCase()).join(",");
      const res = await fetch(
        `http://localhost:3000/movies/filter?genres=${genres}&minRating=${ratingRange[0]}&maxRating=${ratingRange[1]}`
      );
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch when filters change
  useEffect(() => {
    fetchFilteredMovies();
  }, [filterGenres, ratingRange]);

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col items-start justify-between mb-8 space-y-4 md:flex-row md:items-center md:space-y-0">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Explore All Movies ({movies.length})
        </h1>

        {currentUser && (
          <button onClick={()=> navigate('/add-movie')} className="flex items-center px-6 py-3 space-x-2 font-medium text-white bg-blue-600 shadow-md cursor-pointer rounded-xl hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <span>Add New Movie</span>
          </button>
        )}
      </div>

      <div
        className={`p-6 rounded-xl mb-8 space-y-6 ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white shadow-lg"
        }`}
      >
        <div>
          <label
            className={`block text-lg font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Filter by Genre
          </label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() =>
                  setFilterGenres((prev) =>
                    prev.includes(genre)
                      ? prev.filter((g) => g !== genre)
                      : [...prev, genre]
                  )
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filterGenres.includes(genre)
                    ? "bg-blue-600 text-white shadow-md"
                    : isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {genre}
              </button>
            ))}
            {filterGenres.length > 0 && (
              <button
                onClick={() => setFilterGenres([])}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full shadow-md hover:bg-red-700"
              >
                Clear Genres
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            className={`block text-lg font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Rating Range: {ratingRange[0]} – {ratingRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={ratingRange[0]}
            onChange={(e) =>
              setRatingRange([parseFloat(e.target.value), ratingRange[1]])
            }
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={ratingRange[1]}
            onChange={(e) =>
              setRatingRange([ratingRange[0], parseFloat(e.target.value)])
            }
            className="w-full"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          {" "}
          <div className="w-12 h-12 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin"></div>{" "}
        </div>
      ) : movies.length === 0 ? (
        <div
          className={`text-center py-12 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl font-medium">No movies found!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMovies;
