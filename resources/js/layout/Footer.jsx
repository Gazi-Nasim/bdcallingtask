import React from 'react';

function Footer() {
    return (
        <div className="container-fluid footer-container">
        <div className="row">
            <div className="col-md-4">
                <div className="footer-logo">
                    <img src="logo.png" alt="Axtra Digital Agency Studio" className="img-fluid"/>
                </div>
                <p>When do they work well, and when do they on us and finally, when do we actually need how can we avoid them.</p>
                <div className="social-links">
                    <a href="#">FACEBOOK</a>
                    <a href="#">TWITTER</a>
                    <a href="#">LINKEDIN</a>
                    <a href="#">INSTAGRAM</a>
                </div>
            </div>

            <div className="col-md-8 d-flex align-items-center justify-content-center">
                <div className="lets-talk">
                    LET'S TALK
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12 text-center footer-copyright">
                © 2022 – 2025 | All rights reserved by Wealcoder
                <nav className="d-inline-block">
                    <a href="#" className="ms-3">ABOUT US</a>
                    <a href="#" className="ms-3">CONTACT</a>
                    <a href="#" className="ms-3">CAREER</a>
                    <a href="#" className="ms-3">FAQS</a>
                </nav>
            </div>
        </div>
    </div>
    );
}

export default Footer;

