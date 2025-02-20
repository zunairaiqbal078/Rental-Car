import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Layout from "./Layout/Layout";
import Home from "./pages/client-pages/Home";
import About from "./pages/client-pages/AboutUs";
import ContactUs from "./pages/client-pages/ContactUs";
import Reviews from "./pages/client-pages/Reviews";
import ExploreCars from "./pages/client-pages/ExploreCars";
import ViewDetails from "./Components/home/ExploreCars/ViewDetails";
import AuthLayout from "./Layout/authLayout";
import AdminLayout from "./Layout/adminLayout";
import Dashboard from "./pages/admin-pages/Dashboard";
import Booking from "./pages/admin-pages/Booking";
import Cars from "./pages/admin-pages/Cars";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import ClientLayout from "./Layout/clientLayout";
import LiveChat from "./Components/common/chat/liveChat";
import UserDashboard from "./pages/userDashboard/dashboard";
import AllUser from "./Components/admin/AllUser";
import Profile from "./pages/userDashboard/profile";
import Booked from "./pages/userDashboard/booked";
import store from "./store/store.js";
import { Provider } from "react-redux";
import NewCar from "./pages/admin-pages/NewCar.jsx";
import AdminProfile from "./pages/admin-pages/AdminProfile.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Client Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="explore/viewDetails/:id" element={<ViewDetails />} />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="explore" element={<ExploreCars />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        {/* User Dashboard Routes */}
        <Route path="/user" element={<ClientLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="livechat" element={<LiveChat />} />
          <Route path="booking" element={<Booked />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="booking" element={<Booking />} />
          <Route path="cars" element={<Cars />} />
          <Route path="new-car" element={<NewCar />} />
          <Route path="livechat" element={<LiveChat />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="users" element={<AllUser />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
