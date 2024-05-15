import { createRoute } from "@tanstack/react-router";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "../pages/App";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Profile/Profile";

const queryClient = new QueryClient();

export const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const ProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: Login,
});

const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/register",
  component: Register,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  ProfileRoute,
  LoginRoute,
  RegisterRoute,
]);

export default routeTree;
