import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import useDates from "../hooks/useDates";
import { useAuth } from "../hooks/useAuth";
import Error from "../components/Error";
import { message } from "antd";
import dayjs from "dayjs";
import { loadStripe } from "@stripe/stripe-js";

const RoomBooking = () => {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [redirecting, setRedirecting] = useState(false);

  const { fromDate, toDate, duration } = useDates();
  const { userData, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { roomId } = useParams();

  const handlePayment = async () => {
    if (isAuthenticated) {
      const stripe = await loadStripe(
        "pk_test_51QWK4206JONF34Z3zZNJF2FOdEGitej60vSRl9jqoNganpzLgOL1dhd0NRZcijKnLUP8G9RZh1G25CnMkbzIqcQb00orYJEVea"
      );

      setRedirecting(true);

      const newBooking = {
        roomId: room._id,
        userId: userData._id,
        fromDate: fromDate,
        toDate: toDate,
        totalPrice,
        duration,
      };

      try {
        const res = await axios.post("/api/bookings/roomBooking", {
          newBooking,
        });
        const response = res.data;
        const result = stripe.redirectToCheckout({
          sessionId: response.session.id,
        });
        if (result.error) {
          console.log("error redirecting to stripe checkout", result.error);
        }
      } catch (error) {
        console.log(error);
        await message.error("Failed to complete your booking", 2);
        // navigate("/");
      } finally {
        setRedirecting(false);
      }
    }
  };

  // const onToken = async (token) => {
  //   console.log(token);
  //   if (!isAuthenticated) {
  //     return navigate("/login");
  //   }
  //   const newBooking = {
  //     roomId: room._id,
  //     roomName: room.name,
  //     userId: userData._id,
  //     fromDate: fromDate,
  //     toDate: toDate,
  //     totalPrice,
  //     duration,
  //     token,
  //   };
  //   try {
  //     const res = await axios.post("/api/bookings/roomBooking", { newBooking });
  //     console.log(res);
  //     if (res.status === 200) {
  //       await message.success("Room Booked Successfully", 2);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     await message.error("Failed to complete your booking", 2);
  //     navigate("/");
  //   }
  // };

  const fetchRoom = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/rooms/getroom", { roomId });

      if (res.status === 200) {
        setRoom(res.data.room);
        setTotalPrice(duration * res.data.room.rentperday);
      } else {
        // Handle unexpected response codes
        setError(res.data.message || "Failed to fetch room details.");
      }
    } catch (error) {
      // Check for specific error types and messages
      if (error.response) {
        // Errors from the server
        if (error.response.status === 404) {
          setError("Room not found! Please check the Room ID.");
        } else if (error.response.status === 400) {
          setError("Invalid Room ID format.");
        } else {
          setError(
            error.response.data.message ||
              `Server returned status ${error.response.status}`
          );
        }
      } else if (error.request) {
        // Network errors or no response from server
        setError("Network error: Failed to connect to the server.");
      } else {
        // Other unexpected errors
        setError(error.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [roomId, duration]);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  const renderRoom = () => {
    return (
      <div className="row g-2 justify-content-between align-content-center bs p-3">
        {redirecting && (
          <Loader color="#000" size={100} text="Redirecting..." />
        )}
        <div className="d-flex flex-column col-md-6 booking-card-height ">
          <h2 className="pb-1 text-start">{room.name}</h2>
          <div className=" overflow-hidden" style={{ flex: 1 }}>
            <img
              src={room.imageurls[0]}
              alt="room-pic"
              className=" h-100 w-100 object-fit-cover rounded"
            />
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-end">
          <div className="div text-end" style={{ flex: 1 }}>
            <h2 className="border-bottom pb-2">Booking Details</h2>
            <p>Name: {userData?.name} </p>
            <p>From Date: {dayjs(fromDate).format("YYYY-MM-DD")}</p>
            <p>To Date:{dayjs(toDate).format("YYYY-MM-DD")}</p>
          </div>
          <div className="div text-end" style={{ flex: 1 }}>
            <h2 className="border-bottom pb-2">Amount</h2>
            <p>Total Nights: {duration}</p>
            <p>Rent Per Night:{` ${room.rentperday} L.E`} </p>
            <p>Total Amount: {` ${totalPrice} L.E`}</p>
          </div>
        </div>

        <button className="btn btn-dark" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    );
  };

  const renderContent = () => {
    if (fromDate && toDate) {
      if (loading)
        return <Loader color="#000" size={100} text="Loading Booking..." />;
      if (error) return <Error error={error} callback={fetchRoom} />;
      return renderRoom();
    } else {
      navigate("/app");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row m-3">
        <div className="col-md-10 mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default RoomBooking;
