import React, { useState, useEffect } from "react";
import { fetchProfile, updateProfile, logout } from "../../../../api/authApi";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "../../../../store/auth-slice";
import ProfileView from "./viewProfile";
import ProfileEdit from "./profileEdit";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile on mount
    const loadProfile = async () => {
      if (!user) {
        try {
          setLoading(true);
          const profile = await fetchProfile();
          dispatch(setUser(profile));
        } catch (error) {
          toast.error("Failed to fetch profile!");
        }
      } else {
        setLoading(false);
      }
    };

    loadProfile();
  }, [dispatch, user]);

  const handleSave = async (updatedData) => {
    try {
      setLoading(true);
      const response = await updateProfile(user.id, updatedData);
      dispatch(setUser(response));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white border border-t rounded-lg shadow-lg">
      <h2 className="mt-4 text-2xl font-bold text-center text-gray-700">
        Profile
      </h2>
      {loading ? ( // Show skeletons while loading
        <div className="flex flex-col items-center">
          <Skeleton circle width={128} height={128} className="mb-4" />

          <Skeleton width={150} height={24} className="mb-2" />

          <Skeleton width={200} height={16} className="mb-4" />

          <Skeleton width="80%" height={16} className="mb-2" />
          <Skeleton width="60%" height={16} />

          <div className="flex justify-center mt-8 mb-6 space-x-4">
            <Skeleton width={120} height={40} className="rounded-lg" />
            <Skeleton width={120} height={40} className="rounded-lg" />
          </div>
        </div>
      ) : isEditing ? (
        <ProfileEdit
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView
          user={user}
          onEdit={() => setIsEditing(true)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default UserProfile;
