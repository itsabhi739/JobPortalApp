import { BeatLoader } from "react-spinners";

const Loader = ({ className = "" }) => {
  return (
    <div className={`w-full flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <BeatLoader color="#6055FF" size={10} speedMultiplier={0.6} />
      <BeatLoader color="#F4BC19" size={10} speedMultiplier={0.6} />
    </div>
  );
};

export default Loader;
