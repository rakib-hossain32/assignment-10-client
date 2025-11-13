import {
  ChevronLeft,
  Clock,
  Edit,
  Film,
  Globe,
  Heart,
  Star,
  Trash2,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import DetailItem from "./DetailItem";
import { Atom } from "react-loading-indicators";
import Swal from "sweetalert2";

// Movie Details Page
const MovieDetails = () => {
  //   if (!movie) return <div>Movie not found</div>;
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id)
  const { isDarkMode, user,  } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [movie, setMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/movies/${id}`).then((data) => {
      // console.log(data.data);
      setMovie(data.data);
    });
  }, [axiosSecure, id]);

  const handleMovieDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/movies/${id}`).then((data) => {
          // console.log();
          if (data.data.deletedCount) {
            // const remaining =
            navigate("/all-movies");
          }
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your movie has been deleted.",
          icon: "success",
        });
        // console.log('first')
      }
    });
    // console.log('first')
  };

  const handleAddWatchlist = () => {
    // console.log('first', id)
    const movieId = { title: movie?.title, id: movie?._id, email: user?.email };
    axiosSecure.post("/watchlist-create", movieId).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          title: "Add to Watchlist",
          text: "The movie has been added to your watchlist.",
          icon: "success",
        });
        setInWatchlist(true);
      }
    });
  };


  // all watchlist get
    useEffect(() => {
      axiosSecure.get("/watchlist").then((data) => {
        console.log(data.data);
        setWatchlist(data.data);
      });
    }, [axiosSecure]);

  useEffect(() => {
    console.log(watchlist)
    const a = watchlist.find((w) => w?.id === movie?._id);
    // console.log(a);
    if (a) {
      console.log('check',Boolean(a))
      setInWatchlist(true);
    }
  }, [watchlist, movie]);

  // console.log(watchlist);

  //   const isOwner = currentUser?.email === movie.addedBy;
  //   const inWatchlist = watchlist.includes(movie.id);
  // console.log(movie)

  console.log(inWatchlist)

  return movie ? (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <button
        onClick={() => navigate("/all-movies")}
        className={`flex items-center mb-6 text-blue-500 hover:text-blue-700 transition ${
          isDarkMode ? "text-blue-400 hover:text-blue-300" : ""
        }`}
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Movies
      </button>
      <div
        className={`rounded-xl overflow-hidden shadow-2xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie?.poster}
              alt={movie?.title}
              className="w-full h-full object-cover max-h-[600px] md:max-h-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x600/4f46e5/ffffff?text=Poster+Not+Found";
              }}
            />
          </div>
          <div className="p-6 space-y-6 md:w-2/3 md:p-10">
            <div className="space-y-2">
              <h1
                className={`text-4xl md:text-5xl font-extrabold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {movie?.title}
              </h1>
              <span
                className={`text-xl font-medium ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {movie?.genre} ({movie?.year})
              </span>
            </div>

            <div className="flex flex-wrap gap-4 py-3 mb-4 text-base font-medium border-y">
              <span
                className={`flex items-center ${
                  isDarkMode ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                <Star className="w-6 h-6 mr-2 fill-yellow-400" />
                <span className="text-2xl font-bold">{movie?.rating}</span>
                /10
              </span>
              <span
                className={`flex items-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <Clock className="w-5 h-5 mr-2" />
                {movie?.runtime} min
              </span>
              <span
                className={`flex items-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <Globe className="w-5 h-5 mr-2" />
                {movie?.language} / {movie?.country}
              </span>
            </div>

            <div>
              <h3
                className={`text-lg font-bold mb-2 ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Plot Summary
              </h3>
              <p
                className={`leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {movie?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Director" value={movie?.director} />
              <DetailItem label="Main Cast" value={movie?.cast} />
              <DetailItem label="Added By" value={movie?.addedBy} />
            </div>

            <div className="flex pt-4 space-x-4">
              <button
                disabled={inWatchlist}
                onClick={() => handleAddWatchlist()}
                className={`flex-1 flex justify-center items-center space-x-2 px-6 py-3 rounded-xl shadow-md font-medium transition  ${
                  inWatchlist
                    ? " text-white bg-red-700 cursor-not-allowed "
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"
                } ${
                  isDarkMode && !inWatchlist
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : ""
                }`}
              >
                <Heart className={`w-5 h-5 `} />
                <span>
                  {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </span>
              </button>

              {user?.email === movie?.addedBy && (
                <>
                  <button
                    onClick={() => navigate(`/edit-movie/${movie._id}`)}
                    className="flex items-center px-6 py-3 space-x-2 text-white transition bg-blue-600 shadow-md cursor-pointer rounded-xl hover:bg-blue-700"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={handleMovieDelete}
                    className="flex items-center px-6 py-3 space-x-2 text-white transition bg-red-600 shadow-md cursor-pointer rounded-xl hover:bg-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <Atom color="#32cd32" size="medium" text="" textColor="" />
    </div>
  );
};

export default MovieDetails;
