import { useContext } from "react";
import { RoomsContext } from "../contexts/RoomsContext";

const useRooms = () => useContext(RoomsContext);

export default useRooms;
