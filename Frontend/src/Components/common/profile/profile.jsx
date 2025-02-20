import React, { useState, useEffect } from "react";
import { fetchProfile, updateProfile, logout } from "../../../api/authApi";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../store/auth-slice";
import ProfileView from "./viewProfile";
import ProfileEdit from "./profileEdit";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      if (!user || Object.keys(user).length === 0) {
        try {
          setLoading(true);
          const profile = await fetchProfile();
          console.log("Profile fetched:", profile);

          // Update Redux state
          dispatch(
            setUser({
              user: profile,
              token,
            })
          );
        } catch (error) {
          toast.error("Failed to fetch profile!");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadProfile();
  }, [dispatch, user, token]);

  const handleSave = async (updatedData) => {
    try {
      setLoading(true);
      const updatedProfile = await updateProfile(user?.id, updatedData);
      console.log("Updated Profile:", updatedProfile);

      // Update Redux and session storage with the new user data
      dispatch(
        setUser({
          user: updatedProfile,
          token,
        })
      );

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {loading ? (
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
        <>
          <ProfileView user={user} onEdit={() => setIsEditing(true)} />
        </>
      )}
    </div>
  );
};

export default UserProfile;
