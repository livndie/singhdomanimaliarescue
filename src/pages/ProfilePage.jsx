import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { UsaStates } from 'usa-states';

const US_STATES = new UsaStates().states;


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
  'Teamwork'
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIMES = ['Morning', 'Afternoon', 'Evening'];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    skills: [],
    preferences: '',
    availability: {}, // { Monday: { Morning: true, Afternoon: false, ... }, ... }
  });

  // Initialize availability if not set
  React.useEffect(() => {
    if (Object.keys(form.availability).length === 0) {
      const initial = {};
      DAYS.forEach(day => {
        initial[day] = {};
        TIMES.forEach(time => {
          initial[day][time] = false;
        });
      });
      setForm(f => ({ ...f, availability: initial }));
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSkillChange = e => {
    const { value, checked } = e.target;
    setForm(f => ({
      ...f,
      skills: checked
        ? [...f.skills, value]
        : f.skills.filter(s => s !== value)
    }));
  };

  const handleAvailabilityChange = (day, time) => {
    setForm(f => ({
      ...f,
      availability: {
        ...f.availability,
        [day]: {
          ...f.availability[day],
          [time]: !f.availability[day][time]
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields here if needed
    alert('Profile saved!');
    // Save profile logic here
    navigate("/dashboard");
  };

  return (
    <div className="profile-root">
      <section className="profile-section">
        <h1 className="profile-title">Complete Your Profile</h1>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div>
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              maxLength={50}
              required
              value={form.fullName}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label>Address 1 *</label>
            <input
              type="text"
              name="address1"
              maxLength={100}
              required
              value={form.address1}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label>Address 2</label>
            <input
              type="text"
              name="address2"
              maxLength={100}
              value={form.address2}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label>City *</label>
            <input
              type="text"
              name="city"
              maxLength={100}
              required
              value={form.city}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label>State *</label>
            <select
              name="state"
              required
              value={form.state}
              onChange={handleChange}
              className="profile-input"
            >
              <option value="">Select State</option>
              {US_STATES.map(s => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Zip Code *</label>
            <input
              type="text"
              name="zip"
              maxLength={9}
              minLength={5}
              pattern="\d{5,9}"
              required
              value={form.zip}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label>Skills *</label>
            <div className="profile-skills-checkboxes">
              {SKILLS.map(skill => (
                <label key={skill} style={{ display: 'block', marginBottom: '0.3rem' }}>
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    checked={form.skills.includes(skill)}
                    onChange={e => {
                      if (e.target.checked) {
                        setForm(f => ({ ...f, skills: [...f.skills, skill] }));
                      } else {
                        setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));
                      }
                    }}
                  />
                  {' '}{skill}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>Preferences</label>
            <textarea
              name="preferences"
              maxLength={500}
              value={form.preferences}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label>Weekly Availability *</label>
            <div className="profile-availability-table" style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    {TIMES.map(time => (
                      <th key={time}>{time}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map(day => (
                    <tr key={day}>
                      <td><strong>{day}</strong></td>
                      {TIMES.map(time => (
                        <td key={time}>
                          <input
                            type="checkbox"
                            checked={form.availability[day]?.[time] || false}
                            onChange={() => handleAvailabilityChange(day, time)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button type="submit" className="profile-submit-btn">
            Save Profile
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProfilePage