import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import RoomBooking from "./authPages/RoomBooking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import protectedLoader from "./loaders/protectedLoader";
import unProtectedLoader from "./loaders/unProtectedLoader";
import Protectedpage from "./authPages/Protectedpage";
import UnProtectedpage from "./pages/UnProtectedpage";
import AuthApp from "./authPages/AuthApp";
import { DatesProvider } from "./contexts/DatesContext";
import Rooms from "./pages/Rooms";
import DatesForm from "./components/DatesForm";
import { RoomsProvider } from "./contexts/RoomsContext";
import PaymentSucessfull from "./authPages/PaymentSucessfull";
import PaymentCancelled from "./authPages/PaymentCancelled";
import Profile from "./authPages/Profile";

const router = createBrowserRouter([
  {
    path: "/", // Root path for the entire app
    element: <AuthProvider />, // Wrap everything with AuthProvider
    children: [
      {
        element: <DatesProvider />,
        children: [
          {
            element: <RoomsProvider />,
            children: [
              {
                element: <UnProtectedpage />, // Unprotected section
                loader: unProtectedLoader,
                children: [
                  {
                    element: <App />, // Default app layout for unprotected routes
                    children: [
                      {
                        index: true, // Default view under App
                        element: <DatesForm />,
                      },
                      {
                        path: "rooms",
                        element: <Rooms />,
                      },
                      {
                        path: "register",
                        element: <Register />,
                      },
                      {
                        path: "login",
                        element: <Login />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "app", // Path for the protected section
                element: <Protectedpage />,
                loader: protectedLoader,
                children: [
                  {
                    element: <AuthApp />,
                    children: [
                      {
                        index: true, // Default view under App
                        element: <DatesForm />,
                      },
                      {
                        path: "rooms",
                        element: <Rooms />,
                      },
                      {
                        path: "room-booking/:roomId",
                        element: <RoomBooking />,
                      },
                      {
                        path: "payment-success",
                        element: <PaymentSucessfull />,
                      },
                      {
                        path: "payment-cancelled",
                        element: <PaymentCancelled />,
                      },
                      {
                        path: "profile",
                        element: <Profile />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
