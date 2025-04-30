import React, { useState } from "react";
import TabButtons from "../../Components/WebsiteComponents/BlogComponent/TabButtons";
import Blog from "../../Components/WebsiteComponents/BlogComponent/Blog";
import Pagination from "../../Components/WebsiteComponents/BlogComponent/Pagination";
import BlogDetails from "../../Components/WebsiteComponents/BlogComponent/BlogDetails";
import BlogSidebar from "../../Components/WebsiteComponents/BlogComponent/BlogSidebar";

function BlogPage() {
  const [activeTab, setActiveTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog
  const blogsPerPage = 7;

  const blogs = [
    {
      title: "From Video to 3D Modeling: Photogrammetry with AR Code Object Capture",
      date: "31/12/2024",
      category: "Apple ARKit",
      image: "https://ar-code.com/images/ar-portal-visionos.webp",
      description:
        "Our AR Code Object Capture app is now available for MacBook M-series devices running macOS 15.0 or later...",
      link: "https://ar-code.com/blog/video-to-3d-modeling-photogrammetry-ar-code-object-capture-now-on-macbook-m-series",
    },
    {
      title: "Exploring the Metaverse: Opportunities and Challenges",
      date: "01/01/2025",
      category: "Metaverse",
      image: "https://ar-code.com/images/second-life.webp",
      description:
        "Discover the latest developments in the metaverse and how it’s shaping the future of technology...",
      link: "https://ar-code.com/blog/metaverse-exploration",
    },
    {
      title: "Creating Realistic 3D Models with AR Code",
      date: "15/01/2025",
      category: "3D Models",
      image: "https://ar-code.com/images/macos-object-capture.webp",
      description:
        "Learn how AR Code's advanced tools help you create detailed 3D models quickly and efficiently. Learn how AR Code's advanced tools help you create detailed 3D models quickly and efficiently.Learn how AR Code's advanced tools help you create detailed 3D models quickly and efficiently.  ",
      link: "https://ar-code.com/blog/creating-realistic-3d-models",
    },
    {
      title: "Unveiling the Power of Apple Vision Pro",
      date: "20/01/2025",
      category: "Apple Vision Pro",
      image: "https://ar-code.com/images/apple-vision-pro.webp",
      description:
        "Discover the groundbreaking features of Apple Vision Pro and its applications in AR development. Discover the groundbreaking features of Apple Vision Pro and its applications in AR development.Discover the groundbreaking features of Apple Vision Pro and its applications in AR development.",
      link: "https://ar-code.com/blog/apple-vision-pro-unveiled",
    },
    {
      title: "Advancements in AR Code Technology",
      date: "25/01/2025",
      category: "AR Code Tech",
      image: "https://ar-code.com/images/mw3QkGasX.webp",
      description:
        "Explore the latest updates and features introduced in AR Code's technology platform.",
      link: "https://ar-code.com/blog/advancements-in-ar-code-tech",
    },
    {
      title: "Top AR Glasses & Headsets for 2025",
      date: "30/01/2025",
      category: "AR Glasses & Headsets",
      image: "https://ar-code.com/images/nreal-ar-glasses-l500.jpg",
      description:
        "A comprehensive guide to the best AR glasses and headsets available in 2025.",
      link: "https://ar-code.com/blog/top-ar-glasses-and-headsets-2025",
    },
    {
      title: "Your Questions About AR Code Answered",
      date: "05/02/2025",
      category: "Q & A",
      image: "https://ar-code.com/images/2pZAPgHSW.webp",
      description:
        "Get answers to the most common questions about using AR Code and its features.",
      link: "https://ar-code.com/blog/ar-code-q-and-a",
    },
    {
      title: "Revolutionizing QR Code Tech with AR Code",
      date: "10/02/2025",
      category: "QR Code Tech",
      image: "https://ar-code.com/images/ar-code-drone.webp",
      description:
        "Learn how AR Code is transforming the way we use QR codes in everyday life.",
      link: "https://ar-code.com/blog/revolutionizing-qr-code-tech",
    },
    {
      title: "Step-by-Step Tutorials for AR Beginners",
      date: "15/02/2025",
      category: "Tutorials",
      image: "https://ar-code.com/images/ar-code-studio.webp",
      description:
        "Beginner-friendly tutorials to get started with AR development using AR Code.",
      link: "https://ar-code.com/blog/ar-beginners-tutorials",
    },
    {
      title: "Join Our Upcoming Webinar on AR Development",
      date: "20/02/2025",
      category: "Webinar",
      image: "https://ar-code.com/images/blippar-vs-ar-code.webp",
      description:
        "Register for our upcoming webinar to learn from experts about the future of AR development.",
      link: "https://ar-code.com/blog/upcoming-ar-webinar",
    },
    
  ];

  const tabs = [
    "3D Models",
    "Apple Vision Pro",
    "Apple ARKit",
    "AR Code Tech",
    "AR Glasses & Headsets",
    "Metaverse",
    "Q & A",
    "QR Code Tech",
    "Tutorials",
    "Webinar",
  ];

  const handleTabChange = (selectedTab) => {
    setActiveTab(selectedTab);
    setCurrentPage(1);
    setSelectedBlog(null); // Reset selected blog when switching tabs
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setSelectedBlog(null); // Reset selected blog on search
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTab = activeTab ? blog.category === activeTab : true;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">AR Code Blog</h2>
      <div className="mb-4 d-flex justify-content-center">
        <TabButtons tabs={tabs} onTabChange={handleTabChange} />
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="mb-4">
            {/* Conditional rendering for Blog or BlogDetails */}
            {selectedBlog ? (
              <BlogDetails blog={selectedBlog} />
            ) : (
              <Blog
                blogs={paginatedBlogs}
                activeTab={activeTab}
                onBlogClick={setSelectedBlog} // Pass the handler
              />
            )}
          </div>

          {!selectedBlog && filteredBlogs.length > blogsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalBlogs={filteredBlogs.length}
              blogsPerPage={blogsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
        <div className="col-lg-4 mt-4 mt-lg-0">
          {/*Blog Details Sidebar  */}
          <BlogSidebar/>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
