import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p className="subtitle">Manage events, volunteers, and notifications all in one place.</p>

      <div className="dashboard-grid">
        {/* Event Management */}
        <div className="dashboard-card">
          <div className="icon" style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
          <h2>Event Management</h2>
          <p>Create and manage upcoming events for volunteers.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link to="/admin/events" className="btn">Create an Event</Link>
            <Link to="/admin/events/manage" className="btn btn-outline">Manage Events</Link>
          </div>
        </div>

        {/* Volunteer Matching */}
        <div className="dashboard-card">
          <div className="icon" style={{ fontSize: 32, marginBottom: 12 }}>🧩</div>
          <h2>Volunteer Matching</h2>
          <p>Match volunteers to events based on their skills and availability.</p>
          <Link to="/admin/matching" className="btn">Match Volunteers</Link>
        </div>

        {/* Notifications (stub for later) */}
        <div className="dashboard-card">
          <div className="icon" style={{ fontSize: 32, marginBottom: 12 }}>🔔</div>
          <h2>Notifications</h2>
          <p>Send and view messages between admins and volunteers.</p>
          <Link to="/admin/notifications" className="btn">Open Inbox</Link>
        </div>
      </div>
    </div>
  );
}