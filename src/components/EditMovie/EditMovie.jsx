import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Plus, Edit } from "lucide-react";
import Swal from "sweetalert2";

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

const EditMovie = ({ isEdit }) => {
  const { isDarkMode, movies, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    description: "",
    poster: "",
    language: "",
    country: "",
    createAt: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);

  // console.log(id);

  useEffect(() => {
    if (isEdit && id) {
      const movie = movies.find((m) => m._id === id);
      if (movie) {
        setFormData({
          title: movie.title || "",
          genre: movie.genre || "",
          year: movie.year || "",
          director: movie.director || "",
          cast: movie.cast || "",
          rating: movie.rating || "",
          duration: movie.duration || "",
          description: movie.plotSummary || movie.description || "",
          poster: movie.poster || "",
          language: movie.language || "",
          country: movie.country || "",
        });
      }
    }
  }, [isEdit, id, movies]);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosSecure.post("/movies", { ...formData, addedBy: user.email }).then((data) => { 
        if (data.data.insertedId) {
          // console.log(data.data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Movie Updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/all-movies");
        }
         
       })
      // console.log(formData);
     
    }  finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosSecure.patch(`/movies/update/${id}`, formData).then((data) => {
        // console.log(data);
        if (data.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Movie Updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/movie-details/${id}`);
        }
      });
      // console.log()
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(formData);

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h1
        className={`text-3xl font-bold mb-8 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {isEdit ? `Edit Movie: ${formData.title}` : "Add New Movie"}
      </h1>

      <form
        onSubmit={isEdit ? handleUpdateMovie : handleAddMovie}
        className={`p-8 rounded-xl space-y-6 ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white shadow-xl border text-gray-700 border-gray-300"
        }`}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput
            label="Movie Title"
            name="title"
            type="text"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormSelect
            label="Genre"
            name="genre"
            required
            options={GENRES}
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            label="Release Year"
            name="year"
            type="number"
            min="1800"
            max={new Date().getFullYear() + 5}
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            label="Director"
            name="director"
            type="text"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            label="Rating (0-10)"
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            label="Duration (min)"
            name="duration"
            type="number"
            min="1"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            label="Language"
            name="language"
            type="text"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            label="Country"
            name="country"
            type="text"
            required
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        <FormInput
          label="Cast (Comma-separated list)"
          name="cast"
          type="text"
          required
          placeholder="e.g., Tom Hanks, Leonardo DiCaprio"
          formData={formData}
          setFormData={setFormData}
        />
        <FormInput
          label="Poster URL"
          name="poster"
          type="url"
          required
          formData={formData}
          setFormData={setFormData}
        />

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Plot Summary *
          </label>
          <textarea
            required
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className={`w-full px-4 py-2 rounded-xl border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          ></textarea>
        </div>

        <div className="flex pt-4 space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center flex-1 px-6 py-3 space-x-2 font-medium text-white transition bg-blue-600 shadow-md cursor-pointer rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
            ) : isEdit ? (
              <Edit className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            <span>
              {isLoading
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                ? "Update Movie"
                : "Add Movie"}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(isEdit ? `/movie-details/${id}` : "/all-movies")
            }
            className={`px-6 py-3 rounded-xl font-medium transition cursor-pointer ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
