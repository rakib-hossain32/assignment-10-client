import React, { useState, useEffect, useRef } from "react";
import { Star, Clock, Play, ChevronLeft, ChevronRight } from "lucide-react";

import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { movies } = useAuth();

  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   axiosSecure.get("/movies").then((data) => {
  //     setMovies(data.data);
  //   });
  // }, [axiosSecure]);
  // console.log(Boolean(movies))

  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();

  const visibleSlides = Math.min(5, movies.length);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % visibleSlides);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Auto-slide
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // Touch events for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold)
      setCarouselIndex((prev) => (prev + 1) % visibleSlides);
    else if (diff < -threshold)
      setCarouselIndex((prev) => (prev - 1 + visibleSlides) % visibleSlides);
  };
  if (!movies || movies.length === 0) {
    return (
      <div className="h-[400px] sm:h-[450px] md:h-[550px] flex items-center justify-center text-gray-400 bg-black/5">
        Loading movies...
      </div>
    );
  }

  return (
    <div
      className="relative h-[400px] sm:h-[450px] md:h-[550px] overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {movies.slice(0, visibleSlides).map((movie, idx) => (
        <div
          key={movie._id}
          className={`absolute inset-0 transition-opacity duration-1000 
            ${
              idx === carouselIndex
                ? "opacity-100 pointer-events-auto z-20"
                : "opacity-0 pointer-events-none z-10"
            }`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.3) 80%), url(${movie.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-center h-full px-4 mx-auto max-w-7xl">
            <div className="max-w-2xl p-4 space-y-3 sm:p-6 md:p-8 sm:space-y-4 md:space-y-6 animate-fade-in">
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl md:text-5xl">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center space-x-3 text-xs text-white sm:space-x-4 sm:text-sm md:text-base">
                <span className="flex items-center font-bold">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 sm:w-5 sm:h-5" />
                  {movie.rating}
                </span>
                <span>{movie.year}</span>
                <span>{movie.genre}</span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                  {movie.runtime} min
                </span>
              </div>
              <p className="text-xs text-gray-200 sm:text-sm md:text-base line-clamp-3">
                {movie.description}
              </p>
              <button
                onClick={() => navigate(`/movie-details/${movie._id}`)}
                className="flex items-center px-4 py-2 space-x-2 text-xs font-medium text-white transition transform bg-blue-600 shadow-lg cursor-pointer sm:px-6 md:px-8 sm:py-3 md:py-3 rounded-xl hover:bg-blue-900 hover:scale-105 sm:text-sm md:text-base"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Controls */}
      <button
        onClick={() =>
          setCarouselIndex((carouselIndex - 1 + visibleSlides) % visibleSlides)
        }
        className="absolute z-30 p-2 text-white transition -translate-y-1/2 rounded-full cursor-pointer sm:p-3 left-2 sm:left-4 top-1/2 bg-black/50 hover:bg-black/70 focus:outline-none"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => setCarouselIndex((carouselIndex + 1) % visibleSlides)}
        className="absolute z-30 p-2 text-white transition -translate-y-1/2 rounded-full cursor-pointer sm:p-3 right-2 sm:right-4 top-1/2 bg-black/50 hover:bg-black/70 focus:outline-none"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-3 sm:bottom-4 left-1/2">
        {[...Array(visibleSlides)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCarouselIndex(idx)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              idx === carouselIndex
                ? "bg-white w-6 sm:w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
