import HashLoader from "react-spinners/HashLoader";

function Loader({ color, size, text }) {
  return (
    <div className="d-flex align-items-center justify-content-center p-4">
      <HashLoader
        color={color}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <span className="ms-2">{text}</span>
    </div>
  );
}

export default Loader;
