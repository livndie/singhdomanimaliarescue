import React from 'react';

const Footer = () => (
  <footer className="landing-footer">
    <div className="landing-footer-content">
      <p>&copy; {new Date().getFullYear()} <strong>Singhdom Animalia Rescue</strong>. All rights reserved.</p>
      <div className="landing-footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;