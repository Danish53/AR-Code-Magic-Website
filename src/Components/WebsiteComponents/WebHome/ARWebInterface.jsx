import React from "react";
import { Link } from "react-router-dom";
// import ar6 from "../../../assets/WebIMG/herosection.jpg";
// import ar7 from "../../../assets/WebIMG/ar-code-f1.webp";
const ARWebInterface = () => {
  const apps = [
    {
      id: 1,
      title: "AR Code Magic Object Capture",
      subtitle: "It is a 3D scanning app by AR Code Magic.",
      description1: "Making AR experiences is made easier with the AR Code Magic Object Capture app",
      description2: " You may take advantage of dynamic AR QR Code production, quick 3D modeling, and simple 3D scanning.",
      imgSrc: "https://ar-code.com/images/AR-Code-Object-Capture-app.webp",
      exampleImg: "https://ar-code.com/images/ar-code-object-capture-example.webp",
      appStoreLink: "https://apps.apple.com/us/app/ar-code-object-capture-3d-scan/id1488198492",
      appDetailsLink: "#",
    },
    {
      id: 2,
      title: "AR Text",
      subtitle: "It is a 3D scanning app by AR Code Magic.",
      description1: "You may use our online interface or even the AR Text mobile application to generate 3D messages and accompanying AR Code Magics. ",
      description2: "Using some typed text and a chosen color and font, the AR Text iOS app allows you to instantly create an augmented reality experience.",
      imgSrc: "https://ar-code.com/images/text3d-app.webp",
      exampleImg: "https://ar-code.com/images/ar-code-text.webp",
      appStoreLink: "https://apps.apple.com/us/app/ar-text-text-to-ar/id1544441682",
      appDetailsLink: "#",
    },
    {
      id: 3,
      title: "AR Frame",
      subtitle: "It is a 3D scanning app by AR Code Magic. ",
      description1: "You can create 3D images and AR Code Magics by using our AR Frame app or internet interface.",
      description2: "Present gorgeous augmented reality frames that may include papers, menus, artwork, pictures, and graphics.",
      imgSrc: "https://ar-code.com/images/ar-frame-app.webp",
      exampleImg: "https://ar-code.com/images/ar-code-photo.webp",
      appStoreLink: "https://apps.apple.com/us/app/AR-Frame/id1562803258",
      appDetailsLink: "#",
    },
    {
      id: 4,
      title: "AR Portal",
      subtitle: "It is a 3D scanning app by AR Code Magic.",
      description1: "Using the AR Portal app or online interface, you may create your own AR Portals and associated AR Code Magics.",
      description2: "You can now build immersive AR Portals experiences by uploading 360° photographs from a 360 camera or the Google Street View app with our enhanced AR Portal app. ",
      imgSrc: "https://ar-code.com/images/arportal-app.webp",
      exampleImg: "https://ar-code.com/images/ar-code-portal.webp",
      appStoreLink: "https://apps.apple.com/us/app/ar-portal/id1585482493",
      appDetailsLink: "#",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold text-capitalize">Apps and a web interface for the quick creation of 3D models     </h2>
      {/* <p className="text-center web-font-size">We have four iOS mobile apps including {' '}
      <Link className="text-decoration-none" to="/blog">AR Code Magic Object Capture</Link>,{" "}
      <Link className="text-decoration-none" to="/blog">AR Frame</Link>,{" "}
      <Link className="text-decoration-none" to="/blog">AR Portal</Link>, and{" "}
      <Link className="text-decoration-none" to="/blog">AR Text.</Link> {' '}
      These major apps can be used for the quick creation of 3D models and their linked AR Code Magics. 
    </p> */}
      <p className="text-center web-font-size">
        We have four iOS mobile apps including AR Code Magic Object Capture, AR Frame, AR Portal, and AR Text. These major apps can be used for the quick creation of 3D models and their linked AR Code Magics.
      </p>
      <div className="mt-4">
        {apps.map((app) => (
          <div key={app.id} className="row align-items-center my-5">
            <div className="col-md-7">
              <img src={app.imgSrc} alt={app.title} className="img-fluid" />
            </div>
            <div className="col-md-5  mt-5 mt-md-0 text-center">
              <h3 className="text-capitalize">
                <strong>{app.title}</strong>
              </h3>
              <h4>
                <strong>{app.subtitle}</strong>
              </h4>
              <Link to={app.appDetailsLink}>
                <img src={app.exampleImg} alt={`${app.title} example`} className="img-fluid my-3" style={{ width: "70%" }} />
              </Link>
              <p className="web-font-size">{app.description1}</p>
              <p className="web-font-size">{app.description2}</p>
              <div>
                <Link to={app.appStoreLink} target="_blank" rel="noopener noreferrer" title={`${app.title} on App Store`}>
                  {/* <img
                  src="https://ar-code.com/images/ios-text3d.webp"
                  alt={`${app.title} on App Store`}
                  className="appstorelogo"
                  style={{ width: "50%" }}
                /> */}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ARWebInterface;
