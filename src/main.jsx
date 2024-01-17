import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import List from "./List.jsx";
import { Provider } from "react-redux";
import { trelloStore } from "./store/store.jsx";
let Main = () => {
  return <Outlet />;
};
let appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/boards/:boardsId",
        element: <List />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={trelloStore}>
    <RouterProvider router={appRouter}></RouterProvider>
  </Provider>
  // </React.StrictMode>
);
