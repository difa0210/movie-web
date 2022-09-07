import React, { useEffect, useState } from "react";
import { API } from "../config/api";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const api_key = "cd09bca89e5f3ce1d4b31659a6648f78";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState();

  const getPopularMovies = async () => {
    try {
      const response = await API.get(`/movie/popular?api_key=${api_key}`);
      console.log(response.data.results);
      setPopularMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div className="">
      <p className="mb-12 text-4xl font-bold">Popular Movies</p>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {popularMovies &&
          popularMovies.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
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
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
