import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/NotificationsPage.css";

const STORAGE_KEY = "notifications";

const NotificationsPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: "Admin", to: "All Volunteers", subject: "Saturday Clean-Up", body: "Arrive 9AM. Bring gloves." },
    { id: 2, from: "Event Lead", to: "Dog Walkers", subject: "5 puppies need walks", body: "We are short dog walkers." },
  ]);
  useEffect(() => {
    // read notifications saved in localStorage by EventForm.jsx (stub for now)
    // implement api call to backend later (when backend is ready) by replacing safereadlocal
    const stored = safeReadLocal(STORAGE_KEY);

    // normalize data 
    const normalizedStored = stored.map(n => ({
      id: n.id ?? String(Math.random()),
      from: n.from ?? "System",
      to: n.to ?? "All Volunteers",
      subject: n.subject ?? "(No subject)",
      body: n.body ?? "",
      createdAt: n.createdAt ?? new Date().toISOString(),
    }));

    // combine with existing messages (demo messages)
    const combined = [...normalizedStored, ...messages];

    // denies duplicates by id, keeping the first occurrence
    const seen = new Set();
    const deduped = combined.filter(msg => {
      if (seen.has(msg.id)) return false;
      seen.add(msg.id);
      return true;
    });

    //Sort newest first by createdAt if available, else by ID
    deduped.sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (aTime !== bTime) return bTime - aTime;
      // sort by ID
      const aId = Number(a.id), bId = Number(b.id);
      if (!Number.isNaN(aId) && !Number.isNaN(bId)) return bId - aId;
      return 0;
    });

    setMessages(deduped);
    
  }, []);

  return (
    <div className="notifications-container">
      <header className="notifications-header">
        <h1>
          Notifications
        </h1>
        <Link to="/" className="back-link">Back to Dashboard</Link>
      </header>

      {/* Recent messages */}
      <section className="card">
        <h2>Recent Notifications</h2>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <ul className="messages-list">
            {messages.map((m) => (
              <li key={m.id}>
                <div className="msg-subject">{m.subject}</div>
                <div className="msg-meta">From: {m.from} • To: {m.to}</div>
                <p>{m.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default NotificationsPage;

//Safely read and parse JSON from localStorage
function safeReadLocal(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}