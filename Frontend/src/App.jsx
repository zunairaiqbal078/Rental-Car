import { Routes, Route } from "react-router-dom";
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
import LiveChat from "./pages/userDashboard/LiveChat";
import UserDashboard from "./pages/userDashboard/dashboard";
import AllUser from "./Components/admin/AllUser";
import Profile from "./pages/userDashboard/profile";
import Booked from "./pages/userDashboard/booked";
import Messages from "./pages/admin-pages/Messages";

function App() {
  return (
    <>
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

      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route path="explore/viewDetails" element={<ViewDetails />} />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="explore" element={<ExploreCars />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="/user" element={<ClientLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="livechat" element={<LiveChat />} />
          <Route path="booking" element={<Booked />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="booking" element={<Booking />} />
          <Route path="Cars" element={<Cars />} />
          <Route path="users" element={<AllUser />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route path="/noFound" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
