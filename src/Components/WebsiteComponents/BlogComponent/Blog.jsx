import React from "react";
import "./Blog.css"
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

const Blog = ({ blogs, activeTab, onBlogClick, loading }) => {
  const filteredBlogs = activeTab
    ? blogs.filter((blog) => blog?.category?.category_name?.toLowerCase() === activeTab?.toLowerCase())
    : blogs;

// Skeleton Loader JSX
const renderSkeletons = () => {
  return Array(3)
    .fill()
    .map((_, index) => (
      <div
        key={index}
        className="blog-item d-flex flex-column flex-md-row align-items-center align-items-md-start bg-white shadow rounded p-3 mb-4"
      >
        <div
          className="rounded bg-secondary bg-opacity-25 me-md-3 mb-3 mb-md-0"
          style={{ width: "150px", height: "150px" }}
        ></div>
        <div className="flex-grow-1 w-100">
          <div className="bg-secondary bg-opacity-25 rounded mb-2" style={{ width: "70%", height: "20px" }}></div>
          <div className="bg-secondary bg-opacity-25 rounded mb-2" style={{ width: "40%", height: "15px" }}></div>
          <div className="bg-secondary bg-opacity-25 rounded" style={{ width: "100%", height: "60px" }}></div>
        </div>
      </div>
    ));
};

return (
  <div className="row gy-4">
    {loading ? (
      renderSkeletons()
    ) : filteredBlogs.length > 0 ? (
      filteredBlogs.map((blog, index) => (
        <div className="col-12" key={index}>
          <div className="blog-item d-flex flex-column flex-md-row align-items-center align-items-md-start bg-white shadow rounded p-3">
            <img
              src={import.meta.env.VITE_DOMAIN + "/" + blog.blog_image}
              alt={blog.blog_title}
              className="rounded me-md-3 mb-3 mb-md-0"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <h2 className="h5 mb-2 fw-bold">{blog.blog_title}</h2>
              <p className="text-muted small mb-2">
                <button
                  className="btn btn-link text-decoration-none p-0"
                   onClick={(e) => {
                      e.stopPropagation(); // prevents triggering the parent click
                      onBlogClick(blog);
                    }}
                >
                  {blog?.category?.category_name}
                </button>{" "}
                | {new Date(blog.createdAt).toLocaleDateString("en-GB")}
              </p>
              <p
                className="blog-description mb-0 text-muted"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.short_description),
                }}
              ></p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-muted">No blogs found for this category.</p>
    )}
  </div>
);
};

export default Blog;

