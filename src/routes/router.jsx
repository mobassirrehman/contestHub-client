import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/Shared/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import Login from "../pages/Auth/Login/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import AllContests from "../pages/Contests/AllContests";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import MyParticipated from "../pages/Dashboard/User/MyParticipated";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import MyWinning from "../pages/Dashboard/User/MyWinning";
import CreatorRoute from "./CreatorRoute";
import AddContest from "../pages/Dashboard/Creator/AddContest";
import MyCreatedContests from "../pages/Dashboard/Creator/MyCreatedContests";
import ContestSubmissions from "../pages/Dashboard/Creator/ContestSubmissions";
import EditContest from "../pages/Dashboard/Creator/EditContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageContests from "../pages/Dashboard/Admin/ManageContest";
import Leaderboard from "../pages/LeaderBoard/LeaderBoard";
import FAQ from "../pages/FAQ/FAQ";
import BecomeCreator from "../pages/BecomeCreator/BecomeCreator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-contests",
        Component: AllContests,
      },
      {
        path: "contest/:id",
        element: <ContestDetails></ContestDetails>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "leaderboard",
        Component: Leaderboard,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      {
        path: 'become-creator',
        Component: BecomeCreator
    }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: MyParticipated,
      },
      {
        path: "my-participated",
        Component: MyParticipated,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "my-winning",
        Component: MyWinning,
      },
      {
        path: "add-contest",
        element: (
          <CreatorRoute>
            <AddContest></AddContest>
          </CreatorRoute>
        ),
      },
      {
        path: "my-created-contests",
        element: (
          <CreatorRoute>
            <MyCreatedContests></MyCreatedContests>
          </CreatorRoute>
        ),
      },
      {
        path: "contest-submissions/:id",
        element: (
          <CreatorRoute>
            <ContestSubmissions></ContestSubmissions>
          </CreatorRoute>
        ),
      },
      {
        path: "edit-contest/:id",
        element: (
          <CreatorRoute>
            <EditContest></EditContest>
          </CreatorRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <AdminRoute>
            <ManageContests></ManageContests>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
