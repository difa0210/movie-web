import React, { Fragment, useState } from "react";
import { API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/user";

const api_key = "cd09bca89e5f3ce1d4b31659a6648f78";

const Header = () => {
  const { user, movie } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
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
      const responseToken = await API.get(
        `/authentication/token/new?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
      );
      const body = JSON.stringify({
        username: form.username,
        password: form.password,
        request_token: responseToken.data.request_token,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const responseLogin = await API.post(
        `/authentication/token/validate_with_login?api_key=${api_key}`,
        body,
        config
      );
      const response = await API.post(
        `/authentication/session/new?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`,
        { request_token: responseLogin.data.request_token },
        config
      );
      localStorage.setItem("session_id", response.data.session_id);
      setIsOpen(false);
      toast.success("Login success");
      window.location.reload();
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(
          "Username or password is wrong, please login with your TMDB API account"
        );
      }
    }
  };

  const handleQuery = (e) => {
    setSearchQuery(e.target.value);
    const filtered = movie.items.filter((movie) =>
      movie.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResult(filtered);
    if (e.target.value === "") {
      setSearchResult([]);
    }
  };

  const handleEmpty = () => {
    setSearchQuery("");
    setSearchResult([]);
  };

  if (!movie.items) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-20 h-20 border-b-2 border-gray-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative py-4 mb-8">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <button
            onClick={handleEmpty}
            className="flex gap-2 mr-2 text-xl font-medium md:mr-auto"
          >
            Movie <span className="hidden md:flex">Rate</span>
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
          {user.data ? (
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full"
              to="/"
              onClick={() => {
                dispatch(logout());
                toast.success("Logout Success");
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div
        className={`absolute right-24 p-2 overflow-y-auto ${
          (searchResult?.length > 0 || searchQuery !== "") &&
          "bg-white shadow-xl"
        } md:w-[24rem] max-h-[20rem] top-20 rounded-xl`}
      >
        {searchResult?.length > 0
          ? searchResult.map((movie) => (
              <div
                className="flex items-center gap-2 p-2 mb-3 cursor-pointer rounded-xl hover:bg-gray-200"
                key={movie.id}
                onClick={
                  user.data
                    ? () => {
                        navigate(`/movie/${movie.id}`);
                        handleEmpty();
                      }
                    : () => {
                        toast.error("Please login first");
                        handleEmpty();
                      }
                }
              >
                <img
                  className="w-[3rem] h-[3rem] rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
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
                <Dialog.Panel className="flex flex-col items-center w-full max-w-md py-12 overflow-hidden text-left transition-all transform bg-white border min-h-xl h-2xl rounded-3xl">
                  <div className="w-full px-2 overflow-y-scroll max-h-md"></div>
                  <div className="w-full px-2 mb-4 font-medium text-center">
                    <div className="mb-2 text-gray-700">Login</div>
                  </div>
                  <div>
                    <form className="flex flex-col gap-4">
                      <input
                        className="px-4 py-2 placeholder-current bg-gray-100 rounded-full outline-none cursor-pointer"
                        type="text"
                        placeholder="username"
                        value={form.username}
                        name="username"
                        onChange={handleChange}
                      />
                      <input
                        className="px-4 py-2 placeholder-current bg-gray-100 rounded-full outline-none cursor-pointer"
                        type="password"
                        placeholder="password"
                        value={form.password}
                        name="password"
                        onChange={handleChange}
                      />
                      <button
                        className="px-4 py-2 mt-4 text-white bg-black rounded-full outline-none cursor-pointer"
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
