import { createBrowserRouter } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, //父路由
    children: [
      { index: true, element: <HomePage /> }, //默认子路由
      { path: "game/:id", element: <GameDetailPage /> }, //game子路由
    ],
  },
]);

export default router;
