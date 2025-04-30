// import React from "react";

// const Blog = ({ blogs, activeTab }) => {
//   const filteredBlogs = activeTab
//     ? blogs.filter((blog) => blog.category === activeTab)
//     : blogs;

//   return (
//     <div className="blog-container">
//       {filteredBlogs.length > 0 ? (
//         filteredBlogs.map((blog, index) => (
//           <div className="blog-item mb-4 p-3 bg-white shadow rounded" key={index}>
//             <a href={blog.link} className="d-block mb-3">
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="img-fluid rounded"
//                 style={{ height: "130px", objectFit: "cover" }}
//               />
//             </a>
//             <h2 className="h5 mb-2">
//               <a href={blog.link} className="text-decoration-none text-dark">
//                 {blog.title}
//               </a>
//             </h2>
//             <p className="text-muted small mb-1">
//               <a href={`#${blog.category}`} className="text-decoration-none">
//                 {blog.category}
//               </a>{" "}
//               | {blog.date}
//             </p>
//             <p className="blog-description mb-0">{blog.description}</p>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-muted">No blogs found for this category.</p>
//       )}
//     </div>
//   );
// };

// export default Blog;





// best one
// import React from "react";
// import { Link } from "react-router-dom";

// const Blog = ({ blogs, activeTab }) => {
//   const filteredBlogs = activeTab
//     ? blogs.filter((blog) => blog.category === activeTab)
//     : blogs;

//   return (
//     <div className="row gy-4">
//       {filteredBlogs.length > 0 ? (
//         filteredBlogs.map((blog, index) => (
//           <div className="col-12" key={index}>
//             <div className="blog-item d-flex flex-column flex-md-row align-items-center align-items-md-start bg-white shadow rounded p-3">
//               {/* Image Section */}
//               <Link to={blog.link} className="flex-shrink-0 me-md-3 mb-3 mb-md-0">
//                 <img
//                   src={blog.image}
//                   alt={blog.title}
//                   className="rounded"
//                   style={{
//                     width: "150px",
//                     height: "150px",
//                     objectFit: "cover",
//                   }}
//                 />
//               </Link>
//               {/* Content Section */}
//               <div className="flex-grow-1">
//                 <h2 className="h5 mb-2">
//                   <Link
//                     href={blog.link}
//                     className="text-decoration-none text-dark"
//                   >
//                     {blog.title}
//                   </Link>
//                 </h2>
//                 <p className="text-muted small mb-2">
//                   <button
//                     className="btn btn-link  text-decoration-none p-0"
//                     onClick={() => window.location.hash = `#${blog.category}`}
//                   >
//                     {blog.category}
//                   </button>{" "}
//                   | {blog.date}
//                 </p>
//                 <p className="blog-description mb-0 text-muted">
//                   {blog.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-muted">
//           No blogs found for this category.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Blog;


















import React from "react";
import "./Blog.css"
import { Link } from "react-router-dom";
const Blog = ({ blogs, activeTab, onBlogClick }) => {
  const filteredBlogs = activeTab
    ? blogs.filter((blog) => blog.category === activeTab)
    : blogs;

  return (
    <div className="row gy-4">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog, index) => (
          <div className="col-12" key={index}>
            <div className="blog-item d-flex flex-column flex-md-row align-items-center align-items-md-start bg-white shadow rounded p-3">
              <Link
                onClick={() => onBlogClick(blog)} // Set the selected blog
                className="flex-shrink-0 me-md-3 mb-3 mb-md-0 text-decoration-none cursor-pointer"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="rounded"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <div className="flex-grow-1">
                <h2 className="h5  mb-2 fw-bold">
                  <Link
                    onClick={() => onBlogClick(blog)}
                    className="text-decoration-none cursor-pointer heading-blog"
                  >
                    {blog.title}
                  </Link>
                </h2>
                <p className="text-muted small mb-2">
                  <button
                    className="btn btn-link text-decoration-none p-0"
                    onClick={() => window.location.hash = `#${blog.category}`}
                  >
                    {blog.category}
                  </button>{" "}
                  | {blog.date}
                </p>
                <p className="blog-description mb-0 text-muted">
                  {blog.description}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">
          No blogs found for this category.
        </p>
      )}
    </div>
  );
};

export default Blog;

