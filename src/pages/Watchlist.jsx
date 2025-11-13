import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import MovieCard from "../components/MovieCard";
import { Heart } from "lucide-react";

const Watchlist = () => {
  const a = useLoaderData();
  const { isDarkMode, user, movies } = useAuth();
  const [watchlists, setWatchlists] = useState([]);
    const [watchId, setWatchId] = useState("");
    
    const navigate = useNavigate()

//   console.log(watchId);

  useEffect(() => {
    const commonMovies = movies.filter((movie) =>
      a.some((fav) => fav.id === movie._id)
    );
    console.log(commonMovies);
    setWatchlists(commonMovies);
  }, [movies, a]);
    
    useEffect(() => {
      if (!watchId) return;
      setWatchlists((prev) => prev.filter((m) => m._id !== watchId));
    }, [watchId]);

  // console.log({isDarkMode, user, movies})

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <h1
        className={`text-3xl font-bold mb-8 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        My Watchlist ({watchlists.length})
      </h1>

      {watchlists.length === 0 ? (
        <div
          className={`text-center p-12 rounded-xl border border-dashed ${
            isDarkMode
              ? "border-gray-700 bg-gray-800 text-gray-400"
              : "border-gray-300 bg-white text-gray-600"
          }`}
        >
          <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl font-medium">
            Your watchlist is currently empty. Add some movies you want to
            watch!
          </p>
          <button
            onClick={() => navigate('/all-movies')}
            className="px-6 py-3 mt-6 font-medium text-white bg-blue-600 shadow-md cursor-pointer rounded-xl hover:bg-blue-700"
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {watchlists.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              isWatchList={true}
              setWatchId={setWatchId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
