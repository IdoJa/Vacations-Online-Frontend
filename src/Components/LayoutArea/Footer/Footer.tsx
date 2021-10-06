import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="footer-container">
            <section className="footer-section">
                <p className="footer-section-heading disabled">
                    All your dreamy vacations can be found here.
                </p>
            </section>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <NavLink to='/' className="social-logo disabled">
                            Vacations Online <i className="fas fa-plane-departure" />
                        </NavLink>
                    </div>
                    <small className="website-rights disabled">Vacations Online &copy; {new Date().getFullYear()}</small>
                    <div className="social-icons">
                        <NavLink
                            to='/'
                            aria-label='Facebook'
                            className="social-icon-link facebook disabled">
                            <i className="fab fa-facebook-f"></i>
                        </NavLink>
                        <NavLink
                            to='/'
                            aria-label='Instagram'
                            className="social-icon-link instagram disabled">
                            <i className="fab fa-instagram"></i>
                        </NavLink>
                        <NavLink
                            to='/'
                            aria-label='Youtube'
                            className="social-icon-link youtube disabled">
                            <i className="fab fa-youtube"></i>
                        </NavLink>
                        <NavLink
                            to='/'
                            aria-label='Twitter'
                            className="social-icon-link twitter disabled">
                            <i className="fab fa-twitter"></i>
                        </NavLink>
                        <NavLink
                            to='/'
                            aria-label='LinkedIn'
                            className="social-icon-link linkedin disabled">
                            <i className="fab fa-linkedin"></i>
                        </NavLink>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
