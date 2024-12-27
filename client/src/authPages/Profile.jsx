import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Error from "../components/Error";
import Loader from "../components/Loader";
import axios from "axios";

const Profile = () => {
  const items = [
    {
      key: "1",
      label: "Profile",
      children: <ProfileData />,
    },
    {
      key: "2",
      label: "My Bookings",
      children: <Bookings />,
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-left">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </div>
  );
};

const ProfileData = () => {
  const { userData } = useAuth();
  console.log(userData);
  return (
    <div>
      {userData && (
        <>
          <p>
            <b>User ID:</b> {userData._id}
          </p>
          <p>
            <b>Name:</b> {userData.name}
          </p>
          <p>
            <b>Emial:</b> {userData.email}
          </p>
          <p>
            <b>Is Admin:</b> {userData.isAdmin ? "yes" : "No"}
          </p>
        </>
      )}
    </div>
  );
};

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState(null);

  const { userData } = useAuth();

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await axios.post("/api/bookings/getbookingsbyuserid", {
        userId: userData._id,
      }).data;
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const renderBookings = () => {};

  const renderContent = () => {
    if (loading)
      return <Loader color="#000" size={100} text="Loading Your Bookings..." />;
    if (error) return <Error error={error} callback={fetchBookings} />;
    return renderBookings();
  };

  return <div>{renderContent()}</div>;
};

export default Profile;
