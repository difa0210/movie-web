import React, { Fragment, useEffect, useState } from "react";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";

const Header = () => {
  const [popularMovies, setPopularMovies] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    requestToken: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        request_token: form.requestToken,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post(
        `/authentication/session/new?api_key=${process.env.MOVIEDB_API_KEY}`,
        body,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleRequestToken = async () => {
  //     try {
  //       const response = await API.get(
  //         `/authentication/token/new?api_key=${api_key}`
  //       );
  //       console.log(response.data);
  //       setForm({
  //         ...form,
  //         requestToken: response.data.request_token,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleQuery = (e) => {
    setSearchQuery(e.target.value);
    const filtered = popularMovies.filter((movie) =>
      movie.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResult(filtered);
    if (e.target.value === "") {
      setSearchResult([]);
    }
  };

  const getPopularMovies = async () => {
    try {
      const response = await API.get(
        `/movie/popular?api_key=cd09bca89e5f3ce1d4b31659a6648f78`
      );
      setPopularMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  if (!popularMovies) {
    return (
      <button type="button" class="bg-gray-500 ..." disabled>
        <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        Loading
      </button>
    );
  }

  return (
    <div className="relative py-4 mb-8">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <button
            onClick={() => {
              setSearchQuery("");
              setSearchResult([]);
            }}
            className="mr-auto text-xl font-medium"
          >
            Movie Rate
          </button>
        </Link>
        <div className="flex gap-6">
          <form className="relative flex items-center md:w-[24rem]">
            <input
              className="flex items-center w-full h-full px-4 py-2 placeholder-current bg-gray-100 rounded-full outline-none cursor-pointer"
              type="text"
              placeholder="Search Movie"
              value={searchQuery}
              onChange={handleQuery}
            />
            <div className="absolute flex items-center h-10 p-2 right-1">
              <IoSearch className="" />
            </div>
          </form>
          <button onClick={() => setIsOpen(true)}>Login</button>
        </div>
      </div>
      <div
        className={`absolute right-0 p-2 overflow-y-auto ${
          (searchResult?.length > 0 || searchQuery !== "") &&
          "bg-white shadow-xl"
        } w-[24rem] max-h-[20rem] top-20 rounded-xl`}
      >
        {searchResult?.length > 0
          ? searchResult.map((movie) => (
              <Link
                className="flex items-center gap-2 p-2 mb-3 cursor-pointer rounded-xl hover:bg-gray-200"
                key={movie.id}
                to={`/movie/${movie.id}`}
                onClick={() => {
                  setSearchQuery("");
                  setSearchResult([]);
                }}
              >
                <img
                  className="w-[3rem] h-[3rem] rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </Link>
            ))
          : searchQuery !== "" && (
              <p className="p-2 text-center">No Result Found</p>
            )}
      </div>
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
                    <div className="mb-2 text-gray-500">Login</div>
                  </div>
                  <div>
                    <form className="flex flex-col gap-4">
                      <input
                        className="px-4 py-2 placeholder-current bg-gray-100 rounded-full outline-none cursor-pointer"
                        type="text"
                        placeholder="access Token"
                        value={form.requestToken}
                        name="requestToken"
                        onChange={handleChange}
                      />
                      <button
                        className="px-4 py-2 text-white bg-black rounded-full outline-none cursor-pointer"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Header;
