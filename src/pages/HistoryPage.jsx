import React, { useEffect, useState } from "react";
import "../styles/volunteerHistory.css";

const testData = [
  {
    eventName: "Dog Park Cleanup",
    date: "2025-09-10",
    time: "09:00 AM - 11:00 AM",
    location: "Central Dog Park",
  },
  {
    eventName: "Dog Grooming",
    date: "2025-08-21",
    time: "01:00 PM - 04:00 PM",
    location: "Shelter Main Facility",
  },
  {
    eventName: "Fundraiser Booth",
    date: "2025-07-15",
    time: "10:00 AM - 02:00 PM",
    location: "Community Center",
  },
];

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHistory(testData);
    }, 500);
  }, []);

  return (
    <div className="vol-history-root">
      <h1 className="vol-history-title">Your Volunteer History</h1>
      <table className="vol-history-table">
        <thead>
          <tr>
            <th className="vol-history-th">Event Name</th>
            <th className="vol-history-th">Date</th>
            <th className="vol-history-th">Time</th>
            <th className="vol-history-th">Location</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan={4} className="vol-history-loading">Loading...</td>
            </tr>
          ) : (
            history.map((event, idx) => (
              <tr key={idx} className="vol-history-row">
                <td className="vol-history-td">{event.eventName}</td>
                <td className="vol-history-td">{new Date(event.date).toLocaleDateString()}</td>
                <td className="vol-history-td">{event.time}</td>
                <td className="vol-history-td">{event.location}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;