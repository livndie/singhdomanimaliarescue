import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => (
  <div className="about-root">
    <section className="about-section">
      <h1 className="about-title">About Singhdom Animalia Rescue</h1>
      <p className="about-description">
        Welcome to Singhdom Animalia Rescue! We are a passionate non-profit organization dedicated to rescuing, rehabilitating, and rehoming abandoned and neglected animals in our community.
      </p>
      <div className="about-mission">
        <h2 className="about-subtitle">Our Mission</h2>
        <p>
          Our mission is to provide every animal with a second chance at a happy, healthy life. We believe in compassion, education, and the power of community to make a difference—one paw at a time.
        </p>
      </div>
      <div className="about-team">
        <h2 className="about-subtitle">Meet Our Team</h2>
        <ul className="about-team-list">
          <li>
            <strong>Dr. Singh</strong> – Founder 
          </li>
          <li>
            <strong>John Doe</strong> – Volunteer Coordinator
          </li>
          <li>
            <strong>Jane Doe</strong> – Community Outreach
          </li>
          <li>
            <strong>And many dedicated volunteers!</strong>
          </li>
        </ul>
      </div>
      <div className="about-actions">
        <Link to="/" className="about-home-link">
          Go back to the home page
        </Link>
        <Link to="/contact" className="about-contact-link">
          Contact Us
        </Link>
      </div>
    </section>
  </div>
);

export default AboutPage;