// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import {
//   ArToolkitSource,
//   ArToolkitContext,
// } from "@ar-js-org/ar.js/three.js/build/ar-threex";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [arSupported, setArSupported] = useState(true);

//   useEffect(() => {
//     if (!navigator.mediaDevices?.getUserMedia) {
//       setArSupported(false);
//       return;
//     }

//     let scene, camera, renderer, arToolkitSource, arToolkitContext, textMesh;
//     let isDragging = false;
//     let lastX = 0,
//       lastY = 0,
//       scaleFactor = 1;

//     const initAR = async () => {
//       try {
//         // ✅ Scene Setup
//         scene = new THREE.Scene();

//         // ✅ Camera Setup
//         camera = new THREE.PerspectiveCamera(
//           75,
//           window.innerWidth / window.innerHeight,
//           0.01,
//           1000
//         );
//         camera.position.set(0, 0, 3);
//         scene.add(camera);

//         // ✅ Renderer
//         renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         mountRef.current.appendChild(renderer.domElement);

//         // ✅ AR Toolkit
//         arToolkitSource = new ArToolkitSource({
//           sourceType: "webcam",
//           sourceWidth: window.innerWidth,
//           sourceHeight: window.innerHeight,
//         });

//         arToolkitContext = new ArToolkitContext({
//           cameraParametersUrl: "/camera_para.dat",
//           detectionMode: "mono",
//         });

//         // Initialize AR Source
//         await new Promise((resolve) => {
//           arToolkitSource.init(() => {
//               arToolkitSource.onResizeElement();
//               arToolkitSource.copyElementSizeTo(renderer.domElement);
//               resolve();
//           });
//         });

//         // Initialize AR Context
//         await new Promise((resolve) => {
//           arToolkitContext.init(() => {
//             setTimeout(() => {
//               camera.projectionMatrix.copy(
//               arToolkitContext.getProjectionMatrix()
//             );
//             resolve();
//             }, 5000);
//           });
//         });

//         // ✅ Lighting
//         const ambientLight = new THREE.AmbientLight(0x404040, 2);
//         scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(5, 10, 5);
//         scene.add(directionalLight);

//         // ✅ Load 3D Text
//         const fontLoader = new FontLoader();
//         fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//           const textGeometry = new TextGeometry("Hello AR!", {
//             font: font,
//             size: 0.02,
//             height: 0.05,
//             bevelEnabled: true,
//             bevelThickness: 0.02,
//             bevelSize: 0.01,
//           });

//           textGeometry.center();
//           const textMaterial = new THREE.MeshStandardMaterial({
//             color: 0xff0000,
//           });

//           textMesh = new THREE.Mesh(textGeometry, textMaterial);
//           textMesh.position.set(0, -0.5, -1.5);
//           textMesh.castShadow = true;
//           scene.add(textMesh);
//           setLoading(false);
//         });

//         // ✅ Gesture Controls (Drag to Rotate & Scroll to Zoom)
//         const onMouseDown = (event) => {
//           isDragging = true;
//           lastX = event.clientX;
//           lastY = event.clientY;
//         };

//         const onMouseMove = (event) => {
//           if (!isDragging || !textMesh) return;
//           let deltaX = (event.clientX - lastX) * 0.01;
//           let deltaY = (event.clientY - lastY) * 0.01;

//           // Rotate text on mouse movement
//           textMesh.rotation.y += deltaX;
//           textMesh.rotation.x += deltaY;

//           lastX = event.clientX;
//           lastY = event.clientY;
//         };

//         const onMouseUp = () => {
//           isDragging = false;
//         };

//         const onWheel = (event) => {
//           if (!textMesh) return;
//           scaleFactor += event.deltaY * -0.001;
//           scaleFactor = Math.max(0.1, Math.min(2, scaleFactor));
//           textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         };

//         // Touch event for mobile rotation
//         const onTouchMove = (event) => {
//           if (!isDragging || !textMesh || event.touches.length !== 1) return;
//           let touch = event.touches[0];
//           let deltaX = (touch.clientX - lastX) * 0.01;
//           let deltaY = (touch.clientY - lastY) * 0.01;

//           textMesh.rotation.y += deltaX;
//           textMesh.rotation.x += deltaY;

//           lastX = touch.clientX;
//           lastY = touch.clientY;
//         };

//         // ✅ Add Event Listeners
//         renderer.domElement.addEventListener("mousedown", onMouseDown);
//         renderer.domElement.addEventListener("mousemove", onMouseMove);
//         renderer.domElement.addEventListener("mouseup", onMouseUp);
//         renderer.domElement.addEventListener("wheel", onWheel);

//         // Touch events for mobile
//         renderer.domElement.addEventListener("touchstart", (event) => {
//           isDragging = true;
//           lastX = event.touches[0].clientX;
//           lastY = event.touches[0].clientY;
//         });

//         renderer.domElement.addEventListener("touchmove", onTouchMove);
//         renderer.domElement.addEventListener("touchend", () => {
//           isDragging = false;
//         });

//         // ✅ Hit Testing
//         // const onXRFrame = (time, frame) => {
//         //   if (!frame || !renderer.xr.getSession()) return;

//         //   const referenceSpace = renderer.xr.getReferenceSpace();
//         //   const session = renderer.xr.getSession();

//         //   if (session && referenceSpace && !hitTestSourceRequested) {
//         //     session.requestHitTestSource({ space: referenceSpace }).then((source) => {
//         //       hitTestSource = source;
//         //       hitTestSourceRequested = true;
//         //     }).catch((err) => {
//         //       console.error("Hit test source request failed:", err);
//         //     });
//         //   }

//         //   if (hitTestSource && frame) {
//         //     const hitTestResults = frame.getHitTestResults(hitTestSource);
//         //     if (hitTestResults.length > 0) {
//         //       const hit = hitTestResults[0];
//         //       const pose = hit.getPose(referenceSpace);
//         //       if (pose && textMesh) {
//         //         textMesh.visible = true; // Show text when hit test is successful
//         //         textMesh.position.setFromMatrixPosition(pose.transform.matrix);
//         //       }
//         //     } else {
//         //       if (textMesh) textMesh.visible = false; // Hide text when no hit test result
//         //     }
//         //   }
//         // };

//         // ✅ Animation Loop
//         const animate = () => {
//           requestAnimationFrame(animate);
//           if (arToolkitSource?.ready) {
//             arToolkitContext.update(arToolkitSource.domElement);
//             // if (renderer.xr.getSession()) {
//             //   onXRFrame();
//             // }
//           }
//           renderer.render(scene, camera);
//         };

//         animate();
//       } catch (error) {
//         console.error("AR Initialization Error:", error);
//         setArSupported(false);
//       }
//     };

//     initAR();

//     return () => {
//       if (renderer) mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div>
//       {loading && arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           Loading AR text...
//         </div>
//       )}
//       {!arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "red",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           AR not supported.
//         </div>
//       )}
//       <div
//         ref={mountRef}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//         }}
//       />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [arSupported, setArSupported] = useState(true);
//   const [sessionStarted, setSessionStarted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (!navigator.xr) {
//       console.error("WebXR API is not available on this browser.");
//       setArSupported(false);
//       return;
//     }

//     navigator.xr.isSessionSupported("immersive-ar")
//       .then((supported) => {
//         console.log("AR Supported:", supported);
//         setArSupported(supported);
//       })
//       .catch((error) => {
//         console.error("Error checking AR support:", error);
//         setArSupported(false);
//       });
//   }, []);

//   const startARSession = async () => {
//     if (!navigator.xr) return;

//     try {
//       const session = await navigator.xr.requestSession("immersive-ar", {
//         requiredFeatures: ["hit-test"],
//       });

//       setSessionStarted(true);

//       // ✅ Scene Setup
//       const scene = new THREE.Scene();

//       // ✅ Camera Setup
//       const camera = new THREE.PerspectiveCamera(
//         45,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       scene.add(camera);

//       // ✅ Renderer with WebXR
//       const renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//       });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.xr.enabled = true;
//       mountRef.current.appendChild(renderer.domElement);

//       // ✅ WebXR Session
//       renderer.xr.setSession(session);

//       // ✅ Lighting
//       const light = new THREE.AmbientLight(0xffffff, 1);
//       scene.add(light);

//       // ✅ Load 3D Text
//       const fontLoader = new FontLoader();
//       let textMesh = null;
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Hello AR!", {
//           font: font,
//           size: 0.2,
//           height: 0.05,
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });

//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0xff0000,
//         });
//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         textMesh.visible = false;
//         scene.add(textMesh);
//       });

//       // ✅ Hit-Test Setup
//       const xrSession = renderer.xr.getSession();
//       const referenceSpace = await xrSession.requestReferenceSpace("local");
//       const viewerSpace = await xrSession.requestReferenceSpace("viewer");
//       const hitTestSource = await xrSession.requestHitTestSource({
//         space: viewerSpace,
//       });

//       // ✅ WebXR Animation Loop
//       const animate = () => {
//         renderer.setAnimationLoop((timestamp, frame) => {
//           if (frame) {
//             const hitTestResults = frame.getHitTestResults(hitTestSource);
//             if (hitTestResults.length > 0) {
//               const hitPose = hitTestResults[0].getPose(referenceSpace);
//               if (textMesh) {
//                 textMesh.visible = true;
//                 textMesh.position.set(
//                   hitPose.transform.position.x,
//                   hitPose.transform.position.y,
//                   hitPose.transform.position.z
//                 );
//               }
//             }
//           }
//           renderer.render(scene, camera);
//         });
//       };

//       animate();
//     } catch (error) {
//       console.error("AR Initialization Error:", error);
//       setErrorMessage("Permission denied. Please allow camera access in browser settings.");
//       setArSupported(false);
//     }
//   };

//   return (
//     <div>
//       {!sessionStarted && arSupported && (
//         <button
//           onClick={startARSession}
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             padding: "10px 20px",
//             fontSize: "18px",
//             background: "#008CBA",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Start AR
//         </button>
//       )}
//       {!arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "red",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           {errorMessage || "AR not supported or permission denied. Try enabling camera access."}
//         </div>
//       )}
//       <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [arSupported, setArSupported] = useState(true);

//   useEffect(() => {
//     if (!navigator.xr) {
//       setArSupported(false);
//       return;
//     }

//     let scene, camera, renderer, textMesh;
//     let hitTestSource = null;
//     let hitTestSourceRequested = false;

//     const initAR = async () => {
//       try {
//         scene = new THREE.Scene();

//         camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
//         camera.position.set(0, 0, 3);
//         scene.add(camera);

//         renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.xr.enabled = true;
//         mountRef.current.appendChild(renderer.domElement);

//         const ambientLight = new THREE.AmbientLight(0x404040, 2);
//         scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(5, 10, 5);
//         scene.add(directionalLight);

//         const fontLoader = new FontLoader();
//         fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//           const textGeometry = new TextGeometry("Hello AR!", {
//             font: font,
//             size: 0.2,
//             height: 0.05,
//             bevelEnabled: true,
//             bevelThickness: 0.02,
//             bevelSize: 0.01,
//           });

//           textGeometry.center();
//           const textMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

//           textMesh = new THREE.Mesh(textGeometry, textMaterial);
//           textMesh.castShadow = true;
//           textMesh.visible = false;
//           scene.add(textMesh);
//           setLoading(false);
//         });

//         const startARSession = async () => {
//           try {
//             const session = await navigator.xr.requestSession("immersive-ar", {
//               requiredFeatures: ["hit-test"],
//               optionalFeatures: ["dom-overlay"],
//             });

//             renderer.xr.setReferenceSpaceType("local");
//             await renderer.xr.setSession(session);

//             const referenceSpace = await session.requestReferenceSpace("viewer");
//             hitTestSource = await session.requestHitTestSource({ space: referenceSpace });

//             session.addEventListener("end", () => {
//               hitTestSource = null;
//               hitTestSourceRequested = false;
//               textMesh.visible = false;
//             });

//           } catch (error) {
//             console.error("AR Session Start Failed:", error);
//             setArSupported(false);
//           }
//         };

//         startARSession();

//         // const onXRFrame = (time, frame) => {
//         //   if (!frame || !renderer.xr.getSession()) return;

//         //   if (!hitTestSourceRequested) {
//         //     const session = renderer.xr.getSession();
//         //     if (session) {
//         //       session.requestReferenceSpace("viewer").then((referenceSpace) => {
//         //         session.requestHitTestSource({ space: referenceSpace }).then((source) => {
//         //           hitTestSource = source;
//         //           hitTestSourceRequested = true;
//         //         });
//         //       });
//         //     }
//         //   }

//         //   if (hitTestSource) {
//         //     const hitTestResults = frame.getHitTestResults(hitTestSource);
//         //     if (hitTestResults.length > 0) {
//         //       const hit = hitTestResults[0];
//         //       if (hit && hit.getPose) {
//         //         const pose = hit.getPose(renderer.xr.getReferenceSpace());
//         //         if (pose && textMesh) {
//         //           textMesh.visible = true;
//         //           textMesh.position.setFromMatrixPosition(pose.transform.matrix);
//         //         }
//         //       }
//         //     } else {
//         //       textMesh.visible = false;
//         //     }
//         //   }
//         // };

//         const animate = () => {
//           requestAnimationFrame(animate);
//           // if (renderer.xr.getSession()) {
//           //   onXRFrame();
//           // }
//           renderer.render(scene, camera);
//         };

//         animate();
//       } catch (error) {
//         console.error("AR Initialization Error:", error);
//         setArSupported(false);
//       }
//     };

//     initAR();

//     return () => {
//       if (renderer) mountRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div>
//       {loading && arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           Loading AR text...
//         </div>
//       )}
//       {!arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "red",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           AR not supported.
//         </div>
//       )}
//       <div ref={mountRef} style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }} />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import {
//   ArToolkitSource,
//   ArToolkitContext,
// } from "@ar-js-org/ar.js/three.js/build/ar-threex";
// import * as tf from "@tensorflow/tfjs";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [arSupported, setArSupported] = useState(true);

//   useEffect(() => {
//     if (!navigator.mediaDevices?.getUserMedia) {
//       setArSupported(false);
//       return;
//     }

//     let scene, camera, renderer, arToolkitSource, arToolkitContext;
//     let model;
//     let textMesh = null; // To store the 3D text mesh
//     let isDetectionPaused = false; // To pause/resume object detection
//     let isDragging = false; // For drag-to-rotate functionality
//     let lastX = 0,
//       lastY = 0; // For drag-to-rotate functionality
//     let scaleFactor = 1; // For zoom functionality

//     const initAR = async () => {
//       try {
//         // ✅ Scene Setup
//         scene = new THREE.Scene();

//         // ✅ Camera Setup
//         camera = new THREE.PerspectiveCamera(
//           75,
//           window.innerWidth / window.innerHeight,
//           0.1,
//           1000
//         );
//         camera.position.set(0, 0, 3);
//         scene.add(camera);

//         // ✅ Renderer
//         renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(640, 480); // Fixed renderer size
//         renderer.setPixelRatio(window.devicePixelRatio);
//         mountRef.current.appendChild(renderer.domElement);

//         // ✅ AR Toolkit
//         arToolkitSource = new ArToolkitSource({
//           sourceType: "webcam",
//           sourceWidth: 640, // Fixed camera feed width
//           sourceHeight: 480, // Fixed camera feed height
//         });

//         arToolkitContext = new ArToolkitContext({
//           cameraParametersUrl: "/camera_para.dat",
//           detectionMode: "mono",
//         });

//         // Initialize AR Source
//         await new Promise((resolve) => {
//           arToolkitSource.init(() => {
//             arToolkitSource.onResizeElement();
//             arToolkitSource.copyElementSizeTo(renderer.domElement);
//             resolve();
//           });
//         });

//         // Initialize AR Context
//         await new Promise((resolve) => {
//           arToolkitContext.init(() => {
//             setTimeout(() => {
//               camera.projectionMatrix.copy(
//                 arToolkitContext.getProjectionMatrix()
//               );
//               resolve();
//             }, 5000);
//           });
//         });

//         // ✅ Lighting
//         const ambientLight = new THREE.AmbientLight(0x404040, 2);
//         scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(5, 10, 5);
//         scene.add(directionalLight);

//         // ✅ Load 3D Text Font
//         const fontLoader = new FontLoader();
//         fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//           console.log("Font loaded successfully!");
//           setLoading(false);

//           // ✅ Load TensorFlow.js COCO-SSD Model
//           console.log("Loading TensorFlow.js model...");
//           cocoSsd.load().then((loadedModel) => {
//             model = loadedModel;
//             console.log("TensorFlow.js model loaded successfully!");

//             // ✅ Object Detection
//             const detectObjects = async () => {
//               if (!arToolkitSource?.domElement || isDetectionPaused) return;

//               const predictions = await model.detect(arToolkitSource.domElement);
//               console.log("Detected objects:", predictions);

//               // If an object is detected, pause detection and display text
//               if (predictions.length > 0) {
//                 isDetectionPaused = true; // Pause detection

//                 // Remove previous text mesh
//                 if (textMesh) {
//                   scene.remove(textMesh);
//                 }

//                 const { bbox } = predictions[0];
//                 const [x, y, width, height] = bbox;

//                 // Create 3D text
//                 const textGeometry = new TextGeometry("Hello AR!", {
//                   font: font,
//                   size: 0.2,
//                   height: 0.05,
//                   bevelEnabled: true,
//                   bevelThickness: 0.02,
//                   bevelSize: 0.01,
//                 });

//                 const textMaterial = new THREE.MeshStandardMaterial({
//                   color: 0xff0000,
//                 });

//                 textMesh = new THREE.Mesh(textGeometry, textMaterial);

//                 // Position text based on bounding box
//                 textMesh.position.set(x / 100, -y / 100, -2);
//                 scene.add(textMesh);

//                 // Wait for user to move the camera
//                 setTimeout(() => {
//                   isDetectionPaused = false; // Resume detection
//                 }, 5000); // Wait for 5 seconds before resuming detection
//               }

//               requestAnimationFrame(detectObjects);
//             };

//             detectObjects();
//           });
//         });

//         // ✅ Gesture Controls (Drag to Rotate & Scroll to Zoom)
//         const onMouseDown = (event) => {
//           isDragging = true;
//           lastX = event.clientX;
//           lastY = event.clientY;
//         };

//         const onMouseMove = (event) => {
//           if (!isDragging || !textMesh) return;
//           let deltaX = (event.clientX - lastX) * 0.01;
//           let deltaY = (event.clientY - lastY) * 0.01;

//           // Rotate text on mouse movement
//           textMesh.rotation.y += deltaX;
//           textMesh.rotation.x += deltaY;

//           lastX = event.clientX;
//           lastY = event.clientY;
//         };

//         const onMouseUp = () => {
//           isDragging = false;
//         };

//         const onWheel = (event) => {
//           if (!textMesh) return;
//           scaleFactor += event.deltaY * -0.001;
//           scaleFactor = Math.max(0.1, Math.min(2, scaleFactor));
//           textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         };

//         // Touch event for mobile rotation
//         const onTouchMove = (event) => {
//           if (!isDragging || !textMesh || event.touches.length !== 1) return;
//           let touch = event.touches[0];
//           let deltaX = (touch.clientX - lastX) * 0.01;
//           let deltaY = (touch.clientY - lastY) * 0.01;

//           textMesh.rotation.y += deltaX;
//           textMesh.rotation.x += deltaY;

//           lastX = touch.clientX;
//           lastY = touch.clientY;
//         };

//         // ✅ Add Event Listeners
//         renderer.domElement.addEventListener("mousedown", onMouseDown);
//         renderer.domElement.addEventListener("mousemove", onMouseMove);
//         renderer.domElement.addEventListener("mouseup", onMouseUp);
//         renderer.domElement.addEventListener("wheel", onWheel);

//         // Touch events for mobile
//         renderer.domElement.addEventListener("touchstart", (event) => {
//           isDragging = true;
//           lastX = event.touches[0].clientX;
//           lastY = event.touches[0].clientY;
//         });

//         renderer.domElement.addEventListener("touchmove", onTouchMove);
//         renderer.domElement.addEventListener("touchend", () => {
//           isDragging = false;
//         });

//         // ✅ Animation Loop
//         const animate = () => {
//           requestAnimationFrame(animate);
//           if (arToolkitSource?.ready) {
//             arToolkitContext.update(arToolkitSource.domElement);
//           }
//           renderer.render(scene, camera);
//         };

//         animate();
//       } catch (error) {
//         console.error("AR Initialization Error:", error);
//         setArSupported(false);
//       }
//     };

//     initAR();

//     return () => {
//       if (renderer) mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div>
//       {loading && arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           Loading AR text...
//         </div>
//       )}
//       {!arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "red",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           AR not supported.
//         </div>
//       )}
//       <div
//         ref={mountRef}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//         }}
//       />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     let scene, camera, renderer, model, mixer;

//     // ✅ Initialize WebXR and Three.js
//     const init = async () => {
//       // ✅ Scene Setup
//       scene = new THREE.Scene();

//       // ✅ Camera Setup
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       camera.position.set(0, 1.6, 0); // Adjust camera height for AR
//       scene.add(camera);

//       // ✅ Renderer Setup
//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.xr.enabled = true; // Enable WebXR
//       mountRef.current.appendChild(renderer.domElement);

//       // ✅ Lighting
//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);

//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       // ✅ Load 3D Model
//       const loader = new GLTFLoader();
//       loader.load(
//         "/models/your-model.gltf", // Replace with your model path
//         (gltf) => {
//           model = gltf.scene;
//           scene.add(model);

//           // ✅ Set Model Position and Scale
//           model.position.set(0, 0, -2); // Adjust position for AR
//           model.scale.set(0.5, 0.5, 0.5); // Adjust scale

//           // ✅ Load Animations
//           mixer = new THREE.AnimationMixer(model);
//           const clips = gltf.animations;

//           if (clips && clips.length > 0) {
//             const action = mixer.clipAction(clips[0]); // Play the first animation
//             action.play();
//           }
//         },
//         undefined,
//         (error) => {
//           console.error("Error loading 3D model:", error);
//         }
//       );

//       // ✅ Start WebXR Session
//       const startARSession = async () => {
//         if (navigator.xr) {
//           const session = await navigator.xr.requestSession("immersive-ar");
//           session.addEventListener("end", () => {
//             console.log("AR session ended.");
//           });

//           renderer.xr.setSession(session);

//           // ✅ Animation Loop
//           const animate = () => {
//             requestAnimationFrame(animate);

//             // Update Animation Mixer
//             if (mixer) {
//               const delta = clock.getDelta();
//               mixer.update(delta);
//             }

//             renderer.render(scene, camera);
//           };

//           animate();
//         } else {
//           console.log("WebXR not supported.");
//         }
//       };

//       startARSession();
//     };

//     init();

//     // ✅ Cleanup
//     return () => {
//       if (renderer) {
//         renderer.dispose();
//         mountRef.current?.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={mountRef}
//       style={{
//         width: "100vw",
//         height: "100vh",
//         position: "fixed",
//         top: 0,
//         left: 0,
//       }}
//     />
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import {
//   ArToolkitSource,
//   ArToolkitContext,
// } from "@ar-js-org/ar.js/three.js/build/ar-threex";
// import * as tf from "@tensorflow/tfjs";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [arSupported, setArSupported] = useState(true);

//   useEffect(() => {
//     if (!navigator.mediaDevices?.getUserMedia) {
//       setArSupported(false);
//       return;
//     }

//     let scene, camera, renderer, arToolkitSource, arToolkitContext;
//     let model;
//     let textMesh = null;
//     let isDetectionPaused = false;
//     let isDragging = false;
//     let lastX = 0,
//       lastY = 0;
//     let scaleFactor = 1;

//     const initAR = async () => {
//       try {
//         // Scene Setup
//         scene = new THREE.Scene();

//         // Camera Setup
//         camera = new THREE.PerspectiveCamera(
//           75,
//           window.innerWidth / window.innerHeight,
//           0.01,
//           1000
//         );
//         camera.position.set(0, 0, 1);
//         scene.add(camera);

//         // Renderer
//         renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         mountRef.current.appendChild(renderer.domElement);

//         // AR Toolkit
//         arToolkitSource = new ArToolkitSource({
//           sourceType: "webcam",
//           sourceWidth: window.innerWidth,
//           sourceHeight: window.innerHeight,
//         });

//         arToolkitContext = new ArToolkitContext({
//           cameraParametersUrl: "/camera_para.dat",
//           detectionMode: "mono",
//         });

//         await new Promise((resolve) => {
//           arToolkitSource.init(() => {
//             arToolkitSource.onResizeElement();
//             arToolkitSource.copyElementSizeTo(renderer.domElement);
//             resolve();
//           });
//         });

//         await new Promise((resolve) => {
//           arToolkitContext.init(() => {
//             camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
//             resolve();
//           });
//         });

//         // Lighting
//         const ambientLight = new THREE.AmbientLight(0x404040, 2);
//         scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(5, 10, 5);
//         scene.add(directionalLight);

//         // Load Font
//         const fontLoader = new FontLoader();
//         fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//           setLoading(false);

//           // Load TensorFlow.js Model
//           cocoSsd.load().then((loadedModel) => {
//             model = loadedModel;

//             const detectObjects = async () => {
//               if (!arToolkitSource?.domElement || isDetectionPaused) return;

//               const predictions = await model.detect(arToolkitSource.domElement);
//               if (predictions.length > 0) {
//                 isDetectionPaused = true;

//                 if (textMesh) scene.remove(textMesh);

//                 const textGeometry = new TextGeometry("Hello AR!", {
//                   font: font,
//                   size: 0.2,
//                   height: 0.05,
//           //         curveSegments: 5,
//           // bevelEnabled: true,
//           // bevelThickness: 0.05,
//           // bevelSize: 0.01,
//           // bevelSegments: 3,
//                 });

//                 const textMaterial = new THREE.MeshStandardMaterial({
//                   color: 0xff0000,
//                 });

//                 textMesh = new THREE.Mesh(textGeometry, textMaterial);
//                 // textMesh.position.set(0, 0, -2); // Center of the screen
//                 textMesh.position.set(0, -0.5, -1.5);
//                 scene.add(textMesh);

//                 setTimeout(() => {
//                   isDetectionPaused = false;
//                 }, 5000);
//               }

//               requestAnimationFrame(detectObjects);
//             };

//             detectObjects();
//           });
//         });

//         // Event Listeners
//         const onMouseDown = (event) => {
//           isDragging = true;
//           lastX = event.clientX;
//           lastY = event.clientY;
//         };

//         const onMouseMove = (event) => {
//           if (!isDragging || !textMesh) return;
//           let deltaX = (event.clientX - lastX) * 0.01;
//           let deltaY = (event.clientY - lastY) * 0.01;
//           textMesh.rotation.y += deltaX;
//           textMesh.rotation.x += deltaY;
//           lastX = event.clientX;
//           lastY = event.clientY;
//         };

//         const onMouseUp = () => {
//           isDragging = false;
//         };

//         const onTouchStart = (event) => {
//           isDragging = true;
//           lastX = event.touches[0].clientX;
//           lastY = event.touches[0].clientY;
//         };

//         const onTouchMove = (event) => {
//           if (!isDragging || !textMesh) return;
//           let deltaX = (event.touches[0].clientX - lastX) * 0.01;
//           let deltaY = (event.touches[0].clientY - lastY) * 0.01;
//           textMesh.rotation.y += deltaX;
//           textMesh.rotation.x += deltaY;
//           lastX = event.touches[0].clientX;
//           lastY = event.touches[0].clientY;
//         };

//         const onTouchEnd = () => {
//           isDragging = false;
//         };

//         renderer.domElement.addEventListener("mousedown", onMouseDown);
//         renderer.domElement.addEventListener("mousemove", onMouseMove);
//         renderer.domElement.addEventListener("mouseup", onMouseUp);
//         renderer.domElement.addEventListener("touchstart", onTouchStart);
//         renderer.domElement.addEventListener("touchmove", onTouchMove);
//         renderer.domElement.addEventListener("touchend", onTouchEnd);

//         // Handle window resize
//         window.addEventListener("resize", () => {
//           camera.aspect = window.innerWidth / window.innerHeight;
//           camera.updateProjectionMatrix();
//           renderer.setSize(window.innerWidth, window.innerHeight);
//           arToolkitSource.onResizeElement();
//         });

//         // Animation Loop
//         const animate = () => {
//           requestAnimationFrame(animate);
//           if (arToolkitSource?.ready) {
//             arToolkitContext.update(arToolkitSource.domElement);
//           }
//           renderer.render(scene, camera);
//         };

//         animate();
//       } catch (error) {
//         console.error("AR Initialization Error:", error);
//         setArSupported(false);
//       }
//     };

//     initAR();

//     return () => {
//       if (renderer) mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div>
//       {loading && arSupported && <div>Loading AR text...</div>}
//       {!arSupported && <div>AR not supported.</div>}
//       <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [arSupported, setArSupported] = useState(true);
//   const [sessionStarted, setSessionStarted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (!navigator.xr) {
//       console.error("WebXR API is not available on this browser.");
//       setArSupported(false);
//       return;
//     }

//     navigator.xr.isSessionSupported("immersive-ar")
//       .then((supported) => {
//         console.log("AR Supported:", supported);
//         setArSupported(supported);
//       })
//       .catch((error) => {
//         console.error("Error checking AR support:", error);
//         setArSupported(false);
//       });
//   }, []);

//   const startARSession = async () => {
//     if (!navigator.xr) {
//       // Fallback to regular camera access if WebXR is not supported
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         setErrorMessage("AR not supported, but camera access granted.");
//         // You can display the camera stream in a video element or handle it as needed
//         const video = document.createElement("video");
//         video.srcObject = stream;
//         video.play();
//         mountRef.current.appendChild(video);
//       } catch (error) {
//         console.error("Camera access denied:", error);
//         setErrorMessage("Permission denied. Please allow camera access in browser settings.");
//       }
//       return;
//     }

//     try {
//       const session = await navigator.xr.requestSession("immersive-ar", {
//         requiredFeatures: ["hit-test"],
//       });

//       setSessionStarted(true);

//       // ✅ Scene Setup
//       const scene = new THREE.Scene();

//       // ✅ Camera Setup
//       const camera = new THREE.PerspectiveCamera(
//         45,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       scene.add(camera);

//       // ✅ Renderer with WebXR
//       const renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//       });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.xr.enabled = true;
//       mountRef.current.appendChild(renderer.domElement);

//       // ✅ WebXR Session
//       renderer.xr.setSession(session);

//       // ✅ Lighting
//       const light = new THREE.AmbientLight(0xffffff, 1);
//       scene.add(light);

//       // ✅ Load 3D Text
//       const fontLoader = new FontLoader();
//       let textMesh = null;
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Hello AR!", {
//           font: font,
//           size: 0.2,
//           height: 0.05,
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });

//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0xff0000,
//         });
//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         textMesh.visible = false;
//         scene.add(textMesh);
//       });

//       // ✅ Hit-Test Setup
//       const xrSession = renderer.xr.getSession();
//       const referenceSpace = await xrSession.requestReferenceSpace("local");
//       const viewerSpace = await xrSession.requestReferenceSpace("viewer");
//       const hitTestSource = await xrSession.requestHitTestSource({
//         space: viewerSpace,
//       });

//       // ✅ WebXR Animation Loop
//       const animate = () => {
//         renderer.setAnimationLoop((timestamp, frame) => {
//           if (frame) {
//             const hitTestResults = frame.getHitTestResults(hitTestSource);
//             if (hitTestResults.length > 0) {
//               const hitPose = hitTestResults[0].getPose(referenceSpace);
//               if (textMesh) {
//                 textMesh.visible = true;
//                 textMesh.position.set(
//                   hitPose.transform.position.x,
//                   hitPose.transform.position.y,
//                   hitPose.transform.position.z
//                 );
//               }
//             }
//           }
//           renderer.render(scene, camera);
//         });
//       };

//       animate();
//     } catch (error) {
//       console.error("AR Initialization Error:", error);
//       setErrorMessage("Permission denied. Please allow camera access in browser settings.");
//       setArSupported(false);
//     }
//   };

//   return (
//     <div>
//       {!sessionStarted && arSupported && (
//         <button
//           onClick={startARSession}
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             padding: "10px 20px",
//             fontSize: "18px",
//             background: "#008CBA",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Start AR
//         </button>
//       )}
//       {!arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "red",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           {errorMessage || "AR not supported or permission denied. Try enabling camera access."}
//         </div>
//       )}
//       <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import {
//   ArToolkitSource,
//   ArToolkitContext,
// } from "@ar-js-org/ar.js/three.js/build/ar-threex";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [arSupported, setArSupported] = useState(false);

//   useEffect(() => {
//     const checkARSupport = async () => {
//       // Check if WebXR and AR are supported
//       if (!navigator.xr) {
//         setArSupported(false);
//         setLoading(false); // Stop loading if AR is not supported
//         return;
//       }

//       try {
//         const isARSupported = await navigator.xr.isSessionSupported("immersive-ar");
//         setArSupported(isARSupported);

//         if (isARSupported) {
//           // If AR is supported, initialize AR and access the camera
//           initAR();
//         } else {
//           setLoading(false); // Stop loading if AR is not supported
//         }
//       } catch (error) {
//         console.error("Error checking AR support:", error);
//         setArSupported(false);
//         setLoading(false); // Stop loading if there's an error
//       }
//     };

//     checkARSupport();
//   }, []);

//   const initAR = async () => {
//     let scene, camera, renderer, arToolkitSource, arToolkitContext, textMesh;
//     let isDragging = false;
//     let lastX = 0,
//       lastY = 0,
//       scaleFactor = 1;

//     try {
//       // ✅ Scene Setup
//       scene = new THREE.Scene();

//       // ✅ Camera Setup
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       camera.position.set(0, 0, 3);
//       scene.add(camera);

//       // ✅ Renderer
//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       mountRef.current.appendChild(renderer.domElement);

//       // ✅ AR Toolkit
//       arToolkitSource = new ArToolkitSource({
//         sourceType: "webcam",
//         sourceWidth: window.innerWidth,
//         sourceHeight: window.innerHeight,
//       });

//       arToolkitContext = new ArToolkitContext({
//         cameraParametersUrl: "/camera_para.dat",
//         detectionMode: "mono",
//       });

//       // Initialize AR Source
//       await new Promise((resolve) => {
//         arToolkitSource.init(() => {
//           arToolkitSource.onResizeElement();
//           arToolkitSource.copyElementSizeTo(renderer.domElement);
//           resolve();
//         });
//       });

//       // Initialize AR Context
//       await new Promise((resolve) => {
//         arToolkitContext.init(() => {
//           setTimeout(() => {
//             camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
//             resolve();
//           }, 5000);
//         });
//       });

//       // ✅ Lighting
//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);

//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       // ✅ Load 3D Text
//       const fontLoader = new FontLoader();
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Hello AR!", {
//           font: font,
//           size: 0.02,
//           height: 0.05,
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });

//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0xff0000,
//         });

//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         textMesh.position.set(0, -0.5, -1.5);
//         textMesh.castShadow = true;
//         scene.add(textMesh);
//         setLoading(false);
//       });

//       // ✅ Gesture Controls (Drag to Rotate & Scroll to Zoom)
//       const onMouseDown = (event) => {
//         isDragging = true;
//         lastX = event.clientX;
//         lastY = event.clientY;
//       };

//       const onMouseMove = (event) => {
//         if (!isDragging || !textMesh) return;
//         let deltaX = (event.clientX - lastX) * 0.01;
//         let deltaY = (event.clientY - lastY) * 0.01;

//         // Rotate text on mouse movement
//         textMesh.rotation.y += deltaX;
//         textMesh.rotation.x += deltaY;

//         lastX = event.clientX;
//         lastY = event.clientY;
//       };

//       const onMouseUp = () => {
//         isDragging = false;
//       };

//       const onWheel = (event) => {
//         if (!textMesh) return;
//         scaleFactor += event.deltaY * -0.001;
//         scaleFactor = Math.max(0.1, Math.min(2, scaleFactor));
//         textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//       };

//       // Touch event for mobile rotation
//       const onTouchMove = (event) => {
//         if (!isDragging || !textMesh || event.touches.length !== 1) return;
//         let touch = event.touches[0];
//         let deltaX = (touch.clientX - lastX) * 0.01;
//         let deltaY = (touch.clientY - lastY) * 0.01;

//         textMesh.rotation.y += deltaX;
//         textMesh.rotation.x += deltaY;

//         lastX = touch.clientX;
//         lastY = touch.clientY;
//       };

//       // ✅ Add Event Listeners
//       renderer.domElement.addEventListener("mousedown", onMouseDown);
//       renderer.domElement.addEventListener("mousemove", onMouseMove);
//       renderer.domElement.addEventListener("mouseup", onMouseUp);
//       renderer.domElement.addEventListener("wheel", onWheel);

//       // Touch events for mobile
//       renderer.domElement.addEventListener("touchstart", (event) => {
//         isDragging = true;
//         lastX = event.touches[0].clientX;
//         lastY = event.touches[0].clientY;
//       });

//       renderer.domElement.addEventListener("touchmove", onTouchMove);
//       renderer.domElement.addEventListener("touchend", () => {
//         isDragging = false;
//       });

//       // ✅ Animation Loop
//       const animate = () => {
//         requestAnimationFrame(animate);
//         if (arToolkitSource?.ready) {
//           arToolkitContext.update(arToolkitSource.domElement);
//         }
//         renderer.render(scene, camera);
//       };

//       animate();
//     } catch (error) {
//       console.error("AR Initialization Error:", error);
//       setArSupported(false);
//       setLoading(false); // Stop loading if there's an error
//     }
//   };

//   return (
//     <div>
//       {loading && arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           Loading AR text...
//         </div>
//       )}
//       {!arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "red",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           AR not supported on this device.
//         </div>
//       )}
//       <div
//         ref={mountRef}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//         }}
//       />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import {
//   ArToolkitSource,
//   ArToolkitContext,
// } from "@ar-js-org/ar.js/three.js/build/ar-threex";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [arSupported, setArSupported] = useState(false);

//   useEffect(() => {
//     const checkARSupport = async () => {
//       if (!navigator.xr) {
//         setArSupported(false);
//         setLoading(false);
//         return;
//       }

//       try {
//         const isARSupported = await navigator.xr.isSessionSupported("immersive-ar");
//         setArSupported(isARSupported);
//         initAR();
//         if (isARSupported) {
//           // initAR();
//         } else {
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error checking AR support:", error);
//         setArSupported(false);
//         setLoading(false);
//       }
//     };

//     checkARSupport();
//   }, []);

//   const initAR = async () => {
//     let scene, camera, renderer, arToolkitSource, arToolkitContext, textMesh;
//     let isDragging = false;
//     let lastX = 0,
//       lastY = 0,
//       scaleFactor = 1;

//     try {
//       // ✅ Scene Setup
//       scene = new THREE.Scene();

//       // ✅ Camera Setup
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       camera.position.set(0, 0, -3);
//       scene.add(camera);

//       // ✅ Renderer
//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);

//       renderer.domElement.style.position = "fixed";
//       renderer.domElement.style.top = "0";
//       renderer.domElement.style.left = "0";
//       renderer.domElement.style.width = "100%";
//       renderer.domElement.style.height = "100%";
//       renderer.domElement.style.zIndex = "0";

//       mountRef.current.appendChild(renderer.domElement);

//       // ✅ AR Toolkit
//       arToolkitSource = new ArToolkitSource({
//         sourceType: "webcam",
//         sourceWidth: window.innerWidth,
//         sourceHeight: window.innerHeight,
//       });

//       arToolkitContext = new ArToolkitContext({
//         cameraParametersUrl: "/camera_para.dat",
//         detectionMode: "mono",
//       });

//       // Initialize AR Source
//       await new Promise((resolve) => {
//         arToolkitSource.init(() => {
//           arToolkitSource.onResizeElement();
//           arToolkitSource.copyElementSizeTo(renderer.domElement);
//           resolve();
//         });
//       });

//       // Initialize AR Context
//       await new Promise((resolve) => {
//         arToolkitContext.init(() => {
//           camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
//           resolve();
//         });
//       });

//       // ✅ Lighting
//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);

//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       // ✅ Load 3D Text
//       const fontLoader = new FontLoader();
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Hello AR!", {
//           font: font,
//           size: 0.02,
//           height: 0.05,
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });

//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0xff0000,
//         });

//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         textMesh.position.set(0, -0.5, -1.5);
//         textMesh.castShadow = true;
//         scene.add(textMesh);
//         setLoading(false);
//       });

//       // ✅ Gesture Controls (Drag to Rotate & Scroll to Zoom)
//       const onMouseDown = (event) => {
//         isDragging = true;
//         lastX = event.clientX;
//         lastY = event.clientY;
//       };

//       const onMouseMove = (event) => {
//         if (!isDragging || !textMesh) return;
//         let deltaX = (event.clientX - lastX) * 0.01;
//         let deltaY = (event.clientY - lastY) * 0.01;

//         textMesh.rotation.y += deltaX;
//         textMesh.rotation.x += deltaY;

//         lastX = event.clientX;
//         lastY = event.clientY;
//       };

//       const onMouseUp = () => {
//         isDragging = false;
//       };

//       const onWheel = (event) => {
//         if (!textMesh) return;
//         scaleFactor += event.deltaY * -0.001;
//         scaleFactor = Math.max(0.1, Math.min(2, scaleFactor));
//         textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//       };

//       // Touch event for mobile rotation
//       const onTouchMove = (event) => {
//         if (!isDragging || !textMesh || event.touches.length !== 1) return;
//         let touch = event.touches[0];
//         let deltaX = (touch.clientX - lastX) * 0.01;
//         let deltaY = (touch.clientY - lastY) * 0.01;

//         textMesh.rotation.y += deltaX;
//         textMesh.rotation.x += deltaY;

//         lastX = touch.clientX;
//         lastY = touch.clientY;
//       };

//       // ✅ Add Event Listeners
//       renderer.domElement.addEventListener("mousedown", onMouseDown);
//       renderer.domElement.addEventListener("mousemove", onMouseMove);
//       renderer.domElement.addEventListener("mouseup", onMouseUp);
//       renderer.domElement.addEventListener("wheel", onWheel);

//       // Touch events for mobile
//       renderer.domElement.addEventListener("touchstart", (event) => {
//         isDragging = true;
//         lastX = event.touches[0].clientX;
//         lastY = event.touches[0].clientY;
//       });

//       renderer.domElement.addEventListener("touchmove", onTouchMove);
//       renderer.domElement.addEventListener("touchend", () => {
//         isDragging = false;
//       });

//       // ✅ Animation Loop
//       const animate = () => {
//         requestAnimationFrame(animate);
//         if (arToolkitSource?.ready) {
//           arToolkitContext.update(arToolkitSource.domElement);
//         }
//         renderer.render(scene, camera);
//       };

//       animate();
//     } catch (error) {
//       console.error("AR Initialization Error:", error);
//       setArSupported(false);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {loading && arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           Loading AR text...
//         </div>
//       )}
//       {!arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "red",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           AR not supported on this device.
//         </div>
//       )}
//       <div
//         ref={mountRef}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           zIndex: -1,
//         }}
//       />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// // import {
// //   ArToolkitSource,
// //   ArToolkitContext,
// // } from "@ar-js-org/ar.js/three.js/build/ar-threex";
// // ARButton for immersive AR (WebXR)
// import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   // immersiveSupported: null => checking, true => immersive AR available, false => not supported
//   const [immersiveSupported, setImmersiveSupported] = useState(null);
//   const rendererRef = useRef(null);
//   const arButtonRef = useRef(null);
//   let onResizeHandler = null;

//   // Check for immersive AR (WebXR) support
//   useEffect(() => {
//     const checkXRSupport = async () => {
//       if (navigator.xr && navigator.xr.isSessionSupported) {
//         try {
//           const supported = await navigator.xr.isSessionSupported("immersive-ar");
//           setImmersiveSupported(supported);
//         } catch (e) {
//           console.error("XR support check error:", e);
//           setImmersiveSupported(false);
//         }
//       } else {
//         setImmersiveSupported(false);
//       }
//     };
//     checkXRSupport();
//   }, []);

//   // Initialize immersive AR scene only if supported
//   useEffect(() => {
//     if (immersiveSupported === null) return; // Still checking support

//     // Agar AR supported nahin hai, to hum AR scene initialize nahin karte.
//     if (!immersiveSupported) return;

//     let scene, camera, renderer, textMesh;
//     let hitTestSource = null;
//     let hitTestSourceRequested = false;
//     let isDragging = false;
//     let lastX = 0,
//       lastY = 0,
//       scaleFactor = 1;

//     // Function to load 3D text – aap in properties ko dynamic bana sakte hain
//     const loadText = (onLoaded) => {
//       const fontLoader = new FontLoader();
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Hello AR!", {
//           font: font,
//           size: 0.02, // Default size; can be made dynamic
//           height: 0.05, // Default height; can be changed dynamically
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });
//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0xff0000, // Default color; change dynamically as needed
//         });
//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         // Default position (if hit test not available, text remains here)
//         textMesh.position.set(0, -0.5, -1.5);
//         textMesh.castShadow = true;
//         // Initially text is hidden until surface is detected
//         textMesh.visible = false;
//         scene.add(textMesh);
//         onLoaded();
//       });
//     };

//     // Gesture controls: drag, rotate & zoom
//     const addGestureControls = () => {
//       const domElement = renderer.domElement;
//       const onMouseDown = (event) => {
//         isDragging = true;
//         lastX = event.clientX;
//         lastY = event.clientY;
//       };
//       const onMouseMove = (event) => {
//         if (!isDragging || !textMesh) return;
//         let deltaX = (event.clientX - lastX) * 0.01;
//         let deltaY = (event.clientY - lastY) * 0.01;
//         textMesh.rotation.y += deltaX;
//         textMesh.rotation.x += deltaY;
//         lastX = event.clientX;
//         lastY = event.clientY;
//       };
//       const onMouseUp = () => {
//         isDragging = false;
//       };
//       const onWheel = (event) => {
//         if (!textMesh) return;
//         scaleFactor += event.deltaY * -0.001;
//         scaleFactor = Math.max(0.1, Math.min(2, scaleFactor));
//         textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//       };
//       const onTouchStart = (event) => {
//         isDragging = true;
//         lastX = event.touches[0].clientX;
//         lastY = event.touches[0].clientY;
//       };
//       const onTouchMove = (event) => {
//         if (!isDragging || !textMesh || event.touches.length !== 1) return;
//         let touch = event.touches[0];
//         let deltaX = (touch.clientX - lastX) * 0.01;
//         let deltaY = (touch.clientY - lastY) * 0.01;
//         textMesh.rotation.y += deltaX;
//         textMesh.rotation.x += deltaY;
//         lastX = touch.clientX;
//         lastY = touch.clientY;
//       };
//       const onTouchEnd = () => {
//         isDragging = false;
//       };
//       domElement.addEventListener("mousedown", onMouseDown);
//       domElement.addEventListener("mousemove", onMouseMove);
//       domElement.addEventListener("mouseup", onMouseUp);
//       domElement.addEventListener("wheel", onWheel);
//       domElement.addEventListener("touchstart", onTouchStart);
//       domElement.addEventListener("touchmove", onTouchMove);
//       domElement.addEventListener("touchend", onTouchEnd);
//     };

//     // Initialize immersive AR branch using WebXR
//     const initImmersiveAR = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.01,
//         1000
//       );
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.xr.enabled = true;
//       rendererRef.current = renderer;
//       mountRef.current.appendChild(renderer.domElement);

//       // Add ARButton to initiate AR session
//       arButtonRef.current = ARButton.createButton(renderer, {
//         requiredFeatures: ["hit-test"],
//       });

//       // Add basic lighting
//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       // Load 3D text and add gesture controls after loading
//       loadText(() => {
//         setLoading(false);
//         addGestureControls();
//       });

//       // Animation loop with hit-test for surface detection
//       renderer.setAnimationLoop((time, frame) => {
//         if (frame) {
//           const session = renderer.xr.getSession();
//           if (session && !hitTestSourceRequested) {
//             session
//               .requestReferenceSpace("viewer")
//               .then((referenceSpace) => {
//                 session
//                   .requestHitTestSource({ space: referenceSpace })
//                   .then((source) => {
//                     hitTestSource = source;
//                   });
//               })
//               .catch((err) => {
//                 console.error("Hit test source error:", err);
//               });
//             hitTestSourceRequested = true;
//           }
//           if (hitTestSource && frame && textMesh) {
//             const referenceSpace = renderer.xr.getReferenceSpace();
//             const hitTestResults = frame.getHitTestResults(hitTestSource);
//             if (hitTestResults.length > 0) {
//               const hit = hitTestResults[0];
//               const pose = hit.getPose(referenceSpace);
//               if (pose) {
//                 textMesh.visible = true;
//                 textMesh.position.set(
//                   pose.transform.position.x,
//                   pose.transform.position.y,
//                   pose.transform.position.z
//                 );
//               }
//             } else {
//               // Agar koi hit test result nahin, to text ko hide kar sakte hain
//               textMesh.visible = false;
//             }
//           }
//         }
//         renderer.render(scene, camera);
//       });
//     };

//     initImmersiveAR();

//     // Cleanup on unmount
//     return () => {
//       if (rendererRef.current) {
//         rendererRef.current.dispose();
//         if (mountRef.current && rendererRef.current.domElement) {
//           mountRef.current.removeChild(rendererRef.current.domElement);
//         }
//       }
//       if (arButtonRef.current && arButtonRef.current.parentNode) {
//         arButtonRef.current.parentNode.removeChild(arButtonRef.current);
//       }
//       if (onResizeHandler) {
//         window.removeEventListener("resize", onResizeHandler);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [immersiveSupported]);

//   // Handlers for popup buttons when AR is not supported
//   const handleGoBack = () => {
//     window.history.back();
//   };

//   const handlePlayStore = () => {
//     window.location.href =
//       "https://play.google.com/store/apps/details?id=com.google.ar.core";
//   };

//   return (
//     <div>
//       {/* Loading overlay for AR-supported devices */}
//       {loading && immersiveSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           Loading AR text...
//         </div>
//       )}
//       {/* Popup for devices without AR support */}
//       {immersiveSupported === false && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.9)",
//             padding: "20px",
//             borderRadius: "10px",
//             textAlign: "center",
//           }}
//         >
//           <p>AR is not supported on this device.</p>
//           <button
//             onClick={handleGoBack}
//             style={{ margin: "10px", padding: "10px 20px" }}
//           >
//             Go Back
//           </button>
//           <button
//             onClick={handlePlayStore}
//             style={{ margin: "10px", padding: "10px 20px" }}
//           >
//             Get ARCore
//           </button>
//         </div>
//       )}
//       <div
//         ref={mountRef}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//         }}
//       />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import {
//   ArToolkitSource,
//   ArToolkitContext,
// } from "@ar-js-org/ar.js/three.js/build/ar-threex";
// // ARButton for immersive AR (WebXR)
// import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   // immersiveSupported: null => checking, true => immersive AR available, false => fallback mode
//   const [immersiveSupported, setImmersiveSupported] = useState(null);
//   const rendererRef = useRef(null);
//   const arButtonRef = useRef(null);
//   let onResizeHandler = null;

//   // XR support check
//   useEffect(() => {
//     const checkXRSupport = async () => {
//       if (navigator.xr && navigator.xr.isSessionSupported) {
//         try {
//           const supported = await navigator.xr.isSessionSupported("immersive-ar");
//           setImmersiveSupported(supported);
//         } catch (e) {
//           console.error("XR support check error:", e);
//           setImmersiveSupported(false);
//         }
//       } else {
//         setImmersiveSupported(false);
//       }
//     };
//     checkXRSupport();
//   }, []);

//   useEffect(() => {
//     if (immersiveSupported === null) return; // Still checking support

//     let scene, camera, renderer, textMesh;
//     let hitTestSource = null;
//     let hitTestSourceRequested = false;
//     let scaleFactor = 1;

//     // Function to load 3D text – adjust properties as needed
//     const loadText = (onLoaded) => {
//       const fontLoader = new FontLoader();
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Hello AR!", {
//           font: font,
//           size: 0.2, // Default size (can be dynamic)
//           height: 0.07,
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });
//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0xff0000, // Default color (can be dynamic)
//         });
//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         if (immersiveSupported) {
//           // Immersive branch: default position until hit-test updates it
//           textMesh.position.set(0, -0.5, -1.5);
//           textMesh.visible = false; // Hide until surface detected
//         } else {
//           // Fallback branch: fixed default position in front of camera
//           textMesh.position.set(0, 0, -2);
//           textMesh.visible = true;
//         }
//         textMesh.castShadow = true;
//         scene.add(textMesh);
//         onLoaded();
//       });
//     };

//     // Updated gesture controls using pointer events
//     // Single pointer: translation and rotation; Two pointers: pinch-to-zoom
//     const addGestureControls = () => {
//       const domElement = renderer.domElement;
//       const activePointers = new Map();
//       let lastSinglePointer = { x: 0, y: 0 };
//       let initialPinchDistance = 0;
//       let initialScale = scaleFactor;

//       // Sensitivity factors – adjust these values as needed
//       const translationFactor = 0.005;
//       const rotationFactor = 0.01;

//       const pointerDownHandler = (event) => {
//         activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
//         if (activePointers.size === 1) {
//           lastSinglePointer = { x: event.clientX, y: event.clientY };
//         } else if (activePointers.size === 2) {
//           // When a second pointer is added, calculate initial pinch distance
//           const points = Array.from(activePointers.values());
//           initialPinchDistance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
//           initialScale = scaleFactor;
//         }
//       };

//       const pointerMoveHandler = (event) => {
//         if (!activePointers.has(event.pointerId)) return;
//         activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

//         if (activePointers.size === 1) {
//           // Single pointer: translation & rotation
//           const deltaX = event.clientX - lastSinglePointer.x;
//           const deltaY = event.clientY - lastSinglePointer.y;
//           // Update translation
//           textMesh.position.x += deltaX * translationFactor;
//           textMesh.position.y -= deltaY * translationFactor;
//           // Update rotation (horizontal movement rotates about Y-axis)
//           textMesh.rotation.y += deltaX * rotationFactor;
//           lastSinglePointer = { x: event.clientX, y: event.clientY };
//         } else if (activePointers.size === 2) {
//           // Two pointers: pinch-to-zoom
//           const points = Array.from(activePointers.values());
//           const currentDistance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
//           const scaleChange = currentDistance / initialPinchDistance;
//           scaleFactor = initialScale * scaleChange;
//           textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         }
//       };

//       const pointerUpHandler = (event) => {
//         activePointers.delete(event.pointerId);
//         if (activePointers.size < 2) {
//           initialPinchDistance = 0;
//         }
//       };

//       domElement.addEventListener("pointerdown", pointerDownHandler);
//       domElement.addEventListener("pointermove", pointerMoveHandler);
//       domElement.addEventListener("pointerup", pointerUpHandler);
//       domElement.addEventListener("pointercancel", pointerUpHandler);
//     };

//     // ---------- Immersive AR Branch (WebXR) ----------
//     const initImmersiveAR = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.01,
//         1000
//       );
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.xr.enabled = true;
//       rendererRef.current = renderer;
//       mountRef.current.appendChild(renderer.domElement);

//       arButtonRef.current = ARButton.createButton(renderer, {
//         requiredFeatures: ["hit-test"],
//       });

//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       loadText(() => {
//         setLoading(false);
//         addGestureControls();
//       });

//       renderer.setAnimationLoop((time, frame) => {
//         if (frame) {
//           const session = renderer.xr.getSession();
//           if (session && !hitTestSourceRequested) {
//             session
//               .requestReferenceSpace("viewer")
//               .then((referenceSpace) => {
//                 session
//                   .requestHitTestSource({ space: referenceSpace })
//                   .then((source) => {
//                     hitTestSource = source;
//                   });
//               })
//               .catch((err) => {
//                 console.error("Hit test source error:", err);
//               });
//             hitTestSourceRequested = true;
//           }
//           if (hitTestSource && frame && textMesh) {
//             const referenceSpace = renderer.xr.getReferenceSpace();
//             const hitTestResults = frame.getHitTestResults(hitTestSource);
//             if (hitTestResults.length > 0) {
//               const hit = hitTestResults[0];
//               const pose = hit.getPose(referenceSpace);
//               if (pose) {
//                 textMesh.visible = true;
//                 textMesh.position.set(
//                   pose.transform.position.x,
//                   pose.transform.position.y,
//                   pose.transform.position.z
//                 );
//               }
//             } else {
//               textMesh.visible = false;
//             }
//           }
//         }
//         renderer.render(scene, camera);
//       });
//     };

//     // ---------- Fallback AR Branch (ARToolkit with getUserMedia) ----------
//     const initFallbackAR = async () => {
//       if (!navigator.mediaDevices?.getUserMedia) {
//         console.error("getUserMedia supported nahin hai.");
//         return;
//       }
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.01,
//         1000
//       );
//       camera.position.set(0, 0, 3);
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.domElement.style.position = "absolute";
//       renderer.domElement.style.zIndex = "2";
//       rendererRef.current = renderer;
//       mountRef.current.appendChild(renderer.domElement);

//       const arToolkitSource = new ArToolkitSource({
//         sourceType: "webcam",
//         sourceWidth: window.innerWidth,
//         sourceHeight: window.innerHeight,
//       });
//       const arToolkitContext = new ArToolkitContext({
//         cameraParametersUrl: "/camera_para.dat",
//         detectionMode: "mono",
//       });

//       await new Promise((resolve) => {
//         arToolkitSource.init(() => {
//           arToolkitSource.onResizeElement();
//           arToolkitSource.copyElementSizeTo(renderer.domElement);
//           if (arToolkitSource.domElement) {
//             arToolkitSource.domElement.style.position = "absolute";
//             arToolkitSource.domElement.style.top = "0";
//             arToolkitSource.domElement.style.left = "0";
//             arToolkitSource.domElement.style.width = "100vw";
//             arToolkitSource.domElement.style.height = "112vh";
//             arToolkitSource.domElement.style.objectFit = "cover";
//             arToolkitSource.domElement.style.zIndex = "1";
//           }
//           if (
//             mountRef.current &&
//             arToolkitSource.domElement.parentNode !== mountRef.current
//           ) {
//             if (arToolkitSource.domElement.parentNode) {
//               arToolkitSource.domElement.parentNode.removeChild(arToolkitSource.domElement);
//             }
//             mountRef.current.appendChild(arToolkitSource.domElement);
//           }
//           resolve();
//         });
//       });

//       onResizeHandler = () => {
//         arToolkitSource.onResize();
//         arToolkitSource.copyElementSizeTo(renderer.domElement);
//       };
//       window.addEventListener("resize", onResizeHandler);

//       await new Promise((resolve) => {
//         arToolkitContext.init(() => {
//           setTimeout(() => {
//             camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
//             resolve();
//           }, 5000);
//         });
//       });

//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       loadText(() => {
//         setLoading(false);
//         addGestureControls();
//       });

//       const animate = () => {
//         requestAnimationFrame(animate);
//         if (arToolkitSource.ready) {
//           arToolkitContext.update(arToolkitSource.domElement);
//         }
//         renderer.render(scene, camera);
//       };
//       animate();
//     };

//     if (immersiveSupported) {
//       initImmersiveAR();
//     } else {
//       initFallbackAR();
//     }

//     return () => {
//       if (rendererRef.current) {
//         rendererRef.current.dispose();
//         if (mountRef.current && rendererRef.current.domElement) {
//           mountRef.current.removeChild(rendererRef.current.domElement);
//         }
//       }
//       if (arButtonRef.current && arButtonRef.current.parentNode) {
//         arButtonRef.current.parentNode.removeChild(arButtonRef.current);
//       }
//       if (onResizeHandler) {
//         window.removeEventListener("resize", onResizeHandler);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [immersiveSupported]);

//   return (
//     <div>
//       {loading && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           Loading AR text...
//         </div>
//       )}
//       <div
//         ref={mountRef}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//         }}
//       />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import {
//   ArToolkitSource,
//   ArToolkitContext,
// } from "@ar-js-org/ar.js/three.js/build/ar-threex";
// import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

// function ARTextDisplay() {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [immersiveSupported, setImmersiveSupported] = useState(null);
//   const rendererRef = useRef(null);
//   const arButtonRef = useRef(null);
//   let onResizeHandler = null;

//   // 1) Check if immersive AR is supported
//   useEffect(() => {
//     const checkXRSupport = async () => {
//       if (navigator.xr && navigator.xr.isSessionSupported) {
//         try {
//           const supported = await navigator.xr.isSessionSupported("immersive-ar");
//           setImmersiveSupported(supported);
//         } catch (e) {
//           console.error("XR support check error:", e);
//           setImmersiveSupported(false);
//         }
//       } else {
//         setImmersiveSupported(false);
//       }
//     };
//     checkXRSupport();
//   }, []);

//   useEffect(() => {
//     if (immersiveSupported === null) return; // Still checking support

//     let scene, camera, renderer, textMesh;
//     let hitTestSource = null;
//     let hitTestSourceRequested = false;
//     let scaleFactor = 1;

//     // 2) Load 3D Text
//     const loadText = (onLoaded) => {
//       const fontLoader = new FontLoader();
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Metaverse!", {
//           font: font,
//           size: 0.2,
//           height: 0.07,
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });
//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0x0000ff,
//         });
//         textMesh = new THREE.Mesh(textGeometry, textMaterial);

//         // If immersive AR => hide until plane detection success
//         if (immersiveSupported) {
//           textMesh.position.set(0, -0.5, -1.5);
//           textMesh.visible = false;
//         } else {
//           // fallback => static position
//           textMesh.position.set(0, 0, -2);
//           textMesh.visible = true;
//         }
//         textMesh.castShadow = true;
//         scene.add(textMesh);
//         onLoaded();
//       });
//     };

//     // 3) Gesture Controls (translation + rotation + pinch-to-zoom)
//     const addGestureControls = () => {
//       const domElement = renderer.domElement;
//       const activePointers = new Map();
//       let lastSinglePointer = { x: 0, y: 0 };
//       let initialPinchDistance = 0;
//       let initialScale = scaleFactor;

//       const translationFactor = 0.005;
//       const rotationFactor = 0.01;

//       const pointerDownHandler = (event) => {
//         activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
//         // single pointer or second pointer for pinch?
//         if (activePointers.size === 1) {
//           lastSinglePointer = { x: event.clientX, y: event.clientY };
//         } else if (activePointers.size === 2) {
//           const points = Array.from(activePointers.values());
//           initialPinchDistance = Math.hypot(
//             points[0].x - points[1].x,
//             points[0].y - points[1].y
//           );
//           initialScale = scaleFactor;
//         }
//       };

//       const pointerMoveHandler = (event) => {
//         if (!activePointers.has(event.pointerId) || !textMesh) return;
//         activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

//         // single pointer => translation + rotation
//         if (activePointers.size === 1) {
//           const deltaX = event.clientX - lastSinglePointer.x;
//           const deltaY = event.clientY - lastSinglePointer.y;
//           // translation (move x, y)
//           textMesh.position.x += deltaX * translationFactor;
//           textMesh.position.y -= deltaY * translationFactor;
//           // rotation (horizontal drag => Y-axis rotate)
//           textMesh.rotation.y += deltaX * rotationFactor;

//           lastSinglePointer = { x: event.clientX, y: event.clientY };
//         }
//         // two pointers => pinch to zoom
//         else if (activePointers.size === 2) {
//           const points = Array.from(activePointers.values());
//           const currentDistance = Math.hypot(
//             points[0].x - points[1].x,
//             points[0].y - points[1].y
//           );
//           const scaleChange = currentDistance / initialPinchDistance;
//           scaleFactor = initialScale * scaleChange;
//           textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         }
//       };

//       const pointerUpHandler = (event) => {
//         activePointers.delete(event.pointerId);
//         if (activePointers.size < 2) {
//           initialPinchDistance = 0;
//         }
//       };

//       domElement.addEventListener("pointerdown", pointerDownHandler);
//       domElement.addEventListener("pointermove", pointerMoveHandler);
//       domElement.addEventListener("pointerup", pointerUpHandler);
//       domElement.addEventListener("pointercancel", pointerUpHandler);
//     };

//     // 4) Immersive AR Branch
//     const initImmersiveAR = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.01,
//         1000
//       );
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.xr.enabled = true;
//       rendererRef.current = renderer;
//       mountRef.current.appendChild(renderer.domElement);

//       // ARButton for plane detection
//       arButtonRef.current = ARButton.createButton(renderer, {
//         requiredFeatures: ["hit-test"],
//       });

//       // Lighting
//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       loadText(() => {
//         setLoading(false);
//         addGestureControls();
//       });

//       // Hit-test for plane detection
//       renderer.setAnimationLoop((time, frame) => {
//         if (frame) {
//           const session = renderer.xr.getSession();
//           if (session && !hitTestSourceRequested) {
//             session
//               .requestReferenceSpace("viewer")
//               .then((referenceSpace) => {
//                 session
//                   .requestHitTestSource({ space: referenceSpace })
//                   .then((source) => {
//                     hitTestSource = source;
//                   });
//               })
//               .catch((err) => {
//                 console.error("Hit test source error:", err);
//               });
//             hitTestSourceRequested = true;
//           }
//           if (hitTestSource && frame && textMesh) {
//             const referenceSpace = renderer.xr.getReferenceSpace();
//             const hitTestResults = frame.getHitTestResults(hitTestSource);
//             if (hitTestResults.length > 0) {
//               const hit = hitTestResults[0];
//               const pose = hit.getPose(referenceSpace);
//               if (pose) {
//                 textMesh.visible = true;
//                 textMesh.position.set(
//                   pose.transform.position.x,
//                   pose.transform.position.y,
//                   pose.transform.position.z
//                 );
//               }
//             } else {
//               textMesh.visible = false;
//             }
//           }
//         }
//         renderer.render(scene, camera);
//       });
//     };

//     // 5) Fallback AR (Marker-based, no plane detection)
//     const initFallbackAR = async () => {
//       if (!navigator.mediaDevices?.getUserMedia) {
//         console.error("getUserMedia not supported.");
//         return;
//       }
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.01,
//         1000
//       );
//       camera.position.set(0, 0, 3);
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.domElement.style.position = "absolute";
//       renderer.domElement.style.zIndex = "2";
//       rendererRef.current = renderer;
//       mountRef.current.appendChild(renderer.domElement);

//       const arToolkitSource = new ArToolkitSource({
//         sourceType: "webcam",
//         sourceWidth: window.innerWidth,
//         sourceHeight: window.innerHeight,
//       });
//       const arToolkitContext = new ArToolkitContext({
//         cameraParametersUrl: "/camera_para.dat",
//         detectionMode: "mono",
//       });

//       await new Promise((resolve) => {
//         arToolkitSource.init(() => {
//           arToolkitSource.onResizeElement();
//           arToolkitSource.copyElementSizeTo(renderer.domElement);
//           if (arToolkitSource.domElement) {
//             arToolkitSource.domElement.style.position = "absolute";
//             arToolkitSource.domElement.style.top = "0";
//             arToolkitSource.domElement.style.left = "0";
//             arToolkitSource.domElement.style.width = "100vw";
//             arToolkitSource.domElement.style.height = "100vh";
//             arToolkitSource.domElement.style.objectFit = "cover";
//             arToolkitSource.domElement.style.zIndex = "1";
//           }
//           if (
//             mountRef.current &&
//             arToolkitSource.domElement.parentNode !== mountRef.current
//           ) {
//             if (arToolkitSource.domElement.parentNode) {
//               arToolkitSource.domElement.parentNode.removeChild(
//                 arToolkitSource.domElement
//               );
//             }
//             mountRef.current.appendChild(arToolkitSource.domElement);
//           }
//           resolve();
//         });
//       });

//       onResizeHandler = () => {
//         arToolkitSource.onResize();
//         arToolkitSource.copyElementSizeTo(renderer.domElement);
//       };
//       window.addEventListener("resize", onResizeHandler);

//       await new Promise((resolve) => {
//         arToolkitContext.init(() => {
//           setTimeout(() => {
//             camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
//             resolve();
//           }, 5000);
//         });
//       });

//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       loadText(() => {
//         setLoading(false);
//         addGestureControls();
//       });

//       const animate = () => {
//         requestAnimationFrame(animate);
//         if (arToolkitSource.ready) {
//           arToolkitContext.update(arToolkitSource.domElement);
//         }
//         renderer.render(scene, camera);
//       };
//       animate();
//     };

//     // Branch init
//     if (immersiveSupported) {
//       initImmersiveAR();
//     } else {
//       initFallbackAR();
//     }

//     // Cleanup
//     return () => {
//       if (rendererRef.current) {
//         rendererRef.current.dispose();
//         if (mountRef.current && rendererRef.current.domElement) {
//           mountRef.current.removeChild(rendererRef.current.domElement);
//         }
//       }
//       if (arButtonRef.current && arButtonRef.current.parentNode) {
//         arButtonRef.current.parentNode.removeChild(arButtonRef.current);
//       }
//       if (onResizeHandler) {
//         window.removeEventListener("resize", onResizeHandler);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [immersiveSupported]);

//   return (
//     <div>
//       {loading && (
//         <div class="centered-loader">
//           Loading AR text...
//         </div>
//       )}
//       <div ref={mountRef} class="ar-mount" />
//     </div>
//   );
// }

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [arSupported, setArSupported] = useState(null); // true => immersive AR supported, false => not supported
//   const rendererRef = useRef(null);
//   const arButtonRef = useRef(null);

//   // XR support check (immersive AR)
//   useEffect(() => {
//     async function checkXRSupport() {
//       if (navigator.xr && navigator.xr.isSessionSupported) {
//         try {
//           const supported = await navigator.xr.isSessionSupported("immersive-ar");
//           setArSupported(supported);
//         } catch (e) {
//           console.error("XR support check error:", e);
//           setArSupported(false);
//         }
//       } else {
//         setArSupported(false);
//       }
//     }
//     checkXRSupport();
//   }, []);

//   useEffect(() => {
//     if (arSupported === null) return; // Still checking support

//     // If AR not supported, do nothing (we will show popup)
//     if (!arSupported) return;

//     let scene, camera, renderer, textMesh;
//     let hitTestSource = null;
//     let hitTestSourceRequested = false;
//     let scaleFactor = 1;

//     // Load 3D Text
//     const loadText = (onLoaded) => {
//       const fontLoader = new FontLoader();
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Hello AR!", {
//           font: font,
//           size: 0.2,
//           height: 0.07,
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });
//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0x0000ff,
//         });
//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         // Start hidden until plane detected
//         textMesh.position.set(0, -0.5, -1.5);
//         textMesh.visible = false;
//         textMesh.castShadow = true;
//         scene.add(textMesh);
//         onLoaded();
//       });
//     };

//     // Gesture Controls (pointer events)
//     const addGestureControls = () => {
//       const domElement = renderer.domElement;
//       const activePointers = new Map();
//       let lastSinglePointer = { x: 0, y: 0 };
//       let initialPinchDistance = 0;
//       let initialScale = scaleFactor;

//       const translationFactor = 0.005;
//       const rotationFactor = 0.01;

//       const pointerDownHandler = (event) => {
//         activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
//         if (activePointers.size === 1) {
//           lastSinglePointer = { x: event.clientX, y: event.clientY };
//         } else if (activePointers.size === 2) {
//           const points = Array.from(activePointers.values());
//           initialPinchDistance = Math.hypot(
//             points[0].x - points[1].x,
//             points[0].y - points[1].y
//           );
//           initialScale = scaleFactor;
//         }
//       };

//       const pointerMoveHandler = (event) => {
//         if (!activePointers.has(event.pointerId) || !textMesh) return;
//         activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

//         // single pointer => translate + rotate
//         if (activePointers.size === 1) {
//           const deltaX = event.clientX - lastSinglePointer.x;
//           const deltaY = event.clientY - lastSinglePointer.y;
//           // translate
//           textMesh.position.x += deltaX * translationFactor;
//           textMesh.position.y -= deltaY * translationFactor;
//           // rotate (horizontal movement => y-axis)
//           textMesh.rotation.y += deltaX * rotationFactor;
//           lastSinglePointer = { x: event.clientX, y: event.clientY };
//         }
//         // two pointers => pinch zoom
//         else if (activePointers.size === 2) {
//           const points = Array.from(activePointers.values());
//           const currentDistance = Math.hypot(
//             points[0].x - points[1].x,
//             points[0].y - points[1].y
//           );
//           const scaleChange = currentDistance / initialPinchDistance;
//           scaleFactor = initialScale * scaleChange;
//           textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         }
//       };

//       const pointerUpHandler = (event) => {
//         activePointers.delete(event.pointerId);
//         if (activePointers.size < 2) {
//           initialPinchDistance = 0;
//         }
//       };

//       domElement.addEventListener("pointerdown", pointerDownHandler);
//       domElement.addEventListener("pointermove", pointerMoveHandler);
//       domElement.addEventListener("pointerup", pointerUpHandler);
//       domElement.addEventListener("pointercancel", pointerUpHandler);
//     };

//     // Initialize Immersive AR
//     let sceneCleanup = () => {};
//     const initImmersiveAR = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.01,
//         1000
//       );
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.xr.enabled = true;
//       rendererRef.current = renderer;
//       mountRef.current.appendChild(renderer.domElement);

//       // AR Button
//       arButtonRef.current = ARButton.createButton(renderer, {
//         requiredFeatures: ["hit-test"], // plane detection
//       });

//       // Lighting
//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       loadText(() => {
//         setLoading(false);
//         addGestureControls();
//       });

//       // Hit-test loop
//       renderer.setAnimationLoop((time, frame) => {
//         if (frame) {
//           const session = renderer.xr.getSession();
//           if (session && !hitTestSourceRequested) {
//             session
//               .requestReferenceSpace("viewer")
//               .then((referenceSpace) => {
//                 session
//                   .requestHitTestSource({ space: referenceSpace })
//                   .then((source) => {
//                     hitTestSource = source;
//                   });
//               })
//               .catch((err) => {
//                 console.error("Hit test source error:", err);
//               });
//             hitTestSourceRequested = true;
//           }
//           if (hitTestSource && frame && textMesh) {
//             const referenceSpace = renderer.xr.getReferenceSpace();
//             const hitTestResults = frame.getHitTestResults(hitTestSource);
//             if (hitTestResults.length > 0) {
//               const hit = hitTestResults[0];
//               const pose = hit.getPose(referenceSpace);
//               if (pose) {
//                 textMesh.visible = true;
//                 textMesh.position.set(
//                   pose.transform.position.x,
//                   pose.transform.position.y,
//                   pose.transform.position.z
//                 );
//               }
//             } else {
//               textMesh.visible = false;
//             }
//           }
//         }
//         renderer.render(scene, camera);
//       });

//       // Cleanup function
//       sceneCleanup = () => {
//         if (renderer) renderer.dispose();
//         if (mountRef.current && renderer.domElement) {
//           mountRef.current.removeChild(renderer.domElement);
//         }
//         if (arButtonRef.current && arButtonRef.current.parentNode) {
//           arButtonRef.current.parentNode.removeChild(arButtonRef.current);
//         }
//       };
//     };

//     initImmersiveAR();

//     // Cleanup on unmount
//     return () => {
//       sceneCleanup();
//     };
//   }, [arSupported]);

//   // Handlers for "AR not supported" popup
//   const handleGoBack = () => {
//     window.history.back();
//   };
//   const handleGetARCore = () => {
//     // Redirect to ARCore on Play Store
//     window.location.href =
//       "https://play.google.com/store/apps/details?id=com.google.ar.core";
//   };

//   return (
//     <div>
//       {loading && arSupported && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.7)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           Loading AR text...
//         </div>
//       )}
//       {/* If AR not supported, show popup */}
//       {arSupported === false && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1000,
//             color: "#fff",
//             background: "rgba(0,0,0,0.9)",
//             padding: "20px",
//             borderRadius: "10px",
//             textAlign: "center",
//           }}
//         >
//           <p>AR not supported on this device.</p>
//           <button onClick={handleGoBack} style={{ margin: "10px", padding: "10px 20px" }}>
//             Go Back
//           </button>
//           <button onClick={handleGetARCore} style={{ margin: "10px", padding: "10px 20px" }}>
//             Get ARCore
//           </button>
//         </div>
//       )}
//       <div
//         ref={mountRef}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//         }}
//       />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [arSupported, setArSupported] = useState(null);
//   const rendererRef = useRef(null);
//   const arButtonRef = useRef(null);

//   useEffect(() => {
//     async function checkXRSupport() {
//       if (navigator.xr && navigator.xr.isSessionSupported) {
//         try {
//           const supported = await navigator.xr.isSessionSupported("immersive-ar");
//           setArSupported(supported);
//         } catch (e) {
//           console.error("XR support check error:", e);
//           setArSupported(false);
//         }
//       } else {
//         setArSupported(false);
//       }
//     }
//     checkXRSupport();
//   }, []);

//   const startWebXR = () => {
//     if (!arSupported) return;
//     let scene, camera, renderer, textMesh;

//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
//     scene.add(camera);

//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.xr.enabled = true;
//     rendererRef.current = renderer;
//     mountRef.current.appendChild(renderer.domElement);

//     arButtonRef.current = ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] });

//     const ambientLight = new THREE.AmbientLight(0x404040, 2);
//     scene.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 10, 5);
//     scene.add(directionalLight);

//     const fontLoader = new FontLoader();
//     fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//       const textGeometry = new TextGeometry("Hello AR!", {
//         font: font,
//         size: 0.2,
//         height: 0.07,
//         bevelEnabled: true,
//         bevelThickness: 0.02,
//         bevelSize: 0.01,
//       });
//       textGeometry.center();
//       const textMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
//       textMesh = new THREE.Mesh(textGeometry, textMaterial);
//       textMesh.position.set(0, -0.5, -1.5);
//       scene.add(textMesh);
//     });

//     renderer.setAnimationLoop(() => {
//       renderer.render(scene, camera);
//     });

//     return () => {
//       renderer.dispose();
//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       if (arButtonRef.current && arButtonRef.current.parentNode) {
//         arButtonRef.current.parentNode.removeChild(arButtonRef.current);
//       }
//     };
//   };

//   const handleGetARCore = () => {
//     window.location.href = "https://play.google.com/store/apps/details?id=com.google.ar.core";
//   };

//   return (
//     <div>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <button
//           onClick={startWebXR}
//           disabled={!arSupported}
//           style={{
//             padding: "10px 20px",
//             margin: "10px",
//             fontSize: "16px",
//             cursor: arSupported ? "pointer" : "not-allowed",
//             backgroundColor: arSupported ? "#007bff" : "#ccc",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//           }}
//         >
//           Start WebXR
//         </button>
//         <button
//           onClick={handleGetARCore}
//           style={{
//             padding: "10px 20px",
//             margin: "10px",
//             fontSize: "16px",
//             cursor: "pointer",
//             backgroundColor: "#28a745",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//           }}
//         >
//           Open ARCore
//         </button>
//       </div>
//       <div ref={mountRef} />
//     </div>
//   );
// };

// export default ARTextDisplay;

// import React from "react";
// import { Canvas } from "react-three-fiber";
// import { Text } from "@react-three/drei";

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { FontLoader } from "three-stdlib";
// import { TextGeometry } from "three-stdlib";
// import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
// import { Scene, Entity } from "aframe-react";

// const ARTextDisplay = () => {
//   const mountRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [arSupported, setArSupported] = useState(null);
//   const rendererRef = useRef(null);
//   const arButtonRef = useRef(null);

//   const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
//   const isAndroid = /Android/.test(navigator.userAgent);

//   useEffect(() => {
//     async function checkXRSupport() {
//       if (navigator.xr && navigator.xr.isSessionSupported) {
//         try {
//           const supported = await navigator.xr.isSessionSupported("immersive-ar");
//           setArSupported(supported);
//         } catch (e) {
//           console.error("XR support check error:", e);
//           setArSupported(false);
//         }
//       } else {
//         setArSupported(false);
//       }
//     }
//     checkXRSupport();
//   }, []);

//   useEffect(() => {
//     if (arSupported === null) return;
//     if (!arSupported) return;

//     let scene, camera, renderer, textMesh;
//     let hitTestSource = null;
//     let hitTestSourceRequested = false;
//     let scaleFactor = 1;

//     const loadText = (onLoaded) => {
//       const fontLoader = new FontLoader();
//       fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
//         const textGeometry = new TextGeometry("Hello AR!", {
//           font: font,
//           size: 0.2,
//           height: 0.07,
//           bevelEnabled: true,
//           bevelThickness: 0.02,
//           bevelSize: 0.01,
//         });
//         textGeometry.center();
//         const textMaterial = new THREE.MeshStandardMaterial({
//           color: 0x0000ff,
//         });
//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         textMesh.position.set(0, -0.5, -1.5);
//         textMesh.visible = false;
//         textMesh.castShadow = true;
//         scene.add(textMesh);
//         onLoaded();
//       });
//     };

//     const addGestureControls = () => {
//       const domElement = renderer.domElement;
//       const activePointers = new Map();
//       let lastSinglePointer = { x: 0, y: 0 };
//       let initialPinchDistance = 0;
//       let initialScale = scaleFactor;

//       const translationFactor = 0.005;
//       const rotationFactor = 0.01;

//       const pointerDownHandler = (event) => {
//         activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
//         if (activePointers.size === 1) {
//           lastSinglePointer = { x: event.clientX, y: event.clientY };
//         } else if (activePointers.size === 2) {
//           const points = Array.from(activePointers.values());
//           initialPinchDistance = Math.hypot(
//             points[0].x - points[1].x,
//             points[0].y - points[1].y
//           );
//           initialScale = scaleFactor;
//         }
//       };

//       const pointerMoveHandler = (event) => {
//         if (!activePointers.has(event.pointerId) || !textMesh) return;
//         activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

//         if (activePointers.size === 1) {
//           const deltaX = event.clientX - lastSinglePointer.x;
//           const deltaY = event.clientY - lastSinglePointer.y;
//           textMesh.position.x += deltaX * translationFactor;
//           textMesh.position.y -= deltaY * translationFactor;
//           textMesh.rotation.y += deltaX * rotationFactor;
//           lastSinglePointer = { x: event.clientX, y: event.clientY };
//         } else if (activePointers.size === 2) {
//           const points = Array.from(activePointers.values());
//           const currentDistance = Math.hypot(
//             points[0].x - points[1].x,
//             points[0].y - points[1].y
//           );
//           const scaleChange = currentDistance / initialPinchDistance;
//           scaleFactor = initialScale * scaleChange;
//           textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         }
//       };

//       const pointerUpHandler = (event) => {
//         activePointers.delete(event.pointerId);
//         if (activePointers.size < 2) {
//           initialPinchDistance = 0;
//         }
//       };

//       domElement.addEventListener("pointerdown", pointerDownHandler);
//       domElement.addEventListener("pointermove", pointerMoveHandler);
//       domElement.addEventListener("pointerup", pointerUpHandler);
//       domElement.addEventListener("pointercancel", pointerUpHandler);
//     };

//     let sceneCleanup = () => {};
//     const initImmersiveAR = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.01,
//         1000
//       );
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.xr.enabled = true;
//       rendererRef.current = renderer;
//       mountRef.current.appendChild(renderer.domElement);

//       arButtonRef.current = ARButton.createButton(renderer, {
//         requiredFeatures: ["hit-test"],
//       });

//       const ambientLight = new THREE.AmbientLight(0x404040, 2);
//       scene.add(ambientLight);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 5);
//       scene.add(directionalLight);

//       loadText(() => {
//         setLoading(false);
//         addGestureControls();
//       });

//       renderer.setAnimationLoop((time, frame) => {
//         if (frame) {
//           const session = renderer.xr.getSession();
//           if (session && !hitTestSourceRequested) {
//             session
//               .requestReferenceSpace("viewer")
//               .then((referenceSpace) => {
//                 session
//                   .requestHitTestSource({ space: referenceSpace })
//                   .then((source) => {
//                     hitTestSource = source;
//                   });
//               })
//               .catch((err) => {
//                 console.error("Hit test source error:", err);
//               });
//             hitTestSourceRequested = true;
//           }
//           if (hitTestSource && frame && textMesh) {
//             const referenceSpace = renderer.xr.getReferenceSpace();
//             const hitTestResults = frame.getHitTestResults(hitTestSource);
//             if (hitTestResults.length > 0) {
//               const hit = hitTestResults[0];
//               const pose = hit.getPose(referenceSpace);
//               if (pose) {
//                 textMesh.visible = true;
//                 textMesh.position.set(
//                   pose.transform.position.x,
//                   pose.transform.position.y,
//                   pose.transform.position.z
//                 );
//               }
//             } else {
//               textMesh.visible = false;
//             }
//           }
//         }
//         renderer.render(scene, camera);
//       });

//       sceneCleanup = () => {
//         if (renderer) renderer.dispose();
//         if (mountRef.current && renderer.domElement) {
//           mountRef.current.removeChild(renderer.domElement);
//         }
//         if (arButtonRef.current && arButtonRef.current.parentNode) {
//           arButtonRef.current.parentNode.removeChild(arButtonRef.current);
//         }
//       };
//     };

//     initImmersiveAR();

//     return () => {
//       sceneCleanup();
//     };
//   }, [arSupported]);

//   const handleGoBack = () => {
//     window.history.back();
//   };
//   const handleGetARCore = () => {
//     window.location.href =
//       "https://play.google.com/store/apps/details?id=com.google.ar.core";
//   };

//   if (isAndroid) {
//     return (
//       <div>
//         <Scene embedded arjs>
//           <Entity
//             text={{ value: "Hello AR", color: "#0000ff", align: "center" }}
//             position="0 0.5 -1"
//             scale="1 1 1"
//           />
//           <Entity camera />
//         </Scene>
//       </div>
//     );
//   }

//   if (isIOS) {
//     return (
//       <div>
//         {loading && arSupported && (
//           <div
//             style={{
//               position: "fixed",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               zIndex: 1000,
//               color: "#fff",
//               background: "rgba(0,0,0,0.7)",
//               padding: "10px",
//               borderRadius: "5px",
//             }}
//           >
//             Loading AR text...
//           </div>
//         )}
//         {arSupported === false && (
//           <div
//             style={{
//               position: "fixed",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               zIndex: 1000,
//               color: "#fff",
//               background: "rgba(0,0,0,0.9)",
//               padding: "20px",
//               borderRadius: "10px",
//               textAlign: "center",
//             }}
//           >
//             <p>AR not supported on this device.</p>
//             <button onClick={handleGoBack} style={{ margin: "10px", padding: "10px 20px" }}>
//               Go Back
//             </button>
//             <button onClick={handleGetARCore} style={{ margin: "10px", padding: "10px 20px" }}>
//               Get ARCore
//             </button>
//           </div>
//         )}
//         <div
//           ref={mountRef}
//           style={{
//             width: "100vw",
//             height: "100vh",
//             position: "fixed",
//             top: 0,
//             left: 0,
//           }}
//         />
//       </div>
//     );
//   }

//   return null;
// };

// export default ARTextDisplay;


// ARView.js
import React, { useEffect, useState } from 'react';
import '@google/model-viewer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ARTextDisplay = () => {
  const { id } = useParams();
  // Static model URL (GLB format)
  // const modelUrl = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  const modelUrl = "/9b1d1090.glb";

  const [modelData, setModelData] = useState(null);
  console.log(modelData, "data modell aa gia")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`);
        console.log(response, "response aa gia model ka")
        setModelData(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
      } catch (err) {
        setError("Failed to fetch model");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchModel();
    }
  }, [id]);

  if (loading) return <p>Loading AR Model...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Device detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isDesktop = !isIOS && !isAndroid; // Desktop devices

  return (
    <div>
      <h1>AR Text Display</h1>

      {/* AR Button for iOS */}
      {isIOS && (
        <a
          href={modelData.replace('.glb', '.usdz')} // Convert GLB to USDZ for iOS
          rel="ar"
          style={{
            display: 'inline-block',
            backgroundColor: '#007AFF',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            margin: '10px',
          }}
        >
          Open in AR (iOS)
        </a>
      )}

      {/* WebAR Button for Android */}
      {isAndroid && (
        <model-viewer
          src={modelData}
          ar
          ar-modes="webxr scene-viewer" // WebXR aur Scene Viewer dono enable karein
          camera-controls
          style={{ width: '100%', height: '500px' }}
        >
          <button
            slot="ar-button"
            style={{
              backgroundColor: '#007AFF',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              margin: '10px',
            }}
          >
            Open in WebAR (Android)
          </button>
        </model-viewer>
      )}

      {/* 3D Model Viewer for Desktop */}
      {isDesktop && (
        <model-viewer
          src={modelData}
          camera-controls
          auto-rotate
          style={{ width: '100%', height: '500px' }}
        >
          <button
            slot="ar-button"
            style={{
              backgroundColor: '#007AFF',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              margin: '10px',
            }}
          >
            View 3D Model
          </button>
        </model-viewer>
      )}
    </div>
  );
};

export default ARTextDisplay;

