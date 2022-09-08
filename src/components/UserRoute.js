import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserRoute({ children }) {
  const token = localStorage.getItem("token");
  return token
    ? children
    : toast.error("You need to be logged in to access this page") && (
        <Navigate to="/" />
      );
}
