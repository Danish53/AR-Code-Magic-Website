

// // ARView.js
import React, { useEffect, useRef, useState } from 'react';
// import '@google/model-viewer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

const ARTextDisplay = () => {
  const { id } = useParams();
  // Static model URL (GLB format)
  // const modelUrl = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  const modelUrl = "/9b1d1090.glb";

    const [data, setData] = useState('');
  const [analysis, setAnalyze] = useState();
  const videoRef = useRef(null);

  const [modelData, setModelData] = useState(null);
  const [modelUsdz, setModelUsdz] = useState(null);
  // const [video, setVideo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AICode, setAICode] = useState();

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`);
        setModelData(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
        setModelUsdz(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_usdz}`);
        setAICode(response.data.data);
      } catch (err) {
        setError("Failed to fetch model.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchModel();
    }
  }, [id]);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/track-scan/model/${id}`);
        // const {data} = await response.json();
        console.log(data, "count");
      } catch (err) {
        // setError("Failed to fetch model");
        console.log("error")
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCount();
    }
  }, [id]);

  if (loading) return <p>Loading AR Model...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Device detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isDesktop = !isIOS && !isAndroid; // Desktop devices

  // Capture current frame from video as base64
  const captureImage = () => {
    const video = videoRef.current?.querySelector('video');
    if (!video) return null;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  };

  const handleAIButtonClick = async () => {
    const imageBase64 = captureImage();
    if (!imageBase64) return alert('Camera not ready');

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/v1/user/analyzed-AI-code-image`, {
        imageBase64: imageBase64,
        prompt: AICode.type_name,
      });

      console.log('API Success:', response.data);
      setAnalyze(response.data.analysis)
      alert(' successfully get!');
    } catch (err) {
      console.error('API Error:', err);
      alert('API call failed.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    {
      AICode.ar_type === "AI Code" ? (
         <>
         <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000',
      zIndex: 9999,
    }}>
      {/* Loader */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000aa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Loading...
        </div>
      )}

      {/* QR Camera */}
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text || '');
            console.log('Scanned:', result?.text);
          }
          if (!!error) {
            console.error(error);
          }
        }}
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
        videoStyle={{
          width: '110vw',
          height: '113vh',
          objectFit: 'cover',
        }}
        ref={videoRef}
      />

      {
        analysis? <p style={{
          position: 'absolute',
          bottom: 130,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          backgroundColor: '#ffffffaa',
          border: 'none',
          zIndex: 10000,
          cursor: 'pointer',
        }}>{analysis}</p> : ""
      }

      {/* AI Button */}
      <button
        onClick={handleAIButtonClick}
        style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          backgroundColor: '#ffffffaa',
          border: 'none',
          zIndex: 10000,
          cursor: 'pointer',
        }}
      >
        AI Button
      </button>
    </div>
         </>

      ) : (
        <div>
      <h1>AR Text Display</h1>

      {/* AR Button for iOS */}
      {isIOS && (
        <a
          href={modelUsdz} // Convert GLB to USDZ for iOS
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
          ar-modes="webxr scene-viewer"
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

      {/* <div style={styles.videoContainer}>
        <model-viewer
          ref={modelViewerRef}
          src={modelData}
          // ios-src={usdzUrl}
          ar
          ar-modes="webxr scene-viewer quick-look"
          environment-image="neutral"
          camera-controls
          auto-rotate
          xr-environment
          shadow-intensity="1"
          style={styles.modelViewer}
        >
          <button slot="ar-button" >
            View in AR
          </button>

          <div slot="video-overlay" style={styles.videoOverlay}>
            <video
              ref={videoRef}
              controls
              autoPlay
              loop
              muted
              playsInline
              style={isModelLoaded ? styles.visibleVideo : styles.hiddenVideo}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </model-viewer>
      </div> */}
    </div>
      )
      
    }
    </>
  );
};

export default ARTextDisplay;


// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { QrReader } from 'react-qr-reader';

// const ARTextDisplay = () => {
//   const { id } = useParams();
//   const [modelData, setModelData] = useState(null);
//   const [modelUsdz, setModelUsdz] = useState(null);
//   const [error, setError] = useState(null);
//   const [AICode, setAICode] = useState(null);
//   const [loadingModel, setLoadingModel] = useState(true);
//   const [loadingAI, setLoadingAI] = useState(false);

//   const [data, setData] = useState('');
//   const [analysis, setAnalysis] = useState('');

//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
//   const isAndroid = /Android/.test(navigator.userAgent);
//   const isDesktop = !isIOS && !isAndroid;

//   useEffect(() => {
//     const fetchModel = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`);
//         const resData = response.data.data;
//         setModelData(`${import.meta.env.VITE_DOMAIN}/${resData.model_path}`);
//         setModelUsdz(`${import.meta.env.VITE_DOMAIN}/${resData.model_usdz}`);
//         setAICode(resData);
//       } catch (err) {
//         setError('Failed to fetch model');
//       } finally {
//         setLoadingModel(false);
//       }
//     };

//     if (id) fetchModel();
//   }, [id]);

//   const captureImage = () => {
//     const video = document.querySelector('video');

//     if (!video || video.readyState < 2) {
//       return null;
//     }

//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth || 640;
//     canvas.height = video.videoHeight || 480;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     return canvas.toDataURL('image/jpeg');
//   };

//   const handleAIButtonClick = async () => {
//     const imageBase64 = captureImage();
//     if (!imageBase64) return alert('Camera not ready');

//     setLoadingAI(true);
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/user/analyzed-AI-code-image', {
//         imageBase64,
//         prompt: AICode.type_name,
//       });
//       setAnalysis(response.data.analysis);
//     } catch (err) {
//       console.error('API Error:', err);
//       alert('API call failed.');
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   // if (loadingModel) return <p>Loading AR Model...</p>;
//   // if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <>
//       {/* {AICode?.ar_type === 'AI Code' ? ( */}
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: '#000',
//             zIndex: 9999,
//           }}
//         >
//           <QrReader
//             constraints={{ facingMode: 'environment' }}
//             onResult={(result, error) => {
//               if (result?.text) {
//                 setData(result.text);
//                 console.log('Scanned:', result.text);
//               }
//               if (error) {
//                 console.error(error);
//               }
//             }}
//             containerStyle={{ width: "100%", height:"100%" }}
//             videoStyle={{
//               width: '110vw',
//               height: '113vh',
//               objectFit: 'cover',
//             }}
//           />

//           {/* Loader Overlay (non-blocking camera) */}
//           {loadingAI && (
//             <div
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 backgroundColor: '#00000066',
//                 zIndex: 10001,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 fontSize: '24px',
//                 fontWeight: 'bold',
//                 color: '#fff',
//               }}
//             >
//               Processing...
//             </div>
//           )}

//           {/* AI Text Display */}
//           {analysis && (
//             <p
//               style={{
//                 position: 'absolute',
//                 bottom: 130,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 padding: '12px 24px',
//                 fontSize: '16px',
//                 borderRadius: '8px',
//                 backgroundColor: '#ffffffaa',
//                 zIndex: 10000,
//               }}
//             >
//               {analysis}
//             </p>
//           )}

//           {/* AI Button */}
//           <button
//             onClick={handleAIButtonClick}
//             style={{
//               position: 'absolute',
//               bottom: 70,
//               left: '50%',
//               transform: 'translateX(-50%)',
//               padding: '12px 24px',
//               fontSize: '16px',
//               borderRadius: '8px',
//               backgroundColor: '#ffffffaa',
//               border: 'none',
//               zIndex: 10000,
//               cursor: 'pointer',
//             }}
//           >
//             AI Button
//           </button>
//         </div>
      
//     </>
//   );
// };

// export default ARTextDisplay;

// components/ArVideoViewer.js

// App.js
// ARVideoMindAR.js
// src/components/ARVideo.jsx
// import React, { useEffect } from 'react';

// const ARVideo = () => {
//   useEffect(() => {
//     // Load A-Frame and MindAR scripts dynamically
//     const aframeScript = document.createElement('script');
//     aframeScript.src = 'https://cdn.jsdelivr.net/npm/aframe@1.3.0/dist/aframe.min.js';
//     aframeScript.async = true;

//     const mindarScript = document.createElement('script');
//     mindarScript.src = 'https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-aframe.prod.js';
//     mindarScript.async = true;

//     document.body.appendChild(aframeScript);
//     document.body.appendChild(mindarScript);

//     return () => {
//       document.body.removeChild(aframeScript);
//       document.body.removeChild(mindarScript);
//     };
//   }, []);

//   return (
//     <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
//       <a-scene
//         mindar-image="imageTargetSrc: /model/targets.mind; autoStart: true;"
//         embedded
//         color-space="sRGB"
//         renderer="colorManagement: true, physicallyCorrectLights"
//         vr-mode-ui="enabled: false"
//         device-orientation-permission-ui="enabled: true"
//       >
//         <a-assets>
//           <video
//             id="my-video"
//             src="/model/VID-20240812-WA0001.mp4"
//             preload="auto"
//             loop
//             muted
//             playsinline
//             crossorigin="anonymous"
//           ></video>
//         </a-assets>

//         <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//         <a-entity mindar-image-target="targetIndex: 0">
//           <a-video
//             src="#my-video"
//             width="1.2"
//             height="0.7"
//             position="0 0 0"
//             rotation="0 0 0"
//           ></a-video>
//         </a-entity>
//       </a-scene>
//     </div>
//   );
// };

// export default ARVideo;












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




// ARVideo.jsx
// src/ARVideoAutoMarker.js

// import React, { useEffect, useRef } from "react";

// function ARTextDisplay() {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     let mindarThree;
//     let video;
//     let videoTexture;
//     let animationFrameId;

//     async function startAR() {
//       const MindARThree = window.MINDAR.IMAGE.MindARThree;
//       const THREE = window.THREE;

//       mindarThree = new MindARThree({
//         container: containerRef.current,
//         imageTargetSrc: "/model/card.mind",  // apna marker yahan rakhen (public/model/)
//         maxTrack: 1,
//         uiScanning: false, // scanning UI hide kare
//         uiLoading: false,  // loading UI hide kare
//       });

//       const { renderer, scene, camera } = mindarThree;

//       // Video setup
//       video = document.createElement("video");
//       video.src = "/model/VID-20240812-WA0001.mp4"; // apna video path
//       video.crossOrigin = "anonymous";
//       video.loop = true;
//       video.muted = true;
//       video.playsInline = true;

//       // Wait for video ready before playing
//       await video.play();

//       videoTexture = new THREE.VideoTexture(video);
//       videoTexture.minFilter = THREE.LinearFilter;
//       videoTexture.magFilter = THREE.LinearFilter;
//       videoTexture.format = THREE.RGBFormat;

//       // Plane geometry for video display
//       const geometry = new THREE.PlaneGeometry(1, 0.6);
//       const material = new THREE.MeshBasicMaterial({ map: videoTexture });
//       const plane = new THREE.Mesh(geometry, material);

//       // Add anchor for marker index 0
//       const anchor = mindarThree.addAnchor(0);
//       anchor.group.add(plane);

//       // Play/pause video on marker found/lost
//       anchor.onTargetFound = () => {
//         video.play();
//       };
//       anchor.onTargetLost = () => {
//         video.pause();
//       };

//       await mindarThree.start();

//       // Render loop
//       const render = () => {
//         renderer.render(scene, camera);
//         animationFrameId = requestAnimationFrame(render);
//       };
//       render();
//     }

//     startAR();

//     return () => {
//       if (mindarThree && mindarThree.stop) {
//     try {
//       mindarThree.stop();
//     } catch (error) {
//       console.warn("Error stopping MindARThree:", error);
//     }
//   }

//   if (mindarThree?.renderer?.dispose) {
//     mindarThree.renderer.dispose();
//   }

//   if (video) {
//     video.pause();
//     video.src = "";
//     video.load();
//   }

//   if (animationFrameId) cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         width: "100vw",
//         height: "100vh",
//         position: "relative",
//         overflow: "hidden",
//         backgroundColor: "#000",
//       }}
//     />
//   );
// }

// export default ARTextDisplay;








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



// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";

// const ARFaceCamera = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);
//   const [processedFrame, setProcessedFrame] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Start camera
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { width: 80, height: 60 },
//           audio: false,
//         });
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//         setStreaming(true);
//       } catch (err) {
//         console.error("Error accessing camera:", err);
//       }
//     };

//     startCamera();

//     return () => {
//       // Stop camera on unmount
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (streaming) {
//       interval = setInterval(captureFrame, 100);
//     }
//     return () => clearInterval(interval);
//   }, [streaming]);

//   const captureFrame = async () => {
//   if (!videoRef.current) return;

//   const video = videoRef.current;
//   const canvas = canvasRef.current;
//   const ctx = canvas.getContext("2d");

//   const width = 280;
//   const height = 460;
//   canvas.width = width;
//   canvas.height = height;

//   ctx.drawImage(video, 0, 0, width, height);

//   // Convert canvas to base64 string
//   const base64Frame = canvas.toDataURL("image/jpeg", 0.3); // 30% quality

//   try {
//     setLoading(true);
//     const response = await axios.post(
//       "http://localhost:8000/api/v1/user/ar-face",
//       {
//         frame: base64Frame,   // base64 string
//         logoId: "a254012f"   // string
//       },
//       { headers: { "Content-Type": "application/json" } }
//     );

//     if (response.data?.processedFrame) {
//       setProcessedFrame(response.data.processedFrame);
//     }
//   } catch (err) {
//     console.error("Error sending frame to API:", err);
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="text-center mt-4">
//       <h3>AR Face Filter Camera</h3>

//       <div style={{ position: "relative", display: "inline-block" }}>
//         <video
//           ref={videoRef}
//           style={{ width: "640px", height: "480px", borderRadius: "10px" }}
//         ></video>

//         {processedFrame && (
//           <img
//             src={processedFrame}
//             alt="Processed Frame"
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "640px",
//               height: "480px",
//               borderRadius: "10px",
//             }}
//           />
//         )}
//       </div>

//       {loading && <p>Processing frame...</p>}

//       {/* Hidden canvas */}
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//     </div>
//   );
// };

// export default ARFaceCamera;







