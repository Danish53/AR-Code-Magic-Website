import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CallToAction = () => {
  return (
    <section className="call-to-action bg-primary text-white py-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-3">Ready to Create Your AR Experience?</h2>
        <p className="mb-4">
          Get started today and unlock the potential of augmented reality for your projects and business.
        </p>
        <button className="btn btn-light btn-lg">Get Started Now</button>
      </div>
    </section>
  );
};

export default CallToAction;
