import React, { useEffect, useState } from "react";
import {
  getEvents,
  updateEvent,
  deleteEvent,
  countAssigned,
  getAssignedVolunteers,
} from "../../lib/adminStore.js";
import { SKILLS, URGENCY } from "../../lib/adminData.js";

export default function ManageEvents() {
  // Top-level hooks only (no hooks inside map/conditions)
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState({
    name: "",
    description: "",
    location: "",
    requiredSkills: [],
    urgency: "",
    date: "",
  });
  const [openVolunteersFor, setOpenVolunteersFor] = useState(null);

  // Load list once on mount (and after we mutate)
  useEffect(() => {
    setEvents(getEvents());
  }, []);

  // Start editing a row
  const startEdit = (evt) => {
    setEditId(evt.id);
    setEdit({
      name: evt.name || "",
      description: evt.description || "",
      location: evt.location || "",
      requiredSkills: Array.isArray(evt.requiredSkills) ? evt.requiredSkills : [],
      urgency: evt.urgency || "",
      date: evt.date || "",
    });
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = () => {
    updateEvent(editId, {
      name: edit.name.trim(),
      description: edit.description.trim(),
      location: edit.location.trim(),
      requiredSkills: [...edit.requiredSkills],
      urgency: edit.urgency,
      date: edit.date,
    });
    setEvents(getEvents());
    setEditId(null);
  };

  const remove = (id) => {
    if (!confirm("Delete this event?")) return;
    deleteEvent(id);
    setEvents(getEvents());
  };

  const toggleVolunteers = (eventId) => {
    setOpenVolunteersFor((prev) => (prev === eventId ? null : eventId));
  };

  const handleSkillToggle = (skill) => {
    setEdit((e) => {
      const has = e.requiredSkills.includes(skill);
      return {
        ...e,
        requiredSkills: has
          ? e.requiredSkills.filter((s) => s !== skill)
          : [...e.requiredSkills, skill],
      };
    });
  };

  return (
    <main className="about-root">
      <section className="about-section">
        <h1 className="about-title">Manage Events</h1>

        {events.length === 0 ? (
          <div className="card">
            <p>No events yet. Create one from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="card" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={th}>Name</th>
                  <th style={th}>Date</th>
                  <th style={th}>Urgency</th>
                  <th style={th}>Location</th>
                  <th style={th}>Required Skills</th>
                  <th style={th}>Assigned</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt) => {
                  const isEditing = editId === evt.id;
                  const assignedCount = countAssigned(evt.id);
                  const volunteers =
                    openVolunteersFor === evt.id
                      ? getAssignedVolunteers(evt.id)
                      : [];

                  return (
                    <React.Fragment key={evt.id}>
                      <tr>
                        {/* Name */}
                        <td style={td}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={edit.name}
                              onChange={(e) =>
                                setEdit((x) => ({ ...x, name: e.target.value }))
                              }
                            />
                          ) : (
                            evt.name
                          )}
                        </td>

                        {/* Date */}
                        <td style={td}>
                          {isEditing ? (
                            <input
                              type="date"
                              value={edit.date}
                              onChange={(e) =>
                                setEdit((x) => ({ ...x, date: e.target.value }))
                              }
                            />
                          ) : (
                            evt.date
                          )}
                        </td>

                        {/* Urgency */}
                        <td style={td}>
                          {isEditing ? (
                            <select
                              value={edit.urgency}
                              onChange={(e) =>
                                setEdit((x) => ({
                                  ...x,
                                  urgency: e.target.value,
                                }))
                              }
                            >
                              <option value="">Select…</option>
                              {URGENCY.map((u) => (
                                <option key={u} value={u}>
                                  {u}
                                </option>
                              ))}
                            </select>
                          ) : (
                            evt.urgency
                          )}
                        </td>

                        {/* Location */}
                        <td style={td}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={edit.location}
                              onChange={(e) =>
                                setEdit((x) => ({
                                  ...x,
                                  location: e.target.value,
                                }))
                              }
                            />
                          ) : (
                            evt.location
                          )}
                        </td>

                        {/* Required Skills */}
                        <td style={td}>
                          {isEditing ? (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              {SKILLS.map((s) => (
                                <label
                                  key={s}
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "2px 8px",
                                    borderRadius: 12,
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={edit.requiredSkills.includes(s)}
                                    onChange={() => handleSkillToggle(s)}
                                    style={{ marginRight: 6 }}
                                  />
                                  {s}
                                </label>
                              ))}
                            </div>
                          ) : (
                            (evt.requiredSkills || []).join(", ")
                          )}
                        </td>

                        {/* Assigned */}
                        <td style={td}>
                          <button
                            type="button"
                            className="about-contact-link"
                            onClick={() => toggleVolunteers(evt.id)}
                          >
                            {assignedCount} volunteer{assignedCount === 1 ? "" : "s"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td style={td}>
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                className="about-contact-link"
                                onClick={saveEdit}
                              >
                                Save
                              </button>
                              {" "}
                              <button
                                type="button"
                                className="about-contact-link"
                                onClick={cancelEdit}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="about-contact-link"
                                onClick={() => startEdit(evt)}
                              >
                                Edit
                              </button>
                              {" "}
                              <button
                                type="button"
                                className="about-contact-link"
                                onClick={() => remove(evt.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>

                      {/* Volunteer dropdown row */}
                      {openVolunteersFor === evt.id && (
                        <tr>
                          <td style={td} colSpan={7}>
                            {volunteers.length === 0 ? (
                              <em>No volunteers assigned.</em>
                            ) : (
                              <ul style={{ margin: 0, paddingLeft: 18 }}>
                                {volunteers.map((v) => (
                                  <li key={v.id}>{v.name} — {v.skills.join(", ")}</li>
                                ))}
                              </ul>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

// light table styles
const th = {
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
  padding: "8px 10px",
  whiteSpace: "nowrap",
};
const td = {
  borderBottom: "1px solid #f1f5f9",
  padding: "8px 10px",
  verticalAlign: "top",
};
