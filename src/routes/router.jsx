import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import MyCollection from "../pages/MyCollection";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import MovieDetails from "../components/MovieDetalis/MovieDetails";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../components/EditMovie/EditMovie";
import Watchlist from "../pages/Watchlist";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-movies",
        element: <AllMovies />,
      },
      {
        path: "/movie-details/:id",
        Component: MovieDetails,
      },
      {
        path: "/my-collection",
        element: <MyCollection />,
      },
      {
        path: "/edit-movie/:id",
        element: <EditMovie isEdit={true} />,
      },
      {
        path: "/add-movie",
        element: <EditMovie isEdit={false} />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
        loader: () => fetch("http://localhost:3000/watchlist"),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
