import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalBlogs, blogsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const handleFirst = () => onPageChange(1);
  const handleLast = () => onPageChange(totalPages);
  const handlePrevious = () => onPageChange(currentPage - 1);
  const handleNext = () => onPageChange(currentPage + 1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 4; // Number of pages to show before and after the current page
    const startPage = Math.max(currentPage - range, 1);
    const endPage = Math.min(currentPage + range, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          <button
            className="page-link"
            style={{
              backgroundColor: currentPage === i ? "var(--primary-color)" : "transparent",
              color: currentPage === i ? "#FFFFFF" : "var(--primary-color)",
              borderColor: "var(--primary-color)",
            }}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        {currentPage > 1 && (
          <>
            <li className="page-item">
              <button
                className="page-link"
                onClick={handleFirst}
                style={{
                  color: "var(--primary-color)",
                  borderColor: "var(--primary-color)",
                }}
              >
                First
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={handlePrevious}
                style={{
                  color: "var(--primary-color)",
                  borderColor: "var(--primary-color)",
                }}
              >
                Previous
              </button>
            </li>
          </>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <>
            <li className="page-item">
              <button
                className="page-link"
                onClick={handleNext}
                style={{
                  color: "#003C5E",
                  borderColor: "#003C5E",
                }}
              >
                Next
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={handleLast}
                style={{
                  color: "#003C5E",
                  borderColor: "#003C5E",
                }}
              >
                Last
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalBlogs: PropTypes.number.isRequired,
  blogsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
