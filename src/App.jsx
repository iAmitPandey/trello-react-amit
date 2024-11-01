import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import SingleBoardPage from "./pages/SingleBoardPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "/boards/:id", element: <SingleBoardPage /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <div className="main-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
