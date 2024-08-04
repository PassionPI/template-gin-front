import { loginAuthPending } from "@/services/login/token";
import { Nav } from "@/utils/history";
import { TreeToRoute } from "@/utils/staticRoute";
import { suspense } from "@/utils/suspense";
import { Outlet, createBrowserRouter, redirect } from "react-router-dom";

export const ROUTE = TreeToRoute({
  login: null,
  sign: null,
  home: null,
});

const Login = suspense(() => import("@/pages/Login"));
const Sign = suspense(() => import("@/pages/Sign"));
const Home = suspense(() => import("@/pages/Home"));
const NotFound = suspense(() => import("@/pages/NotFound"));

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Outlet />
      </>
    ),

    children: [
      {
        path: "/",
        loader: async () => {
          return await loginAuthPending.then(
            () => null,
            () => redirect(ROUTE.login.__),
          );
        },
        children: [
          {
            index: true,
            loader: async () => {
              return redirect(ROUTE.home.__);
            },
          },
          {
            path: ROUTE.home.__,
            children: [
              {
                index: true,
                element: <Home />,
              },
            ],
          },
        ],
      },
      {
        path: "/",
        loader: async () => {
          return await loginAuthPending.then(
            () => redirect(ROUTE.home.__),
            () => null,
          );
        },
        children: [
          {
            path: ROUTE.login.__,
            element: <Login />,
          },
          {
            path: ROUTE.sign.__,
            element: <Sign />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
