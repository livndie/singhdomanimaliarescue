import React from "react";
import {Link} from "react-router-dom";

const VolunteerDashboard = () =>{
    return(
        <div className="dashboard-root">
            <h1>Volunteer Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/history">Volunteer History</Link></li>
                    <li><Link to="/profile">Edit Profile</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                </ul>
            </nav>
            <p>Welcome back, [Volunteer Name] ! Use the links above to manage your volunteering activity.</p>
        </div>
    );
};
export default VolunteerDashboard;