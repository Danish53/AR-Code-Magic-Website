import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchProfile } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyPayment = async () => {
      const session_id = searchParams.get("session_id");

      if (!session_id) {
        toast.error("Invalid session ID!");
        return navigate("/");
      }

      try {
        const { data } = await axios.post(
          import.meta.env.VITE_DOMAIN + "/api/v1/user/stripe-payment-verify",
          { session_id }
        );

        if (data.success) {
          toast.success("Payment verified successfully!");
          setVerified(true);
          dispatch(fetchProfile());
        } else {
          toast.error(data.message || "Payment verification failed!");
        }
      } catch (error) {
        toast.error("Error verifying payment!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <h3>Verifying your payment...</h3>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="text-center my-5 d-flex justify-content-center align-items-center flex-column" style={{height: "100vh"}}>

        <h1>Payment Successful!</h1>
        <p>Your account has been upgraded successfully.</p>
        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/user")}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="text-center my-5">
      <h2>❌ Payment Verification Failed</h2>
      <p>Please contact support or try again.</p>
      <button
        className="btn btn-danger mt-3"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default SuccessPage;
