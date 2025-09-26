import React from "react";
import "../styles/volunteerHistory.css";

const HistoryPage = () => {
    return (
        <div className="history-root"> 
            <h1 className="history-title">Your Volunteer History</h1>
                <table className="history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sept 10, 2025</td>
                        <td>Dog Park Cleanup</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Aug 21, 2025</td>
                        <td>Dog Grooming</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default HistoryPage;