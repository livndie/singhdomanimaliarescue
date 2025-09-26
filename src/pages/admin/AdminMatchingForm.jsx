import React, { useMemo, useState, useEffect } from "react";
import { getVolunteers, getEvents, assignVolunteer, isAssigned } from "../../lib/adminStore.js";

const score = (vol, evt) => {
  const skillPts = evt.requiredSkills.reduce((acc, s) => acc + (vol.skills.includes(s) ? 1 : 0), 0);
  const availPt = vol.availability.includes(evt.date) ? 1 : 0;
  return skillPts + availPt;
};

export default function AdminMatchingForm() {
  const [events] = useState(getEvents());
  const [volunteers] = useState(getVolunteers());
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || "");
  const selectedEvent = useMemo(() => events.find(e => e.id === selectedEventId), [events, selectedEventId]);

  const candidates = useMemo(() => {
    if (!selectedEvent) return [];
    return volunteers
      .map(v => ({ v, s: score(v, selectedEvent) }))
      .filter(x => x.s > 0) // only somewhat relevant
      .sort((a,b) => b.s - a.s);
  }, [volunteers, selectedEvent]);

  const [refresh, setRefresh] = useState(0); // cheap rerender after assign

  const assign = (volId) => {
    assignVolunteer(volId, selectedEventId);
    setRefresh(r => r + 1);
  };

  return (
    <main className="about-root">
      <section className="about-section">
        <h1 className="about-title">Volunteer Matching</h1>

        <div className="about-mission" style={{ display: "grid", gap: 12 }}>
          <label>
            Event
            <select value={selectedEventId} onChange={e => setSelectedEventId(e.target.value)}>
              {events.map(evt => (
                <option key={evt.id} value={evt.id}>
                  {evt.name} — {evt.date} — needs: {evt.requiredSkills.join(", ")}
                </option>
              ))}
            </select>
          </label>

          <ul className="about-team-list">
            {candidates.map(({ v, s }) => (
              <li key={v.id} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <strong>{v.name}</strong> — score {s} — skills: {v.skills.join(", ")} — avail: {v.availability.join(", ")}
                {isAssigned(v.id, selectedEventId) ? (
                  <em style={{ marginLeft: 8 }}>(already assigned)</em>
                ) : (
                  <button type="button" className="about-contact-link" onClick={() => assign(v.id)}>
                    Assign
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
