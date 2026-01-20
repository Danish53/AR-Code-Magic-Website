import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    // Listen for storage or custom token change event
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("tokenChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenChanged", handleStorageChange);
    };
  }, []);

  return token;
};

export default useToken;
