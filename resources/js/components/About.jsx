import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function About() {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">About Component</div>
                            <div className="card-body">
                                I'm an About component!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
