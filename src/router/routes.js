import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import HomeTest from "../Pages/HomeTest";
import Statistics from "../Pages/Statistics";
import Users from "../Pages/Users";
import Advertisements from "../Pages/Advertisements";
import AdDetails from "../Pages/AdDetails";
import Complaints from "../Pages/Complaints";
import ImageManager from "../Pages/ImageManager";
import ProtectedRoute from "../Components/ProtectedRoute";

//we can create routes using array of objects
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute userShouldBe="logedin">
        <Home />
        {/* <HomeTest /> */}
      </ProtectedRoute>
    ),
    loader: async ({ request, params }) => {
      // return fetch(`/fake/api/teams/${params.teamId}.json`, {
      //   signal: request.signal,
      // });
      console.log(request);
      console.log(params);
      return "this from loader function";
    },
    children: [
      {
        //احصائيات
        path: "statistics",
        element: <Statistics />,
        index: true,
      },
      {
        path: "users",
        element: <Users />,
        index: true,
      },
      {
        path: "advertisements",
        element: <Advertisements />,
      },
      {
        path: "ad-details/:adId",
        element: <AdDetails />,
      },
      {
        path: "complaints",
        element: <Complaints />,
      },
      {
        path: "image-manager",
        element: <ImageManager />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/new-ad",
  //   element: (
  //     <ProtectedRoute userShouldBe="logedin">
  //       <NewAd />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/ad-details/:adId",
  //   element: (
  //     // <ProtectedRoute userShouldBe="logedin">
  //     <AdDetails />
  //     // </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/profile",
  //   element: (
  //     <ProtectedRoute userShouldBe="logedin">
  //       <Profile />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       path: "user-info",
  //       element: <UserInfo />,
  //       index: true,
  //     },
  //     {
  //       path: "user-advertisements",
  //       element: <UserAdvertisements />,
  //     },
  //     {
  //       path: "user-ad-details/:adId",
  //       element: <UserAdDetails />,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <div>no match</div>,
  },
]);

// or this using JSX

export default routes;
