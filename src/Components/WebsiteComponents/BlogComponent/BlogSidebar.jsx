import React from "react";

const BlogSidebar = () => {
  const latestPosts = [
    {
      id: 78,
      title: "From Video to 3D Modeling: Photogrammetry with AR Code Object Capture on MacBook M-Series",
      link: "/blog",
    },
    {
      id: 77,
      title: "Personalize Your AR Codes with Innovative Design Options",
      link: "/blog",
    },
    {
      id: 76,
      title: "AR Code's Low-Power SLAM: Augmented Reality for Everyone, Everywhere",
      link: "/blog",
    },
    // Add more blog posts as needed
  ];

  return (
    <div className="blog-sidebar">
      {/* Start Creating and Managing Section */}
      <div className="bg-white p-4 rounded shadow-sm mt-4 mt-lg-0">
        <center>
          <span >
            Start creating and managing your Augmented Reality Code experiences.
          </span>
          <p className="text-center mt-3 mb-0">
            <a
              href="/user/register"
              className="btn btn-custom btn-lg btn-success rounded-pill"
            >
              Get Started
            </a>
          </p>
        </center>
      </div>

      {/* AR Code Object Capture Section */}
      <div className="bg-white p-4 rounded shadow-sm mt-4">
        <span className="h4">
          <center>
            <strong>
              <a className="text-decoration-none" href="https://ar-code.com/page/object-capture">
                AR Code Object Capture
              </a>
            </strong>
          </center>
        </span>
        <span >
          <center>
            Create AR Codes instantly for any object with 3D scans from your
            iPhone Pro or iPad Pro.
          </center>
        </span>
        <center>
          <a href="https://ar-code.com/page/object-capture">
            <img
              src="https://ar-code.com/images/ar-code-3d-scan-app.webp"
              alt="AR Code Object Capture"
              width="60%"
              height="80%"
              style={{ marginBottom: "30px" }}
            />
          </a>
        </center>
        <center>
          <a href="https://ar-code.com/y5CuYCxIz" target="_blank" rel="noopener noreferrer">
            <img
              src="https://ar-code.com/images/sushi-3dscan-ar-qr-code.webp"
              alt="Sushi 3D Scan"
              width="200px"
            />
          </a>
          <br />
          <br />
        </center>
      </div>

      {/* Latest Blog Posts Section */}
      <div className="bg-white p-4 rounded shadow-sm mt-4 widgets" id="widget_top_posts">
        <p className="blog"></p>
        <center className="">
          <strong className="text-primary-color fw-bold h4">Latest Blog Posts</strong>
        </center>
        <ul className="mt-4 list-unstyled">
          {latestPosts.map((post) => (
            <li key={post.id} className="blog  mt-3">
              <strong>
                <a className="text-decoration-none" href={post.link} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
