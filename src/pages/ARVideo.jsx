import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

const ARVideo = () => {
  const { id } = useParams();
  const [videoMp, setVideoMp] = useState(null);
  const [videoWebm, setVideoWebm] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/track-scan/model/${id}`);
        // const {data} = await response.json();
        // console.log(data, "count");
      } catch (err) {
        // setError("Failed to fetch model");
        console.log("error")
      }
    };

    if (id) {
      fetchCount();
    }
  }, [id]);

  // Fetch model info (video paths)
  useEffect(() => {
    let cancelled = false;
    const fetchModel = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DOMAIN}/api/v1/user/get-ar-types/${id}`
        );
        if (cancelled) return;
        setVideoMp(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
        setVideoWebm(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_usdz}`); // if webm stored here
        console.log("[ARVideo] model info fetched", response.data.data);
      } catch (err) {
        console.error("[ARVideo] fetchModel error", err);
      }
    };
    if (id) fetchModel();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Main AR + Three.js effect — runs when we have at least one video source (or whenever mounted)
  useEffect(() => {
    // If neither path is available yet, wait.
    // We still proceed because video src may be local/test; but you can gate by videoMp/videoWebm if you prefer.
    let camera, scene, renderer;
    let reticle, video, videoTexture, videoMesh;
    let previousTouch = null;
    let isPlaying = false;
    let hitTestSource = null;
    let localReferenceSpace = null;

    // ===== Renderer =====
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    document.body.appendChild(renderer.domElement);

    // ===== Scene & Camera =====
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      40
    );

    // ===== AR Button =====
    document.body.appendChild(
      ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
    );

    // ===== Create video element dynamically and pick best source =====
    video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true; // start muted for autoplay safety
    video.playsInline = true;
    video.controls = false;
    video.preload = "auto";
    video.setAttribute("playsinline", "true");
    video.style.display = "none";
    document.body.appendChild(video);

    // Choose source: prefer webm when browser supports it (and videoWebm provided), fallback to mp4
    const chooseAndLoad = () => {
      const canPlayWebM = video.canPlayType && video.canPlayType("video/webm; codecs=vp9").replace(/no/, "");
      if (canPlayWebM && videoWebm) {
        video.src = videoWebm;
        console.log("[ARVideo] using webm source", videoWebm);
      } else if (videoMp) {
        video.src = videoMp;
        console.log("[ARVideo] using mp4 source", videoMp);
      } else {
        // no dynamic source available — keep src if previously set (helps local dev)
        if (!video.src) console.warn("[ARVideo] no video source available yet");
      }
      video.load();
    };

    chooseAndLoad();

    // If videoMp/videoWebm change later, reload
    const videoSrcObserver = () => {
      chooseAndLoad();
    };

    // Listeners for debugging
    video.addEventListener("loadeddata", () => {
      console.log("[ARVideo] video loadeddata readyState=", video.readyState);
    });
    video.addEventListener("play", () => console.log("[ARVideo] video play"));
    video.addEventListener("pause", () => console.log("[ARVideo] video pause"));
    video.addEventListener("error", (e) => console.error("[ARVideo] video error", e));

    // ===== Video texture =====
    videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;

    // ===== Reticle =====
    const ringGeo = new THREE.RingGeometry(0.08, 0.1, 32).rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    reticle = new THREE.Mesh(ringGeo, ringMat);
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    // ===== XR session start: request hit-test source =====
    renderer.xr.addEventListener("sessionstart", async () => {
      try {
        const session = renderer.xr.getSession();
        const viewerSpace = await session.requestReferenceSpace("viewer");
        hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
        localReferenceSpace = await session.requestReferenceSpace("local");
        console.log("[ARVideo] XR session started - hitTestSource ready");
      } catch (e) {
        console.warn("[ARVideo] sessionstart error", e);
      }
    });

    // ===== Controller: place / move the video mesh =====
    const controller = renderer.xr.getController(0);
    controller.addEventListener("select", async () => {
      if (!reticle.visible) return;

      // Try to play muted first (allowed). Then unmute (user gesture).
      try {
        await video.play();
        // After gesture, unmute if desired. Some devices still restrict unmute; it's okay.
        try {
          video.muted = false;
          console.log("[ARVideo] attempted unmute after gesture");
        } catch (e) {
          console.warn("[ARVideo] unmute attempt failed", e);
        }
      } catch (err) {
        console.warn("[ARVideo] video.play() failed on select:", err);
      }

      if (!videoMesh) {
        const geo = new THREE.PlaneGeometry(1.6, 0.9); // change ratio as needed
        const mat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
        videoMesh = new THREE.Mesh(geo, mat);
        videoMesh.position.setFromMatrixPosition(reticle.matrix);
        videoMesh.quaternion.setFromRotationMatrix(reticle.matrix);
        videoMesh.scale.set(1, 1, 1);
        scene.add(videoMesh);
        isPlaying = !video.paused;
        console.log("[ARVideo] placed videoMesh, isPlaying=", isPlaying);
      } else {
        // Move existing mesh to new location if desired
        videoMesh.position.setFromMatrixPosition(reticle.matrix);
        videoMesh.quaternion.setFromRotationMatrix(reticle.matrix);
        console.log("[ARVideo] moved videoMesh to new reticle");
      }
    });
    scene.add(controller);

    // ===== Touch handlers (rotate, pinch zoom, single-tap toggle) =====
    let tapStart = 0;
    let lastTap = 0;
    function onTouchStart(e) {
      if (!videoMesh) return;
      tapStart = Date.now();
      if (e.touches.length === 1) previousTouch = e.touches[0];
      else if (e.touches.length === 2) {
        previousTouch = {
          x1: e.touches[0].clientX,
          y1: e.touches[0].clientY,
          x2: e.touches[1].clientX,
          y2: e.touches[1].clientY,
        };
      }
    }
    function onTouchMove(e) {
      if (!videoMesh || !previousTouch) return;
      // rotate single finger
      if (e.touches.length === 1 && previousTouch.clientX !== undefined) {
        const dx = e.touches[0].clientX - previousTouch.clientX;
        videoMesh.rotation.y += dx * 0.005;
        previousTouch = e.touches[0];
      }
      // pinch to scale
      if (e.touches.length === 2 && previousTouch.x1 !== undefined) {
        const prevDist = Math.hypot(previousTouch.x2 - previousTouch.x1, previousTouch.y2 - previousTouch.y1);
        const newDist = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
        const scaleFactor = newDist / prevDist;
        const newScale = Math.min(Math.max(videoMesh.scale.x * scaleFactor, 0.2), 5);
        videoMesh.scale.set(newScale, newScale, newScale);
        previousTouch = {
          x1: e.touches[0].clientX,
          y1: e.touches[0].clientY,
          x2: e.touches[1].clientX,
          y2: e.touches[1].clientY,
        };
      }
    }
    function onTouchEnd(e) {
      if (!videoMesh) {
        previousTouch = null;
        return;
      }
      const now = Date.now();
      const tapDuration = now - tapStart;
      previousTouch = null;
      // quick tap toggles play/pause
      if (tapDuration < 250) {
        if (now - lastTap < 300) {
          lastTap = now; // debounce double-tap
          return;
        }
        lastTap = now;
        if (video.paused) {
          video.play().catch((err) => console.warn("[ARVideo] video.play error:", err));
        } else {
          video.pause();
        }
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });

    // ===== Render loop with texture needsUpdate and hit-test =====
    renderer.setAnimationLoop((timestamp, frame) => {
      if (frame && hitTestSource && localReferenceSpace) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);
        if (hitTestResults.length > 0) {
          const hitPose = hitTestResults[0].getPose(localReferenceSpace);
          reticle.visible = true;
          reticle.matrix.fromArray(hitPose.transform.matrix);
        } else {
          reticle.visible = false;
        }
      }

      // update videoTexture if video has data
      try {
        if (video && video.readyState >= video.HAVE_CURRENT_DATA && videoTexture) {
          videoTexture.needsUpdate = true;
        }
      } catch (e) {
        // ignore
      }

      renderer.render(scene, camera);
    });

    // ===== Resize handling =====
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ===== Cleanup =====
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      // end XR session if active
      try {
        const session = renderer.xr.getSession();
        if (session) session.end();
      } catch (e) {
        console.warn("[ARVideo] error ending session:", e);
      }

      // remove renderer DOM
      try {
        if (renderer && renderer.domElement) document.body.removeChild(renderer.domElement);
      } catch (e) { }

      // cleanup video
      try {
        if (video) {
          video.pause();
          video.src = "";
          try { document.body.removeChild(video); } catch (e) { }
        }
      } catch (e) {
        console.warn("[ARVideo] cleanup video error", e);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoMp, videoWebm, id]); // re-run if video paths change

  return null;
};

export default ARVideo;



// import React, { useEffect } from "react";
// import * as THREE from "three";
// import { ARButton } from "three/examples/jsm/webxr/ARButton";

// const ARVideo = () => {
//   useEffect(() => {
//     let camera, scene, renderer;
//     let reticle, video, videoTexture, videoMesh;
//     let previousTouch = null;
//     let isPlaying = false;

//     // ===== Renderer =====
//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.xr.enabled = true;
//     document.body.appendChild(renderer.domElement);

//     // ===== Scene & Camera =====
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(
//       70,
//       window.innerWidth / window.innerHeight,
//       0.01,
//       40
//     );

//     // ===== AR Button =====
//     document.body.appendChild(
//       ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
//     );

//     // ===== Load Video =====
//     video = document.createElement("video");
//     video.src = "/model/VID-20240812-WA0001.mp4"; // your video
//     video.crossOrigin = "anonymous";
//     video.loop = true;
//     video.muted = false; // 🔊 SOUND ENABLED
//     video.playsInline = true;
//     video.controls = false;
//     videoTexture = new THREE.VideoTexture(video);

//     // ===== Reticle =====
//     const ringGeo = new THREE.RingGeometry(0.08, 0.1, 32).rotateX(-Math.PI / 2);
//     const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
//     reticle = new THREE.Mesh(ringGeo, ringMat);
//     reticle.matrixAutoUpdate = false;
//     reticle.visible = false;
//     scene.add(reticle);

//     // ===== XR Session =====
//     let hitTestSource = null;
//     let localReferenceSpace = null;

//     renderer.xr.addEventListener("sessionstart", async () => {
//       const session = renderer.xr.getSession();
//       const viewerSpace = await session.requestReferenceSpace("viewer");
//       hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
//       localReferenceSpace = await session.requestReferenceSpace("local");
//     });

//     // ===== Controller =====
//     const controller = renderer.xr.getController(0);
//     controller.addEventListener("select", async () => {
//       if (reticle.visible && !videoMesh) {
//         // 🔹 Ask user interaction for sound (important for iOS/Android)
//         await video.play().catch(() => {
//           alert("Tap again to enable video with sound.");
//         });

//         const geo = new THREE.PlaneGeometry(1.2, 0.7);
//         const mat = new THREE.MeshBasicMaterial({ map: videoTexture });
//         videoMesh = new THREE.Mesh(geo, mat);
//         videoMesh.position.setFromMatrixPosition(reticle.matrix);
//         videoMesh.quaternion.setFromRotationMatrix(reticle.matrix);
//         scene.add(videoMesh);
//         isPlaying = true;
//       }
//     });
//     scene.add(controller);

//     // ===== Touch Controls (Rotate + Zoom + Tap to Pause/Play) =====
//     function onTouchStart(event) {
//       if (!videoMesh) return;

//       // 🎬 Single tap = play/pause toggle
//       if (event.touches.length === 1 && !previousTouch) {
//         const now = Date.now();
//         if (video && now - (video.lastTap || 0) < 300) {
//           if (isPlaying) {
//             video.pause();
//           } else {
//             video.play();
//           }
//           isPlaying = !isPlaying;
//         }
//         video.lastTap = now;
//       }

//       if (event.touches.length === 1) {
//         previousTouch = event.touches[0];
//       } else if (event.touches.length === 2) {
//         previousTouch = {
//           x1: event.touches[0].clientX,
//           y1: event.touches[0].clientY,
//           x2: event.touches[1].clientX,
//           y2: event.touches[1].clientY,
//         };
//       }
//     }

//     function onTouchMove(event) {
//       if (!videoMesh) return;

//       // Rotate
//       if (event.touches.length === 1 && previousTouch?.clientX !== undefined) {
//         const dx = event.touches[0].clientX - previousTouch.clientX;
//         videoMesh.rotation.y += dx * 0.005;
//         previousTouch = event.touches[0];
//       }

//       // Zoom
//       if (event.touches.length === 2 && previousTouch?.x1 !== undefined) {
//         const prevDist = Math.hypot(
//           previousTouch.x2 - previousTouch.x1,
//           previousTouch.y2 - previousTouch.y1
//         );
//         const newDist = Math.hypot(
//           event.touches[1].clientX - event.touches[0].clientX,
//           event.touches[1].clientY - event.touches[0].clientY
//         );
//         const scaleFactor = newDist / prevDist;
//         videoMesh.scale.multiplyScalar(scaleFactor);
//         previousTouch = {
//           x1: event.touches[0].clientX,
//           y1: event.touches[0].clientY,
//           x2: event.touches[1].clientX,
//           y2: event.touches[1].clientY,
//         };
//       }
//     }

//     function onTouchEnd() {
//       previousTouch = null;
//     }

//     window.addEventListener("touchstart", onTouchStart);
//     window.addEventListener("touchmove", onTouchMove);
//     window.addEventListener("touchend", onTouchEnd);

//     // ===== Animation Loop =====
//     renderer.setAnimationLoop((timestamp, frame) => {
//       if (frame) {
//         const refSpace = localReferenceSpace;
//         const hitTestResults = frame.getHitTestResults(hitTestSource);
//         if (hitTestResults.length > 0) {
//           const hitPose = hitTestResults[0].getPose(refSpace);
//           reticle.visible = true;
//           reticle.matrix.fromArray(hitPose.transform.matrix);
//         }
//       }
//       renderer.render(scene, camera);
//     });

//     // ===== Cleanup =====
//     return () => {
//       window.removeEventListener("touchstart", onTouchStart);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("touchend", onTouchEnd);
//       document.body.removeChild(renderer.domElement);
//     };
//   }, []);

//   return null;
// };

// export default ARVideo;



// import React from "react";
// // import '@google/model-viewer'; // Import model-viewer

// const ARVideo = () => {
//     return (
//         <div style={{ padding: "20px" }}>
//             <h1>AR Video Demo</h1>

//             <model-viewer
//                 src="/model/32_1762782263876.glb"   // Your exported GLB plane
//                 ios-src="/model/32_1762778297535.usdz" // iOS Quick Look (video won't play)
//                 ar
//                 // ar-modes="webxr scene-viewer quick-look"
//                 camera-controls
//                 // autoplay
//                 style={{ width: "100%", height: "500px", background: "transparent" }}
//                 onClick={() => {
//                     const video = document.querySelector('video[slot="video"]');
//                     if (video) video.play();
//                 }}
//             >
//                 {/* Video slot: This will be your plane texture in AR */}
//                 <video
//                     slot="video"
//                     src="/model/VID-20240812-WA0004.mp4" // Your video path
//                     // autoplay
//                     muted
//                     loop
//                     playsInline
//                     style={{ display: "none" }} // Hidden video element
//                 />
//             </model-viewer>
//         </div>
//     );
// };

// export default ARVideo;



