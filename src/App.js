import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Header from "./components/Header";
import UserRoute from "./components/UserRoute";

function App() {
  return (
    <Router>
      <div className="px-8 mx-auto max-w-7xl">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/movie/:movieId"
            element={
              <UserRoute>
                <Detail />
              </UserRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
