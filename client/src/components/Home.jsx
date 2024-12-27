import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Room from "./Room";
import Loader from "./Loader";
import Error from "./Error";
import DatesForm from "./DatesForm";
import useDates from "../hooks/useDates";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fromDate, toDate } = useDates();
  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/rooms/getallrooms");
      setRooms(res.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const renderRooms = () => {
    return rooms.map((room) => <Room key={room._id} room={room}></Room>);
  };

  const renderContent = () => {
    if (loading)
      return <Loader size={100} color="#000" text="Loading Rooms..." />;
    if (error) return <Error error={error} callback={fetchRooms} />;
    return renderRooms();
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <DatesForm />
        </div>
      </div>
      {fromDate && toDate ? (
        <div className="row">
          <div className="col-md-8 mx-auto">{renderContent()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
