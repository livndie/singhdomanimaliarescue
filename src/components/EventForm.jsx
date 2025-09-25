import React, { useEffect, useState } from 'react';
import '../styles/admin.css';

//Skills that administrators can mark as required for an event
const SKILLS = [
  'Dog walking',
  'Cat care',
  'Small animal handling',
  'Animal grooming',
  'Cleaning & sanitation',
  'Feeding',
  'Laundry & bedding maintenance',
  'Facility upkeep',
  'Photography & social media',
  'Fundraising & donations management',
  'Administrative / clerical skills',
  'First aid',
  'Customer service',
  'Teamwork',
];

//Indicate the importance of the event
const URGENCY = ['Low', 'Medium', 'High', 'Critical'];

const EventForm = () => {
  //Store form input values
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    skills: [],
    urgency: '',
    date: '',
  });

  //Store validation errors
  const [errors, setErrors] = useState({});

  //User can immediately start typing in the Event Name field without clicking it
  useEffect(() => {
    const el = document.getElementById('evt-name');
    if (el) el.focus();
  }, []);

  //Handle text input changes for all fields except skills
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  //Handle checkbox changes for skills
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setForm((f) => ({
      ...f,
      skills: checked ? [...f.skills, value] : f.skills.filter((s) => s !== value),
    }));
  };

  //Validation logic
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Event Name is required.';
    else if (form.name.length > 100) newErrors.name = 'Event Name must be ≤ 100 characters.';
    if (!form.description.trim()) newErrors.description = 'Event Description is required.';
    if (!form.location.trim()) newErrors.location = 'Location is required.';
    if (form.skills.length === 0) newErrors.skills = 'Please select at least one skill.';
    if (!form.urgency) newErrors.urgency = 'Please choose an urgency.';
    if (!form.date) newErrors.date = 'Please select a date.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('Event payload:', form);
    alert('Event created!\n\n' + JSON.stringify(form, null, 2));

    setForm({ name: '', description: '', location: '', skills: [], urgency: '', date: '' });
    setErrors({});
  };

  //Create the form UI
  return (
    <div className="admin-page">{/*new*/}
      <div className="card">{/*new*/}
        <h2 style={{ marginTop: 0 }}>Create Event</h2>
        <form onSubmit={handleSubmit} className="event-form" noValidate>
          {/* Event Name */}
          <div className="field">
            <label htmlFor="evt-name">Event Name *</label>
            <input
              id="evt-name"
              type="text"
              name="name"
              maxLength={100}
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Max 100 characters"
            />
            <div className="help">{form.name.length}/100</div>
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          {/* Event Description */}
          <div className="field">
            <label htmlFor="evt-description">Event Description *</label>
            <textarea
              id="evt-description"
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the event goals, logistics, etc."
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>

          {/* Location */}
          <div className="field">
            <label htmlFor="evt-location">Location *</label>
            <textarea
              id="evt-location"
              name="location"
              required
              rows={3}
              value={form.location}
              onChange={handleChange}
              placeholder="Address, venue, or meeting point"
            />
            {errors.location && <div className="error">{errors.location}</div>}
          </div>

          {/* Required Skills */}
          <div className="field">
            <label>Required Skills *</label>
            <div className="check-grid">
              {SKILLS.map((skill) => (
                <label key={skill} className="check-pill">
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    checked={form.skills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
            {errors.skills && <div className="error">{errors.skills}</div>}
          </div>

          {/* Urgency */}
          <div className="field">
            <label htmlFor="evt-urgency">Urgency *</label>
            <select
              id="evt-urgency"
              name="urgency"
              required
              value={form.urgency}
              onChange={handleChange}
            >
              <option value="">Select urgency…</option>
              {URGENCY.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            {errors.urgency && <div className="error">{errors.urgency}</div>}
          </div>

          {/* Event Date */}
          <div className="field">
            <label htmlFor="evt-date">Event Date *</label>
            <input
              id="evt-date"
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
            />
            {errors.date && <div className="error">{errors.date}</div>}
          </div>

          {/* Submit Button */}
          <div className="actions" style={{ marginTop: '0.75rem' }}>
            <button type="submit">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;