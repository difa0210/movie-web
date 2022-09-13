import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { API } from "./config/api";
import { login } from "./redux/actions/user";
import { insertMovie } from "./redux/actions/movie";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const session_id = localStorage.getItem("session_id");

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await API.get(
          `/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
        );
        dispatch(insertMovie(response.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    const checkAccount = async () => {
      try {
        const response = await API.get(
          `/account?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&session_id=${session_id}`
        );
        dispatch(login(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    checkAccount();
    getMovie();
  }, [session_id, dispatch]);

  return (
    <Router>
      <div className="px-8 mx-auto max-w-7xl">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movie/:movieId" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
