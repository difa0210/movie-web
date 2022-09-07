import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="px-8 mx-auto max-w-7xl">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
