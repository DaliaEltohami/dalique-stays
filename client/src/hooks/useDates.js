import { useContext } from "react";
import { DatesContext } from "../contexts/DatesContext";

const useDates = () => useContext(DatesContext);

export default useDates;
