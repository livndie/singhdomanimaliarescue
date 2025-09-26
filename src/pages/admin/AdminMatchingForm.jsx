// src/pages/admin/AdminMatchingForm.jsx
import React, { useMemo, useState } from "react";
import "../../styles/admin.css";

import {
  getEvents,
  getVolunteers,
  assignVolunteer,
  isAssigned,
} from "../../lib/adminStore.js";

export default function AdminMatchingForm() {
  const events = getEvents();
  const volunteers = getVolunteers();

  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || "");
  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId),
    [events, selectedEventId]
  );

  // Score function: skills (2 each) + date (1) + time-of-day match (1)
  const score = (vol, evt) => {
    let pts = 0;
    const req = new Set(evt.requiredSkills || []);
    const has = new Set(vol.skills || []);
    req.forEach((s) => {
      if (has.has(s)) pts += 2;
    });
    if ((vol.availability || []).includes(evt.date)) pts += 1;
    if (evt.timeOfDay && (vol.timePreferences || []).includes(evt.timeOfDay)) pts += 1;
    return pts;
  };

  const ranked = useMemo(() => {
    if (!selectedEvent) return [];
    return volunteers
      .map((v) => ({ v, pts: score(v, selectedEvent) }))
      .sort((a, b) => b.pts - a.pts);
  }, [volunteers, selectedEvent]);

  const onAssign = (volId) => {
    if (!selectedEvent) return;
    if (isAssigned(volId, selectedEvent.id)) return;
    assignVolunteer(volId, selectedEvent.id);
    alert("Assigned!");
  };

  if (!selectedEvent) {
    return (
      <main className="admin-root">
        <section className="admin-card">
          <h1 className="admin-title">Volunteer Matching</h1>
          <p>No events available.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-root">
      <section className="admin-card">
        <h1 className="admin-title">Volunteer Matching</h1>

        <div className="field" style={{ maxWidth: 520 }}>
          <label>Choose Event</label>
          <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} — {e.date} {e.timeOfDay ? `• ${e.timeOfDay}` : ""}
              </option>
            ))}
          </select>
          <div className="help">
            Required: {(selectedEvent.requiredSkills || []).join(", ") || "None"} • Time:{" "}
            {selectedEvent.timeOfDay || "—"}
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Volunteer</th>
                <th>Skills</th>
                <th>Avail. Dates</th>
                <th>Time Prefs</th>
                <th style={{ width: 120 }}>Score</th>
                <th style={{ width: 120 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map(({ v, pts }) => (
                <tr key={v.id}>
                  <td><strong>{v.name}</strong></td>
                  <td>{v.skills?.join(", ") || "—"}</td>
                  <td>{v.availability?.join(", ") || "—"}</td>
                  <td>{v.timePreferences?.join(", ") || "—"}</td>
                  <td><span className="badge badge-medium">{pts}</span></td>
                  <td>
                    <button className="btn btn-primary" onClick={() => onAssign(v.id)}>
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}