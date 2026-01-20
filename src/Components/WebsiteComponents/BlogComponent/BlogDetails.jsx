

import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import DOMPurify from "dompurify";
// import "./BlogDetails.css"; // For additional styling

const BlogDetails = ({ blog }) => {
  return (
    <div className="blog-details-container container my-5">
      {/* Blog Header */}
      <div className="blog-header text-center mb-4">
        <h2 className="blog-title text-primary fw-bold">
          {blog?.blog_title}
        </h2>
        <div className="blog-meta d-flex justify-content-center align-items-center text-muted">
          <span className="me-3">
            <strong>Category:</strong> {blog.category?.category_name}
          </span>
          <span>
            <strong>Date:</strong> {new Date(blog.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
      </div>

      {/* Blog Image */}
      <div className="blog-image text-center mb-4">
        <img
          src={import.meta.env.VITE_DOMAIN + "/" + blog.blog_image}
          alt={blog.blog_title}
          className="img-fluid rounded shadow-sm"
        />
      </div>

      {/* Blog Description */}
      <div className="blog-detail-description mb-4">
        {/* <p className="fs-5 text-secondary lh-lg">{blog.description}</p> */}
        <p
          className="blog-description mb-0 text-muted"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.short_description),
          }}
        ></p>
        <p
          className="blog-description mb-0 mt-2 text-muted"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.long_description),
          }}
        ></p>
      </div>

      {/* Blog Video */}
      {/* <div className="blog-video text-center mb-4">
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
      </div> */}

      {/* Blog Details */}
      {/* <div className="blog-details-section">
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
      </div> */}

      {/* Blog Sharing */}
      <div className="blog-sharing text-center mt-5">
        <h3 className="fw-bold text-primary text-dark mb-3">Share this blog</h3>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-outline-success btn-lg d-flex align-items-center gap-2"
            data-sharer="twitter"
            data-title={blog.blog_title}
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
            data-title={blog.blog_title}
            data-url={blog.link}
            data-subject={blog.blog_title}
          >
            <FaEnvelope /> Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;