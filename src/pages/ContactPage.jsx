import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // For now, just clear the form and show an alert
    alert('Thank you for reaching out!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-root">
      <section className="contact-section">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          Have a question or want to get involved? Email us at{' '}
          <a href="mailto:info@singhdomanimaliarescue.org" className="contact-email">
            info@singhdomanimaliarescue.org
          </a>
          <br />
          or fill out our contact form below.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="contact-input"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="contact-input"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              className="contact-input"
              id="message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>
        <div className="contact-actions">
          <Link to="/" className="contact-home-link">
            Go back to the home page
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;