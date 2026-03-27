import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import App from "./App.jsx"
import AccountDetails from "./components/AccountDetails.jsx"
import HomePage from "./components/HomePage.jsx"
import Login from "./components/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import SignUp from "./components/SignUp.jsx"
import store from "./store/store.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "account-details",
        element: (
          <ProtectedRoute>
            <AccountDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
