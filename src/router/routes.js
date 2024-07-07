import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";

//we can create routes using array of objects
const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
    loader: async ({ request, params }) => {
      // return fetch(`/fake/api/teams/${params.teamId}.json`, {
      //   signal: request.signal,
      // });
      console.log(request);
      console.log(params);
      return "this from loader function";
    },
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
