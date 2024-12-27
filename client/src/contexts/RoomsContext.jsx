import axios from "axios";
import React, { createContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const RoomsContext = createContext();

export const RoomsProvider = () => {
  const [allRooms, setAllRooms] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchRooms = async (fromDate, toDate) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/rooms/getfilteredrooms", {
        fromDate,
        toDate,
      });
      console.log(res);
      if (res.status === 200) {
        setAllRooms(res.data.data.rooms);
        setFilteredRooms(res.data.data.rooms);
        const currentLocation = location.pathname;
        const newURL =
          currentLocation === "/"
            ? `${currentLocation}rooms`
            : `${currentLocation}/rooms`;
        console.log(newURL);
        navigate(newURL);
      }
    } catch (error) {
      setError("Error Fetching Rooms Please Try Again!");
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterRooms = (search, type) => {
    const tempRooms = allRooms.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    );

    if (type === "all") setFilteredRooms(tempRooms);
    else {
      const tempsRooms1 = tempRooms.filter(
        (room) => room.type.toLowerCase() === type
      );

      setFilteredRooms(tempsRooms1);
    }
  };

  return (
    <RoomsContext.Provider
      value={{
        loading,
        error,
        allRooms,
        filteredRooms,
        fetchRooms,
        filterRooms,
      }}
    >
      <Outlet />
    </RoomsContext.Provider>
  );
};
