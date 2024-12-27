import React, { useState } from "react";
import useDates from "../hooks/useDates";
import Room from "../components/Room";
import { Navigate } from "react-router-dom";
import useRooms from "../hooks/useRooms";
import { Button, Card, Input, Select } from "antd";

const Rooms = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState();

  const { fromDate, toDate } = useDates();
  const { filteredRooms, filterRooms } = useRooms();

  const handleFilter = () => {
    filterRooms(search, type);
  };

  const renderRooms = () => {
    if (filteredRooms.length <= 0) {
      return (
        <Card>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            No Rooms To Show
          </p>
        </Card>
      );
    }
    return filteredRooms.map((room) => (
      <Room key={room._id} room={room}></Room>
    ));
  };

  return (
    <>
      {fromDate && toDate ? (
        <div className="container mt-4">
          <div className="row mb-4 justify-content-center ">
            <div className="col-md-8">
              <div
                className="row p-3 justify-content-between"
                style={{
                  boxShadow:
                    " rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                }}
              >
                <div className="col-md-5">
                  <Input
                    placeholder="Enter Room Name"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <Select
                    placeholder="Select Category"
                    value={type}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setType(value);
                    }}
                    options={[
                      { value: "all", label: "All" },
                      { value: "standard", label: "Standard" },
                      { value: "dulex", label: "Dulex" },
                      { value: "family suite", label: "Family Suite" },
                    ]}
                  />
                </div>
                <div className="col-md-2">
                  <Button
                    color="primary"
                    variant="solid"
                    onClick={handleFilter}
                    className="w-100"
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 mx-auto">{renderRooms()}</div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Rooms;
