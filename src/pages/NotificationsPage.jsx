import React from "react";

export default function NotificationsPage() {
  return (
    <div className="admin-dashboard">
      <h1>Notifications</h1>
      <p className="subtitle">Recent messages for admins and volunteers.</p>
      <div className="card">
        <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.7 }}>
          <li>New assignment: Dog Walking – Oct 1</li>
          <li>Reminder: Training session on Sept 28</li>
          <li>Thank you for volunteering at Singhdom Animalia Rescue!</li>
        </ul>
      </div>
    </div>
  );
}
