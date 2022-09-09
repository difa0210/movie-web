import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Home = () => {
  const { movie, user } = useSelector((state) => state);
  const navigate = useNavigate();

  if (!movie.items) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-20 h-20 border-b-2 border-gray-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="">
      <p className="mb-12 text-4xl font-bold">Popular Movies</p>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {movie.items &&
          movie.items.map((movie, index) => (
            <div
              onClick={() =>
                user.data
                  ? navigate(`/movie/${movie.id}`)
                  : toast.error("Please Login First")
              }
              key={index}
              className="flex flex-col items-center p-4 bg-gray-100 cursor-pointer rounded-xl"
            >
              <p className="mb-6 text-xl font-semibold">{movie.title}</p>
              <img
                className="mt-auto mb-2 rounded-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="img"
              />
              <div className="flex items-center justify-center gap-2 px-2 mr-auto">
                <AiFillStar className="text-2xl text-yellow-500 " />
                <span className="text-xl">{movie.vote_average}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
