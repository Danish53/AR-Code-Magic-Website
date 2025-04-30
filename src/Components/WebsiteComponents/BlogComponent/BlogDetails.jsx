// import React from "react";
// import { useParams } from "react-router-dom";

// const BlogDetails = ({ blogs }) => {
//   const { id } = useParams();
//   const blog = blogs.find((b, index) => String(index + 1) === id);

//   if (!blog) {
//     return <p className="text-center">Blog not found!</p>;
//   }

//   return (
//     <div className="blog-details p-4 bg-white shadow rounded">
//       <h2 className="fw-bold">{blog.title}</h2>
//       <p className="text-muted small mb-3">
//         {blog.date} | {blog.category}
//       </p>
//       <img
//         src={blog.image}
//         alt={blog.title}
//         className="img-fluid rounded mb-3"
//       />
//       <p>{blog.description}</p>
//     </div>
//   );
// };

// export default BlogDetails;


// const BlogDetails = ({ blog }) => {
//     return (
//       <div>
//         <h3>{blog.title}</h3>
//         <p>{blog.date}</p>
//         <img src={blog.image} alt={blog.title} />
//         <p>{blog.description}</p>
//       </div>
//     );
//   };
  
//   export default BlogDetails;
  


// import React from "react";

// const BlogDetails = ({ blog }) => {
//   return (
//     <div className="container my-4">
//       <div className="panel panel-body panel-default shadow-sm p-4 bg-white">
//         <h2 className="blog-title mb-3">
//           {/* <a href={blog.link} className="text-dark text-decoration-none"> */}
//             {blog.title}
//           {/* </a> */}
//         </h2>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <span className="text-muted">{blog.category}</span>
//           <span className="text-muted">{blog.date}</span>
//           <div>
//             <button
//               className="btn btn-success btn-sm mx-1"
//               data-sharer="twitter"
//               data-title={blog.title}
//               data-hashtags="AR,AugmentedReality,ARCode,Metaverse"
//               data-url={blog.link}
//             >
//               Twitter
//             </button>
//             <button
//               className="btn btn-success btn-sm mx-1"
//               data-sharer="facebook"
//               data-url={blog.link}
//             >
//               Facebook
//             </button>
//             <button
//               className="btn btn-success btn-sm mx-1"
//               data-sharer="linkedin"
//               data-url={blog.link}
//             >
//               LinkedIn
//             </button>
//             <button
//               className="btn btn-success btn-sm mx-1"
//               data-sharer="email"
//               data-title={blog.title}
//               data-url={blog.link}
//               data-subject={blog.title}
//             >
//               Email
//             </button>
//           </div>
//         </div>
//         <hr />

//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="img-fluid rounded mb-4"
//         />
//         <p className="blog-description mb-4">
//           {blog.description}
//         </p>
    
//         <div className="text-center mb-4">
//           <iframe
//             className="embed-responsive embed-responsive-16by9 rounded"
//             width="80%"
//             height="400"
//             src="https://www.youtube.com/embed/Gcr7LoPwsqA"
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//           ></iframe>
//         </div>
//         <h2 className="blog-subtitle mt-4">
//           <strong>What’s New in {blog.title}</strong>
//         </h2>
//         <div>
//           <p>
//             <strong>No LiDAR Needed:</strong> The app leverages photogrammetry to
//             create stunning 3D models from photos or videos without needing
//             specialized hardware.
//           </p>
//           <p>
//             <strong>M-Series Performance:</strong> Optimized for Apple’s M-series
//             chips, the app offers lightning-fast processing and local AI object
//             extraction.
//           </p>
//           <p>
//             <strong>Accessible and Versatile:</strong> Perfect for marketers,
//             urban planners, and more to craft immersive AR QR Code experiences.
//           </p>
//         </div>
//         <img
//           src="https://ar-code.com/images/EhRnMHlh.webp"
//           alt="Pizza Hut 3D Scan Object Capture"
//           className="img-fluid rounded mb-4"
//         />
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;












import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
// import "./BlogDetails.css"; // For additional styling

const BlogDetails = ({ blog }) => {
  return (
    <div className="blog-details-container container my-5">
      {/* Blog Header */}
      <div className="blog-header text-center mb-4">
        <h2 className="blog-title text-primary fw-bold">
          {blog.title}
        </h2>
        <div className="blog-meta d-flex justify-content-center align-items-center text-muted">
          <span className="me-3">
            <strong>Category:</strong> {blog.category}
          </span>
          <span>
            <strong>Date:</strong> {blog.date}
          </span>
        </div>
      </div>

      {/* Blog Image */}
      <div className="blog-image text-center mb-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="img-fluid rounded shadow-sm"
        />
      </div>

      {/* Blog Description */}
      <div className="blog-detail-description mb-4">
        <p className="fs-5 text-secondary lh-lg">{blog.description}</p>
      </div>

      {/* Blog Video */}
      <div className="blog-video text-center mb-4">
        <iframe
          className="embed-responsive rounded"
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/Gcr7LoPwsqA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Blog Details */}
      <div className="blog-details-section">
        <h2 className="fw-bold text-dark mb-3">What’s New in {blog.title}</h2>
        <ul className="list-unstyled text-secondary">
          <li className="mb-3">
            <strong className="text-primary">No LiDAR Needed:</strong> The app leverages photogrammetry to create stunning 3D models from photos or videos without needing specialized hardware.
          </li>
          <li className="mb-3">
            <strong className="text-primary">M-Series Performance:</strong> Optimized for Apple’s M-series chips, the app offers lightning-fast processing and local AI object extraction.
          </li>
          <li>
            <strong className="text-primary">Accessible and Versatile:</strong> Perfect for marketers, urban planners, and more to craft immersive AR QR Code experiences.
          </li>
        </ul>
      </div>

      {/* Blog Sharing */}
      <div className="blog-sharing text-center mt-5">
        <h3 className="fw-bold text-primary text-dark mb-3">Share this blog</h3>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-outline-success btn-lg d-flex align-items-center gap-2"
            data-sharer="twitter"
            data-title={blog.title}
            data-hashtags="AR,AugmentedReality,ARCode,Metaverse"
            data-url={blog.link}
          >
            <FaTwitter /> Twitter
          </button>
          <button
            className="btn btn-outline-success btn-lg d-flex align-items-center gap-2"
            data-sharer="facebook"
            data-url={blog.link}
          >
            <FaFacebookF /> Facebook
          </button>
          <button
            className="btn btn-outline-success btn-lg d-flex align-items-center gap-2"
            data-sharer="linkedin"
            data-url={blog.link}
          >
            <FaLinkedinIn /> LinkedIn
          </button>
          <button
            className="btn btn-outline-success btn-lg d-flex align-items-center gap-2"
            data-sharer="email"
            data-title={blog.title}
            data-url={blog.link}
            data-subject={blog.title}
          >
            <FaEnvelope /> Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;