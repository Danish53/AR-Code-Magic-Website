import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackagesByType } from "../../../redux/packagesSlice";
import useToken from "../../../hooks/useToken";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51QjazMLXnweaevxiq4yKVjSGQIRtrEPQIcjmELqvRclAel5rMdptSkwxsAaT2YxdURY0A9VdYr2Tad095HOaawFi00NVabbxFE");

// ✅ PriceCard Component
const PriceCard = ({ plan }) => {
  const [expanded, setExpanded] = useState(false);
  const token = useToken();
  const { user } = useSelector((state) => state.auth);
  const currentPlan = user?.user?.plan;

  // ✅ Compare both ID and plan_frequency (monthly/yearly)
  const isCurrentPlan =
    currentPlan &&
    currentPlan.id === plan.id &&
    currentPlan.plan_frequency === plan.plan_frequency;

  const [loading, setLoading] = useState();

  // stripe session create api
  const handleCheckout = async () => {
    setLoading(true);
    try {

      // API call to create checkout session
      const { data } = await axios.post(import.meta.env.VITE_DOMAIN + "/api/v1/user/stripe-payment", {
        user_id: user?.user?.id,
        package_id: plan?.id
      });

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Stripe URL not found");
      }
    } catch (error) {
      toast.error("Payment session creation failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-6 col-lg-4">
      <div className={`card price-table text-center mb-4 ${isCurrentPlan ? "border-success shadow-lg" : ""}`}>
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-primary-color fw-bold">{plan?.package_name}</h3>
          <h4 className="card-price text-secondary mt-3 fw-bold fs-5">{plan?.package_title}</h4>
          <h4 className="card-price text-secondary my-3 fw-bold">
            {plan.discount_price ? (
              <>
                <del className="text-muted me-2">US${plan?.package_price}</del>
                <span>US${plan.discount_price}</span> / {plan?.plan_frequency === 1 ? "month" : "year"}
              </>
            ) : (
              <span>US${plan?.package_price}</span>
            )}
          </h4>

          <ul className="list-unstyled mb-3">
            <li>{plan?.ar_codes} AR Codes</li>
            <li>{plan?.scans} Scans per month</li>
            {plan?.package_name === "Trial" && (
              <>
                <li>AR Text Demo</li>
                <li>Personal use</li>
              </>
            )}
            {plan?.package_name === "PRO" && <li>10 Team members</li>}
            {plan?.package_name !== "Trial" && (
              <>
                <li>Custom Links</li>
                <li>{plan?.pages} Custom Pages</li>
                <li>{plan?.tracking} Retargeting Tracking</li>
                <li>Advanced AR Code design customization</li>
                <li>Export Data</li>
                <li>Password Restriction</li>
                <li>Api Key</li>
                <li>Premium Support</li>
                <li>Commercial License</li>
                <li>Reseller License</li>
              </>
            )}
          </ul>

          {/* ✅ Button Section */}
          {isCurrentPlan ? (
            <button className="btn btn-success btn-lg rounded-pill" disabled>
              Current Plan ({plan.plan_frequency === 1 ? "Monthly" : "Yearly"})
            </button>
          ) : token ? (
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn btn-custom btn-lg btn-success rounded-pill"
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          ) : (
            <Link
              to="/user/register"
              className="btn btn-custom btn-lg btn-success rounded-pill"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [activePlan, setActivePlan] = useState("monthly");
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(fetchPackagesByType(1)); // Monthly
    dispatch(fetchPackagesByType(2)); // Yearly
  }, [dispatch]);

  const currentPlans =
    activePlan === "monthly"
      ? plans.monthly || []
      : plans.yearly || [];

  return (
    <div className="container my-5">
      <div className="text-center">
        <h1>Choose your AR Code Magic plan</h1>
        <p className="text-center featureH" style={{ fontSize: "19px" }}>
          Our four iOS apps{" "}
          <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
            AR Code Magic Object Capture
          </Link>
          ,{" "}
          <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
            AR Text
          </Link>
          ,{" "}
          <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
            AR Portal
          </Link>
          , and{" "}
          <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
            AR Frame
          </Link>{" "}
          offer dedicated in-app plans.
        </p>

        <div className="toggle-container my-4">
          <div className="btn-group">
            <button
              className={`btn ${activePlan === "monthly" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActivePlan("monthly")}
            >
              Monthly
            </button>
            <button
              className={`btn ${activePlan === "yearly" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActivePlan("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {loading ? (
          <p className="text-center">Loading plans...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : currentPlans.length > 0 ? (
          currentPlans.map((plan, index) => <PriceCard key={index} plan={plan} />)
        ) : (
          <p className="text-center text-muted">No plans available</p>
        )}
      </div>
    </div>
  );
};

export default Pricing;
