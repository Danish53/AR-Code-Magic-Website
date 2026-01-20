import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useToken from "../../../hooks/useToken";

function DC_Customlogs({ pageId }) {
    const [pageDetails, setPageDetails] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useToken();

    useEffect(() => {
        if (!pageId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_DOMAIN}/api/v1/user/custom-pages/${pageId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPageDetails(res.data.data.page);
                setLogs(res.data.data.logs);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load scan logs");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!pageDetails && !loading) {
        return (
            <div className="alert alert-warning text-center my-4">
                Page not found or no access.
            </div>
        );
    }

    return (
        <div className="card p-4 shadow-sm rounded-3">
            <h4 className="fw-bold mb-3">{pageDetails?.custom_title}</h4>
            <p className="text-muted mb-4">{pageDetails?.custom_message}</p>

            <h5 className="fw-semibold mb-3">Scan Logs</h5>
            {logs.length === 0 ? (
                <p className="text-secondary">No scan logs found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Date</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Device</th>
                                <th>Browser</th>
                                <th>IP</th>
                                <th>Operating System</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => (
                                <tr key={index}>
                                    <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                                    <td>{log.city || "Unknown"}</td>
                                    <td>{log.country || "Unknown"}</td>
                                    <td>{log.device || "Unknown"}</td>
                                    <td>{log.browser || "Unknown"}</td>
                                    <td>{log.ip_address || "Unknown"}</td>
                                    <td>{log.os || "Unknown"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
}

export default DC_Customlogs;
