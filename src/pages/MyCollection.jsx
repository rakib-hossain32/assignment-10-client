import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Film, Plus } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router";

const MyCollection = () => {
  const [myMovies, setMyMovies] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  // console.log(id)

  const { isDarkMode, user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/movies/my-collection?addedBy=${user?.email}`)
      .then((data) => {
        setMyMovies(data.data);
        // console.log(Boolean(![]));
      });
  }, [axiosSecure, user]);

  useEffect(() => {
    if (!id) return;
    setMyMovies((prevMovies) => prevMovies.filter((m) => m._id !== id));
  }, [id]);

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          My Movie Collection ({myMovies.length})
        </h1>
        <button
          onClick={() => navigate("/add-movie")}
          className="flex items-center px-6 py-3 space-x-2 font-medium text-white bg-blue-600 shadow-md cursor-pointer rounded-xl hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Movie</span>
        </button>
      </div>

      {myMovies.length === 0 ? (
        <div
          className={`text-center p-12 rounded-xl border border-dashed ${
            isDarkMode
              ? "border-gray-700 bg-gray-800 text-gray-400"
              : "border-gray-300 bg-white text-gray-600"
          }`}
        >
          <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl font-medium">
            You haven't added any movies yet.
          </p>
          <button
            onClick={() => navigate("/add-movie")}
            className="px-6 py-3 mt-6 font-medium text-white bg-blue-600 shadow-md rounded-xl hover:bg-blue-700"
          >
            Add Your First Movie
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {myMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              setId={setId}
              isEdit={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollection;
