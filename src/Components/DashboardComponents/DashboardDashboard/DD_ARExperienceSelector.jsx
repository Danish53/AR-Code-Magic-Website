import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./DD_ARExperienceSelector.css";
import DD1_ArTextSection from "./DD1_ArTextSection";
import DD2_ARPhotoSection from "./DD2_ARPhotoSection";
import DD3_ARPortalSection from "./DD3_ARPortalSection";
import DD4_ARFaceSection from "./DD4_ARFaceSection";
import DD5_ARVideoSection from "./DD5_ARVideoSection";
import DD6_ARLogoSection from "./DD6_ARLogoSection";
import DD7_AICodeSection from "./DD7_AICodeSection";
import DD8_ARDataSection from "./DD8_ARDataSection";
import DD9_File3DSection from "./DD9_File3DSection";
import DD_OptionsForm from "./DD_OptionsForm";
import { useSelector } from "react-redux";
// import DD_OptionsForm from "./DD_OptionsForm";

function DD_ARExperienceSelector() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/user/login" replace />;
  }

  const [text, setText] = useState("Your text");
  const [font, setFont] = useState("Arial");
  const [color, setColor] = useState("#3f72c6");
  const [depth, setDepth] = useState(6.0);
  const [gloss, setGloss] = useState(0.2);
  const [scale, setScale] = useState(100.0);
  const [orientation, setOrientation] = useState("Vertical");
  const [activeTab, setActiveTab] = useState("AR Text");

  const tabs = [
    "AR Text",
    "AR Photo",
    "AR Portal",
    "AR Logo",
    "AI Code",
    // "AR Data",
    "3D File",
    "AR Video",
    "AR Face",
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "AR Text":
        return (
          <>
            <DD1_ArTextSection
              text={text}
              setText={setText}
              font={font}
              setFont={setFont}
              color={color}
              setColor={setColor}
              depth={depth}
              setDepth={setDepth}
              gloss={gloss}
              setGloss={setGloss}
              scale={scale}
              setScale={setScale}
              orientation={orientation}
              setOrientation={setOrientation}
            // handleChange={handleChange}
            // formData={formData}
            />
            {/* <DD_OptionsForm /> */}
          </>
        );
      case "AR Photo":
        return <DD2_ARPhotoSection />;

      case "AR Portal":
        return <DD3_ARPortalSection />;

      case "AR Face":
        return <DD4_ARFaceSection />;

      case "AR Video":
        return <DD5_ARVideoSection />;

      case "AR Logo":
        return <DD6_ARLogoSection />;

      case "AI Code":
        return <DD7_AICodeSection />;

      case "AR Data":
        return <DD8_ARDataSection />;

      case "3D File":
        return <DD9_File3DSection />;
      default:
        return <div>Coming Soon</div>;
    }
  };

  return (
    <div className="bg-white py-4 px-4 rounded shadow-sm">
      <h2 className="text-center mb-3 text-black fw-bold">
        Create an AR Code Magic
      </h2>
      <div>
        <div className="header-section">
          <div className="d-flex flex-column">
            <h5 className="fw-bold">(1) Select an AR experience type</h5>
            <p className="text-muted small">(or create a simple QR Code)</p>
          </div>
          <ul className="nav nav-tabs mt-3">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link navlinkCustom ${activeTab === tab ? "active" : ""
                    }`}
                  onClick={() => handleTabClick(tab)}
                  disabled={user?.user?.plan?.package_name === "Trial"}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {renderActiveTab()}
        <div className="text-center mt-3">
          <p className="text-muted">
            You can create your AR Texts and their AR Code Magics via our iOS
            app with{" "}
            <Link to="/user/api-key" className="text-decoration-none">
              your API key
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default DD_ARExperienceSelector;
