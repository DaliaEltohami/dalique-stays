import React, { useState } from "react";
import { Button, DatePicker, message, Card } from "antd";
import useDates from "../hooks/useDates";
import moment from "moment";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import useRooms from "../hooks/useRooms";
import Loader from "./Loader";
import Error from "./Error";

const DatesForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { setDates } = useDates();
  const { loading, error, fetchRooms } = useRooms();
  const { RangePicker } = DatePicker;

  // Date restrictions: disable past dates and dates beyond 6 months from today
  const disabledDate = (current) => {
    const today = moment().startOf("day");
    const sixMonthsFromNow = moment().add(6, "months").endOf("day");
    return current && (current < today || current > sixMonthsFromNow);
  };

  const handleDatesChange = (dates) => {
    if (dates) {
      console.log(dates);
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  const handleDatesSearch = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      return message.error("Please select valid dates!");
    }
    setDates(startDate, endDate);
    message.success("Dates successfully set!");
    fetchRooms(startDate, endDate);
  };

  const renderContent = () => {
    if (loading)
      return <Loader size={100} color="#000" text="Loading Rooms..." />;
    if (error) return <Error error={error} callback={fetchRooms} />;
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <Card
            title={<Title level={2}>Select Dates For Your Stay</Title>}
            style={{
              maxWidth: 500,
              margin: "20px auto",
              boxShadow:
                " rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
              paddingTop: "10px",
            }}
          >
            <form
              onSubmit={handleDatesSearch}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <RangePicker
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                onChange={handleDatesChange}
                disabledDate={disabledDate}
                size="large"
                placeholder={["Start Date", "End Date"]}
                prefix={<CalendarOutlined />}
              />
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                block
              >
                Search Dates
              </Button>
            </form>
          </Card>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DatesForm;
