import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import StatCard from "../components/StatCard";
import { Star, Film, Users, Calendar } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Statistics = () => {
  const { movies, isDarkMode } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [usersCollection, setUsersCollection] = useState([])

  useEffect(() => {
    axiosSecure.get("/users").then((data) => {
      console.log(data.data);
      setUsersCollection(data.data)
    });
  }, [axiosSecure]);
  // console.log(movies)

  // const {} = movies || {}

  return (
    <div>
      {/* Statistics */}
      <div className="px-4 pt-8 mx-auto max-w-7xl">
        <div className="text-center">
          <h2
            className={`mb-4 text-3xl font-bold lg:text-4xl ${
              isDarkMode ? "text-white" : " text-black"
            }`}
          >
            Trusted by Movie Lovers Worldwide
          </h2>
          <p
            className={`max-w-2xl mx-auto mb-12 text-lg ${
              isDarkMode ? "text-white" : " text-black"
            }`}
          >
            Join millions of users who have made MovieMaster Pro their go-to
            platform for movie discovery and collection management.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <StatCard
            icon={Film}
            value={movies.length}
            label="Total Movies"
            color="blue"
          />
          <StatCard
            icon={Users}
            value={usersCollection.length}
            label="Active Users"
            color="purple"
          />
          <StatCard
            icon={Star}
            value="4.8/5"
            label="Average Rating"
            color="yellow"
          />
          <StatCard
            icon={Calendar}
            value={new Date().getFullYear()}
            label="Current Year"
            color="green"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
