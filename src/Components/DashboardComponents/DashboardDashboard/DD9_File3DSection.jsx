// import React, { useState } from "react";

// const DD9_File3DSection = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploaded3DFile, setUploaded3DFile] = useState(null);
//   const [uploaded3DFilePreview, setUploaded3DFilePreview] = useState(null);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const [depth, setDepth] = useState(0);
//   const [fileWeight, setFileWeight] = useState(0);
//   const [loadingTime, setLoadingTime] = useState(0);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploaded3DFile(file);

//       // Simulate upload progress
//       setUploadProgress(100);

//       // Generate preview for 3D file (mock preview for now)
//       const fileReader = new FileReader();
//       fileReader.onload = () => {
//         setUploaded3DFilePreview(fileReader.result);
//       };
//       fileReader.readAsDataURL(file);

//       // Mock file properties
//       setWidth(300);
//       setHeight(400);
//       setDepth(200);
//       setFileWeight((file.size / (1024 * 1024)).toFixed(2)); // File size in MB
//       setLoadingTime((file.size / 1000000).toFixed(1)); // Mock loading time
//     }
//   };

//   return (
//     <div className="row">
//       {/* 3D File Selection Section */}
//       <div className="col-md-6 custom-col">
//         <div className="upload-section">
//           <h6 className="text-center fw-bold mb-3">Select 3D File</h6>
//           <div
//             style={{
//               width: "100%",
//               height: "150px",
//               border: "1px dashed #ccc",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               background: "#f9f9f9",
//             }}
//           >
//             <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
//               <span>
//                 Drop a .GLB, .GLTF, .USDZ, .PLY, .STL, .FBX, .OBJ, .X3D, or a
//                 .ZIP file
//               </span>
//               <br />
//               <span style={{ fontSize: "12px", color: "#888" }}>15MB max</span>
//             </label>
//             <input
//               type="file"
//               id="fileInput"
//               style={{ display: "none" }}
//               onChange={handleFileUpload}
//             />
//           </div>
//           {uploadProgress === 100 ? (
//             <div className="progress mt-3" style={{ height: "5px" }}>
//               <div
//                 className="progress-bar"
//                 role="progressbar"
//                 style={{ width: "100%" }}
//                 aria-valuenow="100"
//                 aria-valuemin="0"
//                 aria-valuemax="100"
//               ></div>
//             </div>
//           ) : null}
//           <p className="text-center text-muted mt-2" style={{ fontSize: "12px" }}>
//             {uploadProgress === 100 ? "100% has been uploaded.." : ""}
//           </p>
//           <p className="mt-3 text-center" style={{ fontSize: "12px" }}>
//             Our 15MB limit ensures a fast end-user experience.
//             <br />
//             <a
//               href="/tutorials/reduce-weight"
//               className="text-decoration-underline"
//             >
//               Reduce 3D file weight
//             </a>{" "}
//             or{" "}
//             <a
//               href="/tutorials/optimize-models"
//               className="text-decoration-underline"
//             >
//               optimize 3D models for AR
//             </a>
//             .
//             <br />
//             If you need us to review it,{" "}
//             <a href="/contact" className="text-decoration-underline">
//               contact us
//             </a>
//             .
//           </p>
//         </div>
//       </div>

//       {/* Result Section */}
//       <div className="col-md-6 custom-col text-center">
//         <div className="result-side">
//           {uploaded3DFilePreview ? (
//             <img
//               src={uploaded3DFilePreview}
//               alt="Uploaded 3D File"
//               style={{
//                 width: "100%",
//                 maxWidth: "300px",
//                 maxHeight: "300px",
//                 objectFit: "contain",
//               }}
//             />
//           ) : (
//             <div
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 border: "1px dashed #ccc",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 background: "#f0f0f0",
//               }}
//             >
//               <span>Your 3D File</span>
//             </div>
//           )}

//           {/* Immersive AR Properties */}
//           <div className="artext-analysis w-100 p-3 border rounded bg-light mt-3">
//             <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
//             <p className="mb-1">Width: {width} cm</p>
//             <p className="mb-1">Height: {height} cm</p>
//             <p className="mb-1">Depth: {depth} cm</p>
//             <p className="mb-1">Weight: {fileWeight} Mo</p>
//             <p className="mb-0">Loading: {loadingTime} s</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DD9_File3DSection;



import React, { useState } from "react";
import { Link } from "react-router-dom";

const DD9_File3DSection = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploaded3DFile, setUploaded3DFile] = useState(null);
    const [uploaded3DFilePreview, setUploaded3DFilePreview] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [depth, setDepth] = useState(0);
    const [fileWeight, setFileWeight] = useState(0);
    const [loadingTime, setLoadingTime] = useState(0);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploaded3DFile(file);

            // Simulate upload progress
            setUploadProgress(100);

            // Generate preview for 3D file (mock preview for now)
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setUploaded3DFilePreview(fileReader.result);
            };
            fileReader.readAsDataURL(file);

            // Mock file properties
            setWidth(300);
            setHeight(400);
            setDepth(200);
            setFileWeight((file.size / (1024 * 1024)).toFixed(2)); // File size in MB
            setLoadingTime((file.size / 1000000).toFixed(1)); // Mock loading time
        }
    };

    return (
        <div className="row custom-row">
            {/* 3D File Selection Section */}
            <div className="col-md-6 custom-col">
                <div className="upload-container">
                    <label htmlFor="file-upload" className="form-label">
                        Drop a .GLB, .GLTF, .USDZ, .PLY, .STL, .FBX, .OBJ, .X3D, or a .ZIP file - 15MB max
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        className="form-control"
                        accept=".glb, .gltf, .usdz, .ply, .stl, .fbx, .obj, .x3d, .zip, .jpg, .jpeg, .png"
                        onChange={handleFileUpload}
                    />
                    {uploadProgress > 0 && (
                        <div className="progress mt-2" style={{ height: "5px" }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    )}
                    {uploadProgress === 100 && (
                        <small className="text-success">100% has been uploaded.</small>
                    )}

                    {/* <div className="mt-4">
            <small>
              Our 15MB limit ensures a fast end-user experience. If you need assistance, please follow our
              <a href="/tutorials/reduce-weight" className="text-decoration-none"> tutorial </a>
              or
              <a href="/contact" className="text-decoration-none"> contact us</a>.
            </small>
          </div> */}

                    <div className="mt-4">
                        <small>
                            To ensure a smooth experience, we recommend keeping your file size under 15MB. Check out our {" "}
                            {/* belog links lagana hai */}
                            <Link to="/user" className="text-decoration-none">guide to reducing 3D file size</Link>{" "}
                            or learn how to {" "}
                            <Link to="/user" className="text-decoration-none">optimize 3D models for AR</Link>.
                            If your file exceeds the limit or you need further assistance,{" "}
                            <Link to="mailto:support@example.com" className="text-decoration-none">contact us</Link>.
                        </small>
                    </div>

                </div>
            </div>

            {/* Result Section */}
            <div className="col-md-6 custom-col text-center">
                <div className="result-side">
                    {uploaded3DFilePreview ? (
                        <img
                            src={uploaded3DFilePreview}
                            alt="Uploaded 3D File"
                            style={{
                                width: "100%",
                                maxWidth: "300px",
                                maxHeight: "300px",
                                objectFit: "contain",
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "300px",
                                border: "1px dashed #ccc",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#f0f0f0",
                            }}
                        >
                            <span>Your 3D File</span>
                        </div>
                    )}

                    {/* Immersive AR Properties */}
                    <div className="artext-analysis w-100 p-3 border rounded bg-light mt-3">
                        <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
                        <p className="mb-1">Width: {width} cm</p>
                        <p className="mb-1">Height: {height} cm</p>
                        <p className="mb-1">Depth: {depth} cm</p>
                        <p className="mb-1">Weight: {fileWeight} Mo</p>
                        <p className="mb-0">Loading: {loadingTime} s</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DD9_File3DSection;



