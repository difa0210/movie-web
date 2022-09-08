import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { AiFillStar } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";

const Detail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(10).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (hoverValue) => {
    setHoverValue(hoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await API.get(
          `/movie/${movieId}?api_key=cd09bca89e5f3ce1d4b31659a6648f78`
        );
        console.log(response.data);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
  }, [movieId]);

  const handleRating = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        value: currentValue,
      });

      const config = {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: {
          guest_session_id: "10fc9dadf5419bf3fd945b69f192a84e",
        },
      };

      const response = await API.post(
        `/movie/${movieId}/rating?api_key=${process.env.MOVIEDB_API_KEY}`,
        body,
        config
      );
      console.log(response);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!movie) {
    return (
      <button type="button" class="bg-gray-500 ..." disabled>
        <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        Loading
      </button>
    );
  }

  return (
    <div className="">
      {movie && (
        <div className="flex flex-col items-start p-4 bg-gray-100 rounded-xl">
          <p className="mb-12 text-4xl font-bold">{movie.title}</p>
          <div className="flex flex-col gap-6 md:flex-row">
            <img
              className="mb-4 md:h-[24rem] rounded-xl"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="img"
              object="cover"
            />
            <div className="flex flex-col items-start">
              <p className="mb-4">{movie.overview}</p>
              <div className="flex items-center justify-center gap-2">
                <AiFillStar className="text-3xl text-yellow-500 " />
                <span className="text-2xl">{movie.vote_average}</span>
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-4 py-1 text-white bg-gray-500 rounded-full hover:bg-gray-600"
                >
                  Rate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed bg-opacity-25 top-5" />
          </Transition.Child>
          <div className="fixed inset-x-0 top-0 py-24 px-6 md:(px-0 py-32) bg-black bg-opacity-20 h-screen overflow-y-hidden">
            <div className="flex items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col items-center w-full max-w-md p-4 overflow-hidden text-left transition-all transform bg-white border min-h-xl rounded-3xl">
                  <div className="w-full px-2 overflow-y-scroll max-h-md"></div>
                  <div className="w-full px-2 my-4 font-medium text-center">
                    <div className="mb-2 text-gray-500">Rate this movie</div>
                    <div className="text-xl font-bold">{movie?.title}</div>
                  </div>
                  <div className="flex flex-row mb-4">
                    {stars.map((_, index) => {
                      return (
                        <AiFillStar
                          key={index}
                          size={24}
                          onClick={() => handleClick(index + 1)}
                          onMouseOver={() => handleMouseOver(index + 1)}
                          onMouseLeave={handleMouseLeave}
                          color={
                            (hoverValue || currentValue) > index
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          className="cursor-pointer"
                        />
                      );
                    })}
                  </div>

                  <button
                    onClick={handleRating}
                    className="px-6 py-1 mx-auto font-semibold bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    Rate
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Detail;
