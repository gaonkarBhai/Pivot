import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
const Spinner = () => {
  const [count, setCount] = useState(5);
  const location = useLocation()
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count===0 && navigate('/login',{state:location.pathname})
    return ()=> clearInterval(interval)
  }, [count,navigate,location]);
  return (
    <>
      <div
        className="text-center text-primary d-flex justify-content-center align-items-center flex-column"
        style={{ height: "70vh" }}
      >
      <h2 className="text-center">Redirecting in {count} sec</h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
