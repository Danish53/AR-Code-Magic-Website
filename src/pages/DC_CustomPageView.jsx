import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function DC_CustomPageView() {
    const { id } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const token = localStorage.getItem("token");

                // 1️⃣ Fetch custom page details
                const { data } = await axios.get(
                    `${import.meta.env.VITE_DOMAIN}/api/v1/user/custom-pages/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setPage(data.data.page);

                // 2️⃣ Save scan log (tracking)
                await axios.get(
                    `${import.meta.env.VITE_DOMAIN}/api/v1/user/saveScanLog/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

            } catch (err) {
                toast.error("Failed to load page or track visit!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [id]);

      useEffect(() => {
        const fetchCount = async () => {
          try {
            const {data} = await axios.get(`${import.meta.env.VITE_DOMAIN}/api/v1/user/track-scan/page/${id}`);
            // const {data} = await response.json();
            // console.log(data, "count");
          } catch (err) {
            // setError("Failed to fetch model");
            console.log("error")
          } finally {
            setLoading(false);
          }
        };
    
        if (id) {
          fetchCount();
        }
      }, [id]);


    if (loading) return <p style={{ textAlign: "center", marginTop: "5rem" }}>Loading...</p>;
    if (!page) return <p style={{ textAlign: "center", marginTop: "5rem", color: "red" }}>Page not found!</p>;

    const styles = {
        container: {
            //   maxWidth: "900px",
            //   margin: "3rem auto",
            background: "#fff",
            padding: "2.5rem",
            borderRadius: "15px",
            //   boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
            fontFamily: "'Roboto', sans-serif",
            transition: "transform 0.3s ease",
        },
        banner: {
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "1.5rem",
        },
        header: {
            display: "flex",
            alignItems: "center",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
        },
        logo: {
            width: "80px",
            height: "80px",
            objectFit: "contain",
            marginRight: "1rem",
            borderRadius: "10px",
            //   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        titleContainer: {
            display: "flex",
            flexDirection: "column",
        },
        referenceName: {
            fontSize: "1rem",
            color: "#6c757d",
            marginBottom: "0.3rem",
            fontWeight: 500,
        },
        title: {
            fontSize: "2rem",
            fontWeight: 700,
            color: "#343a40",
        },
        message: {
            fontSize: "1.1rem",
            lineHeight: "1.7",
            color: "#495057",
            marginBottom: "2rem",
        },
        button: {
            display: "inline-block",
            background: "linear-gradient(90deg, #28a745, #218838)",
            border: "none",
            color: "#fff",
            padding: "0.8rem 2rem",
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "50px",
            textDecoration: "none",
            transition: "all 0.3s ease",
        },
    };

    return (
        <div style={styles.container}>
            {/* Banner */}
            {page.banner && (
                <img
                    src={`${import.meta.env.VITE_DOMAIN}/uploads/${page.banner}`}
                    alt="Banner"
                    style={styles.banner}
                />
            )}

            {/* Logo & Title */}
            <div style={styles.header}>
                {page.custom_logo && (
                    <img
                        src={`${import.meta.env.VITE_DOMAIN}/uploads/${page.custom_logo}`}
                        alt="Logo"
                        style={styles.logo}
                    />
                )}
                <div style={styles.titleContainer}>
                    {/* Reference Name */}
                    <span style={styles.referenceName}>{page.reference_name}</span>
                    <h2 style={styles.title}>{page.custom_title}</h2>
                </div>
            </div>

            {/* Message */}
            <p style={styles.message}>{page.custom_message}</p>

            {/* Visit website button */}
            <a
                href={page.website_url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.button}
                onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #218838, #1e7e34)"}
                onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #28a745, #218838)"}
            >
                Visit Website
            </a>
        </div>
    );
}

export default DC_CustomPageView;
