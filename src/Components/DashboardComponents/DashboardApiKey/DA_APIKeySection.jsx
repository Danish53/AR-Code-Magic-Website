import React from "react";
import { AiOutlineTool } from "react-icons/ai";
import { Link } from "react-router-dom";
import applestore from "../../../../src/assets/dashboardIMG/apple.png";
function DA_APIKeySection() {
  return (
    <div className="bg-white shadow-sm p-4 rounded">
      {/* Header */}
      <div className="d-flex align-items-center mb-3">
        <AiOutlineTool size={24} className="me-2" />
        <h5 className="fw-bold mb-0">API Key</h5>
      </div>

      {/* Description */}
      <p>
        The AR Data API key is a unique identifier that allows you to access the AR Code Magic creation feature from the AR Data API and from the iOS apps AR Code Magic Object Capture, AR Text, AR Frame, and AR Portal.
      </p>

      {/* Features List */}
      <ul className="list-unstyled">
        <li>
          AR Data AR Code Magic API v1.0 <Link to="https://rapidapi.com/ar-code-ar-code-default/api/ar-code-augmented-reality-codes-generator" target="_blank" className="text-primary">🔗</Link>
        </li>
        <li>
          AR Frame on the iOS/iPadOS App Store <img src={applestore} alt="App Store" className="ms-2" style={{ width: '100px' }} />
        </li>
        <li>
          AR Text on the iOS/iPadOS App Store <img src={applestore} alt="App Store" className="ms-2" style={{ width: '100px' }} />
        </li>
        <li>
          AR Portal on the iOS/iPadOS App Store <img src={applestore} alt="App Store" className="ms-2" style={{ width: '100px' }} />
        </li>
      </ul>

      {/* AR Code Magic Object Capture Section */}
      <h6 className="fw-bold mt-4">AR Code Magic Object Capture</h6>
      <p>
        AR Code Magic Object Capture on the iOS/iPadOS/MacOS App Store (MacBook M-series &gt;15.0, iPhone Pro &gt;12 or iPad Pro &gt;2021)
      </p>
      <p>To set up an AR Code Magic on your dashboard using the AR Code Magic Object Capture app, follow these steps:</p>
      <ul>
        <li>After creating the AR Code Magic, select it and click on: "Save on AR Code Magic."</li>
        <li>On the next screen, enter your API Key, which you can find below.</li>
        <li>Save your AR Code Magic. The API Key will be stored in the app for future 3D scans.</li>
      </ul>
      <p>
        Any new AR Code Magics you create will automatically be saved to your AR Code Magic dashboard.
      </p>

      {/* API Key Display */}
      <div className="mt-3">
        <h6 className="fw-bold">Your API Key:</h6>
        <div className="bg-light p-2 rounded border">
          <code>pNBJE1YrPpPk</code>
        </div>
      </div>
    </div>
  );
}

export default DA_APIKeySection;
