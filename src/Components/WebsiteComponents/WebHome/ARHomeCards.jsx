import React from "react";
import "./ARHomeCards.css";
import { Link } from "react-router-dom";
const ARHomeCards = () => {
  const cardsData = [
    {
      title: "Product Packaging",
      link: "/blog",
      text: "Integrate AR Code Magics on packaging for Augmented Reality digital experiences, easily scanned on Android and iOS devices.",
      image: "https://ar-code.com/images/product-packaging.webp",
      alt: "AR Code Magic Product Packaging",
    },
    {
      title: "Beverage Packaging",
      link: "/blog",
      text: "Employ AR QR Codes on drink packaging for immersive AR experiences, to boost brand engagement.",
      image: "https://ar-code.com/images/food-packaging.webp",
      alt: "AR Code Magic Food Packaging",
    },
    {
      title: "Event Banners & Posters",
      link: "/blog",
      text: "Incorporate AR Code Magics on signage for interactive content such as product demos and event schedules.",
      image: "https://ar-code.com/images/banners-posters.webp",
      alt: "AR Code Magic Banners Posters",
    },
    {
      title: "Business Cards",
      link: "/blog",
      text: "Utilize ARCodes on business cards for quick access to contact information or product details in 3D.",
      image: "https://ar-code.com/images/business-cards.webp",
      alt: "AR Code Magic Banners Posters",
    },


    {
      title: "Brochures, Flyers, and Menus",
      link: "/blog",
      text: "AR Code Magics can also be used on business cards for the instant access to the 3D Model of a product data and contact information.",
      image: "https://ar-code.com/images/product-packaging.webp",
      alt: "AR Code Magic Product Packaging",
    },
    {
      title: "Labels and Stickers ",
      link: "/blog",
      text: "These AR Code Magics are also helpful in the marketing strategies of restaurant menus. Also, apply AR Code Magics to tags and decals for educational augmented reality digital activities.",
      image: "https://ar-code.com/images/food-packaging.webp",
      alt: "AR Code Magic Food Packaging",
    },
    {
      title: "Books, Guides, and Magazines",
      link: "/blog",
      text: "Publications that contain interactive material, such as AR films or AR 3D models, should incorporate AR QR Codes. ",
      image: "https://ar-code.com/images/banners-posters.webp",
      alt: "AR Code Magic Banners Posters",
    },
    {
      title: "Bottles and Cans ",
      link: "/blog",
      text: "Add augmented reality QR codes to drink containers to create captivating content and immersive AR experiences. ",
      image: "https://ar-code.com/images/business-cards.webp",
      alt: "AR Code Magic Banners Posters",
    },





  ];

  return (
    <div className="container my-5">
      <div className="row">
        {cardsData.map((card, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
            <div className="card h-100 shadow border-0">
              <div className="card-body text-center">
                {/* Card Title */}
                <h4 className="hm-card-titlehh">
                  <Link
                    to={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    {card.title}
                  </Link>
                </h4>

                {/* Card Image */}
                <Link
                  to={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block my-3"
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="img-fluid"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </Link>

                {/* Card Text */}
                <p className="card-text text-muted truncate-text">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ARHomeCards;
