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
// import React, { useEffect, useRef, useState } from 'react';
// // import '@google/model-viewer';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ARTextDisplay = () => {
//   const { id } = useParams();
//   // Static model URL (GLB format)
//   // const modelUrl = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
//   const modelUrl = "/9b1d1090.glb";

//   const [modelData, setModelData] = useState(null);
//   const [modelUsdz, setModelUsdz] = useState(null);
//   const [video, setVideo] = useState();
//   console.log(modelData, modelUsdz, "data model")
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchModel = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`);
//         console.log(response, "response model")
//         setModelData(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
//         setModelUsdz(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_usdz}`);
//         setVideo(`${import.meta.env.VITE_DOMAIN}/uploads/${response.data.data.type_name}`);
//       } catch (err) {
//         setError("Failed to fetch model");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchModel();
//     }
//   }, [id]);

//   if (loading) return <p>Loading AR Model...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   // Device detection
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
//   const isAndroid = /Android/.test(navigator.userAgent);
//   const isDesktop = !isIOS && !isAndroid; // Desktop devices



//   const modelViewerRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isModelLoaded, setIsModelLoaded] = useState(false);

//   useEffect(() => {
//     const modelViewer = modelViewerRef.current;
//     const video = videoRef.current;

//     if (!modelViewer || !video) return;

//     const handleARStatus = (event) => {
//       if (event.detail.status === 'session-started') {
//         video.play().catch(e => console.error('Video play failed:', e));
//       } else if (event.detail.status === 'session-ended') {
//         video.pause();
//       }
//     };

//     const handleModelLoad = () => {
//       setIsModelLoaded(true);
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             video.play().catch(e => console.error('Video play failed:', e));
//           } else {
//             video.pause();
//           }
//         });
//       }, { threshold: 0.5 });
//       observer.observe(modelViewer);
//     };

//     modelViewer.addEventListener('ar-status', handleARStatus);
//     modelViewer.addEventListener('load', handleModelLoad);

//     return () => {
//       modelViewer.removeEventListener('ar-status', handleARStatus);
//       modelViewer.removeEventListener('load', handleModelLoad);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>AR Text Display</h1>

//       {/* AR Button for iOS */}
//       {isIOS && (
//         <a
//           href={modelUsdz} // Convert GLB to USDZ for iOS
//           rel="ar"
//           style={{
//             display: 'inline-block',
//             backgroundColor: '#007AFF',
//             color: '#fff',
//             padding: '10px 20px',
//             borderRadius: '5px',
//             textDecoration: 'none',
//             margin: '10px',
//           }}
//         >
//           Open in AR (iOS)
//         </a>
//       )}

//       {/* WebAR Button for Android */}
//       {isAndroid && (
//         <model-viewer
//           src={modelData}
//           ar
//           ar-modes="webxr scene-viewer"
//           camera-controls
//           style={{ width: '100%', height: '500px' }}
//         >
//           <button
//             slot="ar-button"
//             style={{
//               backgroundColor: '#007AFF',
//               color: '#fff',
//               padding: '10px 20px',
//               borderRadius: '5px',
//               border: 'none',
//               cursor: 'pointer',
//               margin: '10px',
//             }}
//           >
//             Open in WebAR (Android)
//           </button>
//         </model-viewer>
//       )}

//       {/* 3D Model Viewer for Desktop */}
//       {isDesktop && (
//         <model-viewer
//           src={modelData}
//           camera-controls
//           auto-rotate
//           style={{ width: '100%', height: '500px' }}
//         >
//           <button
//             slot="ar-button"
//             style={{
//               backgroundColor: '#007AFF',
//               color: '#fff',
//               padding: '10px 20px',
//               borderRadius: '5px',
//               border: 'none',
//               cursor: 'pointer',
//               margin: '10px',
//             }}
//           >
//             View 3D Model
//           </button>
//         </model-viewer>
//       )}

//       <div style={styles.videoContainer}>
//         <model-viewer
//           ref={modelViewerRef}
//           src={modelData}
//           // ios-src={usdzUrl}
//           ar
//           ar-modes="webxr scene-viewer quick-look"
//           environment-image="neutral"
//           camera-controls
//           auto-rotate
//           xr-environment
//           shadow-intensity="1"
//           style={styles.modelViewer}
//         >
//           <button slot="ar-button" >
//             View in AR
//           </button>

//           <div slot="video-overlay" style={styles.videoOverlay}>
//             <video
//               ref={videoRef}
//               controls
//               autoPlay
//               loop
//               muted
//               playsInline
//               style={isModelLoaded ? styles.visibleVideo : styles.hiddenVideo}
//             >
//               <source src={video} type="video/mp4" />
//             </video>
//           </div>
//         </model-viewer>
//       </div>
//     </div>
//   );
// };


// const styles = {
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//   },
//   videoContainer: {
//     margin: '20px 0',
//   },
//   modelViewer: {
//     width: '100%',
//     height: '500px',
//     backgroundColor: '#f0f0f0',
//     '--progress-bar-color': '#4285f4',
//     '--progress-bar-height': '8px',
//     '--poster-color': 'transparent',
//   },
//   arButton: {
//     background: '#4285f4',
//     color: 'white',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     margin: '10px 0',
//     fontSize: '16px',
//     position: 'absolute',
//     bottom: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//   },
//   videoOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     pointerEvents: 'none',
//   },
//   visibleVideo: {
//     display: 'block',
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
//   hiddenVideo: {
//     display: 'none',
//   },
// };

// export default ARTextDisplay;


// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ARTextDisplay = () => {
//   const { id } = useParams();
//   const [modelData, setModelData] = useState(null);
//   const [modelUsdz, setModelUsdz] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Device detection - moved inside component
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
//   const isAndroid = /Android/.test(navigator.userAgent);
//   const isDesktop = !isIOS && !isAndroid;

//   // Model viewer hooks - these must be called unconditionally
//   const modelViewerRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isModelLoaded, setIsModelLoaded] = useState(false);

//   useEffect(() => {
//     const fetchModel = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`);
//         setModelData(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
//         setModelUsdz(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_usdz}`);
//         setVideo(`${import.meta.env.VITE_DOMAIN}/uploads/${response.data.data.type_name}`);
//       } catch (err) {
//         setError("Failed to fetch model");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchModel();
//     }
//   }, [id]);

//   useEffect(() => {
//     const modelViewer = modelViewerRef.current;
//     const video = videoRef.current;

//     if (!modelViewer || !video) return;

//     const handleARStatus = (event) => {
//       if (event.detail.status === 'session-started') {
//         video.play().catch(e => console.error('Video play failed:', e));
//       } else if (event.detail.status === 'session-ended') {
//         video.pause();
//       }
//     };

//     const handleModelLoad = () => {
//       setIsModelLoaded(true);
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             video.play().catch(e => console.error('Video play failed:', e));
//           } else {
//             video.pause();
//           }
//         });
//       }, { threshold: 0.5 });
//       observer.observe(modelViewer);
//     };

//     modelViewer.addEventListener('ar-status', handleARStatus);
//     modelViewer.addEventListener('load', handleModelLoad);

//     return () => {
//       modelViewer.removeEventListener('ar-status', handleARStatus);
//       modelViewer.removeEventListener('load', handleModelLoad);
//     };
//   }, []);

//   if (loading) return <p>Loading AR Model...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={styles.container}>
//       <h1>AR Text Display</h1>

//       <div style={styles.videoContainer}>
//         <model-viewer
//           ref={modelViewerRef}
//           src={modelData}
//           ios-src={modelUsdz}
//           ar
//           ar-modes={`webxr ${isAndroid ? 'scene-viewer' : ''} ${isIOS ? 'quick-look' : ''}`}
//           environment-image="neutral"
//           camera-controls
//           auto-rotate
//           xr-environment
//           shadow-intensity="1"
//           style={styles.modelViewer}
//         >
//           <button slot="ar-button" style={styles.arButton}>
//             View in AR
//           </button>

//           <div slot="video-overlay" style={styles.videoOverlay}>
//             <video
//               ref={videoRef}
//               controls
//               autoPlay
//               loop
//               muted
//               playsInline
//               style={isModelLoaded ? styles.visibleVideo : styles.hiddenVideo}
//             >
//               <source src={video} type="video/mp4" />
//             </video>
//           </div>
//         </model-viewer>
//       </div>

//       {/* Fallback AR buttons for specific devices */}
//       {isIOS && modelUsdz && (
//         <a
//           href={modelUsdz}
//           rel="ar"
//           style={{
//             display: 'inline-block',
//             backgroundColor: '#007AFF',
//             color: '#fff',
//             padding: '10px 20px',
//             borderRadius: '5px',
//             textDecoration: 'none',
//             margin: '10px',
//           }}
//         >
//           Open in AR (iOS)
//         </a>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//   },
//   videoContainer: {
//     margin: '20px 0',
//   },
//   modelViewer: {
//     width: '100%',
//     height: '500px',
//     backgroundColor: '#f0f0f0',
//     '--progress-bar-color': '#4285f4',
//     '--progress-bar-height': '8px',
//     '--poster-color': 'transparent',
//   },
//   arButton: {
//     background: '#4285f4',
//     color: 'white',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     margin: '10px 0',
//     fontSize: '16px',
//     position: 'absolute',
//     bottom: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//   },
//   videoOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     pointerEvents: 'none',
//   },
//   visibleVideo: {
//     display: 'block',
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
//   hiddenVideo: {
//     display: 'none',
//   },
// };

// export default ARTextDisplay;


// import React, { useEffect, useState } from 'react';
// // import '@google/model-viewer'; // Uncomment if needed
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ARTextDisplay = () => {
//   const { id } = useParams();

//   const [modelData, setModelData] = useState(null);
//   const [modelUsdz, setModelUsdz] = useState(null);
//   const [videoPath, setVideoPath] = useState(null);
//   console.log(videoPath)
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchModel = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`);
//         const data = response.data.data;
//         setModelData(`${import.meta.env.VITE_DOMAIN}/${data.model_path}`);
//         setModelUsdz(`${import.meta.env.VITE_DOMAIN}/${data.model_usdz}`);
//         setVideoPath(`${import.meta.env.VITE_DOMAIN}/uploads/${data.type_name}`); // Assuming `type_name` is video filename
//       } catch (err) {
//         setError("Failed to fetch model");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchModel();
//     }
//   }, [id]);

//   if (loading) return <p>Loading AR Model...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
//   const isAndroid = /Android/.test(navigator.userAgent);
//   const isDesktop = !isIOS && !isAndroid;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>AR Text Display</h1>

//       {isIOS && (
//         <a
//           href={modelUsdz}
//           rel="ar"
//           style={{
//             display: 'inline-block',
//             backgroundColor: '#007AFF',
//             color: '#fff',
//             padding: '10px 20px',
//             borderRadius: '5px',
//             textDecoration: 'none',
//             margin: '10px',
//           }}
//         >
//           Open in AR (iOS)
//         </a>
//       )}

//       {(isAndroid || isDesktop) && (
//         <model-viewer
//           src={modelData}
//           ar={isAndroid}
//           ar-modes={isAndroid ? "webxr scene-viewer" : undefined}
//           camera-controls
//           auto-rotate
//           style={{ width: '100%', height: '500px' }}
//         >
//           {isAndroid && (
//             <button
//               slot="ar-button"
//               style={{
//                 backgroundColor: '#007AFF',
//                 color: '#fff',
//                 padding: '10px 20px',
//                 borderRadius: '5px',
//                 border: 'none',
//                 cursor: 'pointer',
//                 margin: '10px',
//               }}
//             >
//               Open in WebAR (Android)
//             </button>
//           )}
//         </model-viewer>
//       )}

//       {videoPath && (
//         <video
//           src={videoPath}
//           controls
//           autoplay
//           muted
//           loop
//           playsinline
//           style={{position:"absolute",
//     top: "50%",
//     left: "50%",
//     width: "300px",
//     transform: "translate(-50%, -50%)",
//     zIndex: "5"}}
//         />
//       )}
//     </div>
//   );
// };

// export default ARTextDisplay;



// CheekAR.js

/* global MindARThree */ // Add this comment to let linter know

// import { useEffect } from 'react';
// import 'aframe';
// import 'mind-ar/dist/mindar-face-aframe.prod.js';

// function ARTextDisplay() {
//   useEffect(() => {
//     // This ensures AFRAME and MindAR are properly initialized
//     if (window.AFRAME) {
//       console.log('AFRAME is loaded');
//     }
//   }, []);

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <a-scene
//         mindar-face
//         embedded
//         color-space="sRGB"
//         renderer="colorManagement: true, physicallyCorrectLights"
//         vr-mode-ui="enabled: false"
//         device-orientation-permission-ui="enabled: true"
//       >
//         <a-assets>
//           <a-asset-item id="cheeksModel" src="/models/7_04a23ce0.glb"></a-asset-item>
//         </a-assets>

//         <a-camera active="true"
//             position="0 0 0"
//             look-controls="enabled: false"
//             wasd-controls="enabled: false"></a-camera>

//         <a-entity mindar-face-target="anchorIndex: 1">
//           <a-gltf-model 
//             id="cheek-glb" 
//             rotation="0 0 0" 
//             scale="0.05 0.05 0.05" 
//             position="0 0 0" 
//             src="#cheeksModel"
//           ></a-gltf-model>
//         </a-entity>
//       </a-scene>
//     </div>
//   );
// }

// export default ARTextDisplay;






// import React, { useEffect, useRef } from 'react';

// const ARFaceFilter = () => {
//   const sceneRef = useRef(null);
//   const cheekLogoUrl = '/model/avrotuen7-removebg-preview.png'; // Your cheek logo

//   useEffect(() => {
//     const initAR = async () => {
//       // 1. Create Full-Screen AR Scene
//       const scene = document.createElement('a-scene');
//       scene.setAttribute('mindar-face', `
//         embedded: true;
//         uiLoading: no;
//         uiError: no;
//         uiScanning: no;
//       `);
//       scene.setAttribute('renderer', 'antialias: true; alpha: true');
//       scene.style.position = 'absolute';
//       scene.style.width = '100%';
//       scene.style.height = '100%';

//       // 2. Add Camera (Hidden)
//       const camera = document.createElement('a-camera');
//       camera.setAttribute('active', 'false');
//       camera.setAttribute('position', '0 0 0');
//       scene.appendChild(camera);

//       // 3. Create Face Anchor Entity
//       const faceAnchor = document.createElement('a-entity');
//       faceAnchor.setAttribute('mindar-face-target', 'anchorIndex: 168'); // Face center

//       // 4. Left Cheek Logo (Perfectly Fixed)
//       const leftCheek = document.createElement('a-image');
//       leftCheek.setAttribute('position', '-0.18 -0.12 0.08'); // Perfect left cheek position
//       leftCheek.setAttribute('width', '0.25');
//       leftCheek.setAttribute('height', '0.25');
//       leftCheek.setAttribute('src', cheekLogoUrl);
//       leftCheek.setAttribute('material', 'transparent: true; shader: flat');
//       leftCheek.setAttribute('rotation', '0 0 0');

//       // 5. Right Cheek Logo (Perfectly Fixed)
//       const rightCheek = document.createElement('a-image');
//       rightCheek.setAttribute('position', '0.18 -0.12 0.08'); // Perfect right cheek position
//       rightCheek.setAttribute('width', '0.25');
//       rightCheek.setAttribute('height', '0.25');
//       rightCheek.setAttribute('src', cheekLogoUrl);
//       rightCheek.setAttribute('material', 'transparent: true; shader: flat');
//       rightCheek.setAttribute('rotation', '0 0 0');

//       // 6. Disable All Movement
//       [leftCheek, rightCheek].forEach(cheek => {
//         cheek.setAttribute('static-body', '');
//         cheek.setAttribute('mindar-face-rotation', 'enabled: false');
//         cheek.setAttribute('mindar-face-scale', 'enabled: false');
//       });

//       // 7. Build Scene Hierarchy
//       faceAnchor.appendChild(leftCheek);
//       faceAnchor.appendChild(rightCheek);
//       scene.appendChild(faceAnchor);

//       // 8. Prevent All Drag/Touch Events
//       scene.addEventListener('loaded', () => {
//         const renderer = scene.renderer;
//         renderer.domElement.style.touchAction = 'none';
//         renderer.domElement.style.userSelect = 'none';
//         renderer.domElement.onpointerdown = (e) => e.preventDefault();
//       });

//       sceneRef.current.appendChild(scene);
//     };

//     initAR();

//     return () => {
//       if (sceneRef.current) sceneRef.current.innerHTML = '';
//     };
//   }, [cheekLogoUrl]);

//   return (
//     <div style={{
//       width: '100vw',
//       height: '100vh',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       overflow: 'hidden',
//       touchAction: 'none'
//     }}>
//       <div ref={sceneRef} style={{
//         width: '100%',
//         height: '100%',
//         position: 'absolute'
//       }} />
//     </div>
//   );
// };

// export default ARFaceFilter;








// video

// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ARTextDisplay = () => {
//   const { id } = useParams();
//   const [modelData, setModelData] = useState(null);
//   const [modelUsdz, setModelUsdz] = useState(null);
//   const [videoUrl, setVideoUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Refs and state for video control
//   const modelViewerRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isModelLoaded, setIsModelLoaded] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

//   // Device detection
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
//   const isAndroid = /Android/.test(navigator.userAgent);
//   const isMobile = isIOS || isAndroid;

//   useEffect(() => {
//     const fetchModel = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`);
//         setModelData(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
//         setModelUsdz(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_usdz}`);
//         setVideoUrl(`${import.meta.env.VITE_DOMAIN}/uploads/${response.data.data.type_name}`);
//       } catch (err) {
//         setError("Failed to fetch model data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchModel();
//   }, [id]);

//   useEffect(() => {
//     const modelViewer = modelViewerRef.current;
//     const video = videoRef.current;

//     if (!modelViewer || !video || !videoUrl) return;

//     const handleVideoPlay = () => setIsVideoPlaying(true);
//     const handleVideoPause = () => setIsVideoPlaying(false);

//     // For desktop - auto-play when model is visible
//     if (!isMobile) {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               video.play().catch(e => console.error('Desktop video play failed:', e));
//             } else {
//               video.pause();
//             }
//           });
//         },
//         { threshold: 0.5 }
//       );
//       observer.observe(modelViewer);
//     }

//     // For AR sessions (mobile)
//     const handleARStatus = (event) => {
//       if (event.detail.status === 'session-started') {
//         video.play().catch(e => console.error('AR video play failed:', e));
//       } else if (event.detail.status === 'session-ended') {
//         video.pause();
//       }
//     };

//     video.addEventListener('play', handleVideoPlay);
//     video.addEventListener('pause', handleVideoPause);
//     modelViewer.addEventListener('ar-status', handleARStatus);
//     modelViewer.addEventListener('load', () => setIsModelLoaded(true));

//     return () => {
//       video.removeEventListener('play', handleVideoPlay);
//       video.removeEventListener('pause', handleVideoPause);
//       modelViewer.removeEventListener('ar-status', handleARStatus);
//     };
//   }, [videoUrl, isMobile]);

//   if (loading) return <div className="loading">Loading AR Model...</div>;
//   if (error) return <div className="error" style={{ color: "red" }}>{error}</div>;

//   return (
//     <div className="ar-container">
//       <h1>AR Video Experience</h1>

//       <div className="model-viewer-container">
//         <model-viewer
//           ref={modelViewerRef}
//           src={modelData}
//           ios-src={modelUsdz}
//           ar={isMobile} // Only enable AR for mobile devices
//           ar-modes={isMobile ? "webxr scene-viewer quick-look" : ""}
//           environment-image="neutral"
//           camera-controls
//           auto-rotate
//           xr-environment
//           shadow-intensity="1"
//           style={{ width: '100%', height: '500px' }}
//         >
//           {isMobile && (
//             <button slot="ar-button" className="ar-button">
//               View in AR
//             </button>
//           )}

//           <div className="video-overlay">
//             <video
//               ref={videoRef}
//               controls
//               autoPlay={!isMobile} // Auto-play only for desktop
//               loop
//               muted
//               playsInline
//               style={{
//                 display: isModelLoaded ? 'block' : 'none',
//                 opacity: isVideoPlaying ? 1 : 0.7
//               }}
//             >
//               <source src={videoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </model-viewer>
//       </div>

//       {/* Manual play button for desktop */}
//       {!isMobile && videoUrl && (
//         <button 
//           className="video-control-button"
//           onClick={() => {
//             if (videoRef.current) {
//               videoRef.current.paused 
//                 ? videoRef.current.play().catch(e => console.error(e))
//                 : videoRef.current.pause();
//             }
//           }}
//         >
//           {isVideoPlaying ? 'Pause Video' : 'Play Video'}
//         </button>
//       )}
//     </div>
//   );
// };

// // CSS Styles (can be moved to separate CSS file)
// const styles = `
//   .ar-container {
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 20px;
//     font-family: Arial, sans-serif;
//   }

//   .model-viewer-container {
//     position: relative;
//     width: 100%;
//     height: 500px;
//     margin: 20px 0;
//   }

//   .video-overlay {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     pointer-events: none;
//   }

//   .video-overlay video {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: opacity 0.3s ease;
//   }

//   .ar-button {
//     position: absolute;
//     bottom: 20px;
//     left: 50%;
//     transform: translateX(-50%);
//     background: #4285f4;
//     color: white;
//     padding: 10px 20px;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     z-index: 10;
//   }

//   .video-control-button {
//     display: block;
//     margin: 10px auto;
//     padding: 10px 20px;
//     background: #34a853;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//   }
// `;

// // Add styles to document head
// const styleElement = document.createElement('style');
// styleElement.innerHTML = styles;
// document.head.appendChild(styleElement);

// export default ARTextDisplay;



// import React, { useRef, useEffect, useState } from 'react';
// import { FaceMesh } from '@mediapipe/face_mesh';
// import { Camera } from '@mediapipe/camera_utils';

// const ARFaceFilter = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);
//   const faceMeshRef = useRef(null);
//   const cameraRef = useRef(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [capturedData, setCapturedData] = useState(null);
//   const [isCameraReady, setIsCameraReady] = useState(false);

//   // High-quality logo image
//   const logoImage = useRef(new Image());
//   const [isImageLoaded, setIsImageLoaded] = useState(false);

//   useEffect(() => {
//     logoImage.current.onload = () => {
//       setIsImageLoaded(true);
//     };
//     logoImage.current.src = '/model/avrotuen7-removebg-preview.png';
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     const setCanvasSize = () => {
//       if (canvas) {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//       }
//     };

//     setCanvasSize();
//     window.addEventListener('resize', setCanvasSize);

//     const faceMesh = new FaceMesh({
//       locateFile: (file) =>
//         `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
//     });

//     faceMesh.setOptions({
//       maxNumFaces: 1,
//       refineLandmarks: true,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });

//     faceMeshRef.current = faceMesh;

//     faceMesh.onResults((results) => {
//       if (!canvas || !isImageLoaded) return;
//       const ctx = canvas.getContext('2d');

//       ctx.save();
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.translate(canvas.width, 0);
//       ctx.scale(-1, 1);
//       ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

//       if (results.multiFaceLandmarks.length > 0) {
//         const landmarks = results.multiFaceLandmarks[0];

//         // Corrected cheek landmarks
//         const leftCheek = landmarks[116]; // Better cheek position
//         const rightCheek = landmarks[345]; // Better cheek position
//         const noseTip = landmarks[4];
//         const chin = landmarks[152];

//         // Calculate face proportions
//         const faceHeight = Math.abs(noseTip.y - chin.y) * canvas.height;
//         const faceWidth = Math.abs(landmarks[454].x - landmarks[234].x) * canvas.width;
//         const logoSize = faceHeight * 0.3; // Increased size

//         const drawLogo = (cheekPoint, isRightCheek = false) => {
//           let x = cheekPoint.x * canvas.width;
//           let y = cheekPoint.y * canvas.height;

//           // Adjust position to be more centered on cheek
//           const inwardOffset = faceWidth * 0.05;
//           x += isRightCheek ? -inwardOffset : inwardOffset;

//           // Move down to proper cheek position
//           const downwardOffset = faceHeight * 0.15;
//           y += downwardOffset;

//           ctx.save();

//           // Apply perspective correction
//           const noseX = noseTip.x * canvas.width;
//           const perspectiveOffset = (x - noseX) * 0.02;
//           x -= perspectiveOffset;

//           if (isRightCheek) {
//             ctx.translate(x, y);
//             ctx.scale(-1, 1);
//             ctx.translate(-x, -y);
//           }

//           // High quality rendering
//           ctx.globalAlpha = 0.95;
//           ctx.imageSmoothingEnabled = true;
//           ctx.imageSmoothingQuality = 'high';

//           ctx.drawImage(
//             logoImage.current,
//             x - logoSize/2,
//             y - logoSize/2,
//             logoSize,
//             logoSize
//           );

//           ctx.restore();
//         };

//         drawLogo(leftCheek, false);
//         drawLogo(rightCheek, true);
//       }

//       ctx.restore();
//     });

//     if (video) {
//       const camera = new Camera(video, {
//         onFrame: async () => {
//           try {
//             await faceMesh.send({ image: video });
//             setIsCameraReady(true);
//           } catch (error) {
//             console.error('FaceMesh error:', error);
//           }
//         },
//         width: 1280,
//         height: 720,
//       });

//       camera.start();
//       cameraRef.current = camera;
//     }

//     return () => {
//       window.removeEventListener('resize', setCanvasSize);
//       if (cameraRef.current) {
//         cameraRef.current.stop();
//       }
//       if (faceMeshRef.current) {
//         faceMeshRef.current.close();
//       }
//     };
//   }, [isImageLoaded]);

//   const captureImage = () => {
//     if (!canvasRef.current) return;
//     const dataUrl = canvasRef.current.toDataURL('image/png');
//     setCapturedData(dataUrl);
//     setShowModal(true);
//   };

//   const startRecording = () => {
//     if (!canvasRef.current) return;

//     recordedChunksRef.current = [];
//     const stream = canvasRef.current.captureStream(30);

//     mediaRecorderRef.current = new MediaRecorder(stream, {
//       mimeType: 'video/webm'
//     });

//     mediaRecorderRef.current.ondataavailable = (e) => {
//       if (e.data.size > 0) {
//         recordedChunksRef.current.push(e.data);
//       }
//     };

//     mediaRecorderRef.current.onstop = () => {
//       const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
//       const videoUrl = URL.createObjectURL(blob);
//       setCapturedData(videoUrl);
//       setShowModal(true);
//     };

//     mediaRecorderRef.current.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const toggleRecording = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const downloadFile = () => {
//     if (!capturedData) return;

//     const link = document.createElement('a');
//     link.href = capturedData;

//     if (capturedData.startsWith('data:image')) {
//       link.download = 'face-filter-image.png';
//     } else {
//       link.download = 'face-filter-video.webm';
//     }

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowModal(false);
//   };

//   return (
//     <div
//       style={{
//         position: 'relative',
//         width: '100vw',
//         height: '100vh',
//         overflow: 'hidden',
//         backgroundColor: 'black',
//       }}
//     >
//       {!isCameraReady && (
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           color: 'white',
//           zIndex: 100,
//           backgroundColor: 'rgba(0,0,0,0.7)'
//         }}>
//           Loading camera...
//         </div>
//       )}

//       <video ref={videoRef} style={{ display: 'none' }} playsInline muted />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           objectFit: 'cover',
//         }}
//       />

//       <div style={{
//         position: 'absolute',
//         bottom: '20px',
//         left: 0,
//         right: 0,
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '20px',
//         zIndex: 10
//       }}>
//         <button
//           onClick={captureImage}
//           disabled={!isCameraReady}
//           style={{
//             width: '60px',
//             height: '60px',
//             borderRadius: '50%',
//             backgroundColor: 'white',
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             opacity: isCameraReady ? 1 : 0.5
//           }}
//         >
//           <span style={{ fontSize: '24px' }}>📷</span>
//         </button>

//         <button
//           onClick={toggleRecording}
//           disabled={!isCameraReady}
//           style={{
//             width: '60px',
//             height: '60px',
//             borderRadius: '50%',
//             backgroundColor: isRecording ? 'red' : 'white',
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             opacity: isCameraReady ? 1 : 0.5
//           }}
//         >
//           <span style={{ fontSize: '24px' }}>
//             {isRecording ? '⏹️' : '🎥'}
//           </span>
//         </button>
//       </div>

//       {showModal && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.8)',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '10px',
//             maxWidth: '90%',
//             maxHeight: '90%',
//             overflow: 'auto'
//           }}>
//             {capturedData?.startsWith('data:image') ? (
//               <img
//                 src={capturedData}
//                 alt="Captured"
//                 style={{ maxWidth: '100%', maxHeight: '70vh' }}
//               />
//             ) : (
//               <video
//                 src={capturedData}
//                 controls
//                 autoPlay
//                 style={{ maxWidth: '100%', maxHeight: '70vh' }}
//               />
//             )}

//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               marginTop: '20px',
//               gap: '10px'
//             }}>
//               <button
//                 onClick={downloadFile}
//                 style={{
//                   padding: '10px 20px',
//                   backgroundColor: '#4CAF50',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Download
//               </button>

//               <button
//                 onClick={() => setShowModal(false)}
//                 style={{
//                   padding: '10px 20px',
//                   backgroundColor: '#f44336',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ARFaceFilter;



// ARVideo.jsx
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ZapparCanvas,
  ZapparCamera,
  InstantWorldTracker,
  InstantWorldAnchor
} from "@zappar/zappar-react-three-fiber";

const ARFaceFilter = () => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <ZapparCanvas>
      <ZapparCamera />
      <InstantWorldTracker>
        <InstantWorldAnchor>
          {/* Video Texture on a Plane */}
          <mesh position={[0, 0, -5]}>
            <planeBufferGeometry args={[1.78, 1]} />
            <meshBasicMaterial>
              <videoTexture
                attach="map"
                args={[videoRef.current]}
                encoding={3001}
              />
            </meshBasicMaterial>
          </mesh>
        </InstantWorldAnchor>
      </InstantWorldTracker>

      {/* Hidden Video Element */}
      <video
        ref={videoRef}
        src="/model/VID-20240812-WA0001.mp4"
        loop
        muted
        autoPlay
        playsInline
        style={{ display: "none" }}
      />
    </ZapparCanvas>
  );
};

export default ARFaceFilter;




// import { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

// const ARFaceFilter = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [faceDetected, setFaceDetected] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('dog');

//   const filters = {
//     dog: { url: '/model/7_04a23ce0.glb', scale: 0.1 },
//     glasses: { url: '/model/7_04a23ce0.glb', scale: 0.15 }
//   };

//   useEffect(() => {
//     let faceLandmarker;
//     let animationId;
//     let scene, camera, renderer;
//     const loadedModels = {};

//     const initCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             facingMode: 'user',
//             width: { ideal: 1280 },
//             height: { ideal: 720 }
//           }
//         });

//         videoRef.current.srcObject = stream;

//         return new Promise((resolve) => {
//           videoRef.current.onloadedmetadata = () => {
//             // Ensure video has valid dimensions
//             if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
//               throw new Error('Camera returned zero dimensions');
//             }
//             videoRef.current.play();
//             resolve();
//           };
//         });
//       } catch (err) {
//         console.error("Camera error:", err);
//         setError("Failed to access camera. Please check permissions.");
//         throw err;
//       }
//     };

//     const initThreeJS = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//       camera.position.z = 5;

//       renderer = new THREE.WebGLRenderer({
//         canvas: canvasRef.current,
//         alpha: true,
//         antialias: true
//       });
//       renderer.outputColorSpace = THREE.SRGBColorSpace;
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     const loadFaceLandmarker = async () => {
//       try {
//         const vision = await FilesetResolver.forVisionTasks(
//           "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//         );

//         faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
//           baseOptions: {
//             modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
//             delegate: "GPU"
//           },
//           runningMode: "VIDEO",
//           numFaces: 1
//         });
//       } catch (err) {
//         console.error("FaceLandmarker error:", err);
//         setError("Failed to load face detection model");
//         throw err;
//       }
//     };

//     const load3DFilters = async () => {
//       const loader = new GLTFLoader();

//       await Promise.all(
//         Object.entries(filters).map(async ([key, filter]) => {
//           try {
//             const gltf = await loader.loadAsync(filter.url);
//             loadedModels[key] = gltf.scene;
//             loadedModels[key].visible = false;
//             scene.add(gltf.scene);
//           } catch (err) {
//             console.error(`Model load error (${key}):`, err);
//           }
//         })
//       );
//     };

//     const detectFace = async () => {
//       if (!videoRef.current || !faceLandmarker) return;

//       try {
//         // Ensure video has valid dimensions
//         if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
//           console.warn('Video dimensions are zero, skipping detection');
//           return;
//         }

//         const results = await faceLandmarker.detectForVideo(videoRef.current, Date.now());

//         if (results.faceLandmarks?.length > 0) {
//           updateFaceMesh(results.faceLandmarks[0]);
//           if (!faceDetected) setFaceDetected(true);
//         } else {
//           if (faceDetected) setFaceDetected(false);
//         }
//       } catch (err) {
//         console.error("Detection error:", err);
//         if (err.message.includes('ROI width and height must be > 0')) {
//           console.warn('Retrying detection...');
//           setTimeout(detectFace, 100);
//           return;
//         }
//       }

//       animationId = requestAnimationFrame(detectFace);
//     };

//     const updateFaceMesh = (landmarks) => {
//       if (!loadedModels[activeFilter]) return;

//       const model = loadedModels[activeFilter];
//       const noseTip = landmarks[4];
//       const forehead = landmarks[10];

//       model.position.set(
//         -noseTip.x * 10,
//         -noseTip.y * 10 + 5,
//         -noseTip.z * 10
//       );

//       const faceHeight = Math.abs(forehead.y - noseTip.y);
//       const scale = filters[activeFilter].scale * faceHeight * 20;
//       model.scale.set(scale, scale, scale);

//       const leftEye = landmarks[33];
//       const rightEye = landmarks[263];
//       const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
//       model.rotation.y = angle;

//       model.visible = true;
//       renderer.render(scene, camera);
//     };

//     const init = async () => {
//       try {
//         await initCamera();
//         initThreeJS();
//         await loadFaceLandmarker();
//         await load3DFilters();
//         detectFace();
//         setLoading(false);
//       } catch (err) {
//         console.error("Initialization failed:", err);
//         setLoading(false);
//       }
//     };

//     init();

//     return () => {
//       cancelAnimationFrame(animationId);
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//       if (faceLandmarker) {
//         faceLandmarker.close();
//       }
//     };
//   }, [activeFilter, faceDetected]);

//   return (
//     <div className="ar-container">
//       <video
//         ref={videoRef}
//         playsInline
//         // autoPlay
//         // muted
//         style={{ display: 'block', position: 'absolute', zIndex: 0, width: '100vw', height: '100vh', objectFit: 'cover' }}
//       />

//       <canvas ref={canvasRef} className="ar-canvas" />

//       {error ? (
//         <div className="error-screen">
//           <div className="error-message">{error}</div>
//           <button
//             onClick={() => window.location.reload()}
//             className="retry-button"
//           >
//             Retry
//           </button>
//         </div>
//       ) : loading ? (
//         <div className="loading-screen">
//           <div className="loading-spinner"></div>
//           <div className="loading-text">Initializing camera...</div>
//         </div>
//       ) : !faceDetected ? (
//         <div className="face-prompt">
//           <div className="face-spinner"></div>
//           <div>Align your face in the frame</div>
//         </div>
//       ) : null}

//       <div className="filter-selector">
//         {Object.keys(filters).map(filter => (
//           <button
//             key={filter}
//             onClick={() => setActiveFilter(filter)}
//             className={activeFilter === filter ? 'active' : ''}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Add these styles
// const styles = `
//   .ar-container {
//     position: relative;
//     width: 100vw;
//     height: 100vh;
//     overflow: hidden;
//     background: #000;
//   }
  
//   .ar-canvas {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 1;
//   }
  
//   .loading-screen, .face-prompt, .error-screen {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     background: rgba(0,0,0,0.7);
//     color: white;
//     z-index: 10;
//     font-size: 1.2rem;
//   }
  
//   .loading-spinner, .face-spinner {
//     border: 4px solid rgba(255,255,255,0.3);
//     border-radius: 50%;
//     border-top: 4px solid white;
//     width: 40px;
//     height: 40px;
//     animation: spin 1s linear infinite;
//     margin-bottom: 20px;
//   }
  
//   .error-message {
//     margin-bottom: 20px;
//     text-align: center;
//     padding: 0 20px;
//   }
  
//   .retry-button {
//     padding: 10px 20px;
//     background: #FF9500;
//     border: none;
//     border-radius: 20px;
//     color: white;
//     font-weight: bold;
//     cursor: pointer;
//   }
  
//   .filter-selector {
//     position: absolute;
//     bottom: 20px;
//     left: 0;
//     right: 0;
//     display: flex;
//     justify-content: center;
//     gap: 10px;
//     z-index: 2;
//   }
  
//   .filter-selector button {
//     padding: 8px 16px;
//     background: rgba(255,255,255,0.2);
//     border: none;
//     border-radius: 20px;
//     color: white;
//     backdrop-filter: blur(10px);
//     cursor: pointer;
//   }
  
//   .filter-selector button.active {
//     background: #FF9500;
//   }
  
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// const styleElement = document.createElement('style');
// styleElement.innerHTML = styles;
// document.head.appendChild(styleElement);

// export default ARFaceFilter;







