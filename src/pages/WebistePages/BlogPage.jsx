import React, { useEffect, useState } from "react";
import TabButtons from "../../Components/WebsiteComponents/BlogComponent/TabButtons";
import Blog from "../../Components/WebsiteComponents/BlogComponent/Blog";
import Pagination from "../../Components/WebsiteComponents/BlogComponent/Pagination";
import BlogDetails from "../../Components/WebsiteComponents/BlogComponent/BlogDetails";
import BlogSidebar from "../../Components/WebsiteComponents/BlogComponent/BlogSidebar";
import axios from "axios";

function BlogPage() {
  const [activeTab, setActiveTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog
  const blogsPerPage = 7;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_DOMAIN + "/api/v1/user/blog-categories");
        setCategories(res.data.categories);
      } catch (err) {
        setError(err.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_DOMAIN + "/api/v1/user/blogs");
        setBlogs(res.data.blog);
      } catch (err) {
        setError(err.message || "Failed to fetch Blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories_skelton = () => {
    return (
      <ul className="nav justify-content-center my-4">
        {[...Array(5)].map((_, i) => (
          <li className="nav-item" key={i}>
            <div className="nav-link skeleton-tab"></div>
          </li>
        ))}
      </ul>
    );
  }

  // if (loading) return <p className="text-center mt-4">Loading categories...</p>;
  // if (error) return <p className="text-danger text-center mt-4">{error}</p>;

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
    const matchesTab = activeTab ? blog.category.category_name === activeTab : true;
    const matchesSearch = blog.blog_title
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
        {
          loading ? categories_skelton() : <TabButtons categories={categories} onTabChange={handleTabChange} />
        }
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
                onBlogClick={setSelectedBlog}
                loading={loading}
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
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
