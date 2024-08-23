import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function Home() {
    return (
        <>
        <Navbar/>
            <section className="main-section">
                <div>
                    <h1 className="display-1">MARKETING</h1>
                    <p>
                        Static and dynamic secure code review can prevent a day
                        before your product is even released. We can integrate
                        with your dev environment.
                    </p>
                </div>
                <div className="video-intro">
                    <img src="video-thumbnail.jpg" alt="Video Intro" />
                    <p>WATCH VIDEO INTRO</p>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Home;
