import React, { useRef, useEffect, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ARFaceFilter = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [capturedData, setCapturedData] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [imageData, setImageData] = useState();

  // High-quality logo image
  const logoImage = useRef(new Image());
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
  const fetchModel = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`
      );

      // ✅ Check if response data exists and has type_name
      if (response.data?.data?.type_name) {
        setImageData(`${import.meta.env.VITE_DOMAIN}/${response.data.data.type_name}`);
      } else {
        throw new Error("No AR face data found for this ID.");
      }
    } catch (err) {
      console.error("Failed to fetch image:", err);
      setError("No AR face found for this link.");
    }
  };

  if (id) {
    fetchModel();
  }
}, [id]);


  useEffect(() => {
    logoImage.current.onload = () => {
      setIsImageLoaded(true);
    };
    logoImage.current.src = imageData;
  }, []);

  useEffect(() => {
    if (!isImageLoaded || error) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMeshRef.current = faceMesh;

    faceMesh.onResults((results) => {
      if (!canvas || !isImageLoaded) return;
      const ctx = canvas.getContext('2d');

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];

        // Corrected cheek landmarks
        const leftCheek = landmarks[116]; // Better cheek position
        const rightCheek = landmarks[345]; // Better cheek position
        const noseTip = landmarks[4];
        const chin = landmarks[152];

        // Calculate face proportions
        const faceHeight = Math.abs(noseTip.y - chin.y) * canvas.height;
        const faceWidth = Math.abs(landmarks[454].x - landmarks[234].x) * canvas.width;
        const logoSize = faceHeight * 0.3; // Increased size

        const drawLogo = (cheekPoint, isRightCheek = false) => {
          let x = cheekPoint.x * canvas.width;
          let y = cheekPoint.y * canvas.height;

          // Adjust position to be more centered on cheek
          const inwardOffset = faceWidth * 0.05;
          x += isRightCheek ? -inwardOffset : inwardOffset;

          // Move down to proper cheek position
          const downwardOffset = faceHeight * 0.15;
          y += downwardOffset;

          ctx.save();

          // Apply perspective correction
          const noseX = noseTip.x * canvas.width;
          const perspectiveOffset = (x - noseX) * 0.02;
          x -= perspectiveOffset;

          if (isRightCheek) {
            ctx.translate(x, y);
            ctx.scale(-1, 1);
            ctx.translate(-x, -y);
          }

          // High quality rendering
          ctx.globalAlpha = 0.95;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(
            logoImage.current,
            x - logoSize/2,
            y - logoSize/2,
            logoSize,
            logoSize
          );

          ctx.restore();
        };

        drawLogo(leftCheek, false);
        drawLogo(rightCheek, true);
      }

      ctx.restore();
    });

    if (video) {
      const camera = new Camera(video, {
        onFrame: async () => {
          try {
            await faceMesh.send({ image: video });
            setIsCameraReady(true);
          } catch (error) {
            console.error('FaceMesh error:', error);
          }
        },
        width: 1280,
        height: 720,
      });

      camera.start();
      cameraRef.current = camera;
    }

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
      }
    };
  }, [isImageLoaded]);

  const captureImage = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setCapturedData(dataUrl);
    setShowModal(true);
  };

  const startRecording = () => {
    if (!canvasRef.current) return;

    recordedChunksRef.current = [];
    const stream = canvasRef.current.captureStream(30);

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: 'video/webm'
    });

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunksRef.current.push(e.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(blob);
      setCapturedData(videoUrl);
      setShowModal(true);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const downloadFile = () => {
    if (!capturedData) return;

    const link = document.createElement('a');
    link.href = capturedData;

    if (capturedData.startsWith('data:image')) {
      link.download = 'face-filter-image.png';
    } else {
      link.download = 'face-filter-video.webm';
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowModal(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      {!isCameraReady && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.7)'
        }}>
          Loading camera...
        </div>
      )}

      <video ref={videoRef} style={{ display: 'none' }} playsInline muted />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
        }}
      />

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        zIndex: 10
      }}>
        <button
          onClick={captureImage}
          disabled={!isCameraReady}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isCameraReady ? 1 : 0.5
          }}
        >
          <span style={{ fontSize: '24px' }}>📷</span>
        </button>

        <button
          onClick={toggleRecording}
          disabled={!isCameraReady}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: isRecording ? 'red' : 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isCameraReady ? 1 : 0.5
          }}
        >
          <span style={{ fontSize: '24px' }}>
            {isRecording ? '⏹️' : '🎥'}
          </span>
        </button>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto'
          }}>
            {capturedData?.startsWith('data:image') ? (
              <img
                src={capturedData}
                alt="Captured"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            ) : (
              <video
                src={capturedData}
                controls
                autoPlay
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
              gap: '10px'
            }}>
              <button
                onClick={downloadFile}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Download
              </button>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '20px',
      backgroundColor: 'rgba(0,0,0,0.85)',
      zIndex: 200,
      textAlign: 'center',
      padding: '20px',
    }}
  >
    {error}
  </div>
)}
    </div>
  );
};

export default ARFaceFilter;


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