import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import dayjs from "dayjs";

export const DatesContext = createContext();

export const DatesProvider = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [duration, setDuration] = useState(null);

  const setDates = (startDate, endDate) => {
    const date1 = dayjs(startDate);
    const date2 = dayjs(endDate);
    setFromDate(startDate);
    setToDate(endDate);
    setDuration(date2.diff(date1, "day"));
  };
  console.log(fromDate, toDate);

  return (
    <DatesContext.Provider value={{ fromDate, toDate, duration, setDates }}>
      <Outlet />
    </DatesContext.Provider>
  );
};
