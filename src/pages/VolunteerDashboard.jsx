import React from "react";
import { Link } from "react-router-dom";
import "../styles/VolunDashboard.css"

const VolunteerDashboard = () => {
return (
    <div className="dashboard-root">
        <section className="dashboard-section">
            <h1 className="dashboard-title">Volunteer Dashboard</h1>
            <div className="dashboard-grid">
            <div className="dashboard-card">
                <h2>Volunteer History</h2>
                <p>View all your past volunteering activities and logged hours.</p>
                <Link to="/history" className="dashboard-btn">
                    View History
                </Link>
            </div>

            <div className="dashboard-card">
                <h2>Edit Profile</h2>
                <p>Update your personal info and availability settings.</p>
                <Link to="/profile" className="dashboard-btn">
                    Edit Profile
                </Link>
            </div>

            <div className="dashboard-card">
                <h2>Notifications</h2>
                <p>Check for new assignments, messages, or updates.</p>
                <Link to="/notifications" className="dashboard-btn">
                    View Notifications
                </Link>
            </div>
            
            </div>
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
                Welcome back, <strong>[Volunteer Name]</strong>! Use the links above to
                manage your volunteering activity.
            </p>
        </section>
    </div>
);
};

export default VolunteerDashboard;
