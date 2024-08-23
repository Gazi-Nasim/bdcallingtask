import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { store } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, clearPermissions } from "../../redux/slices/credentialSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        localStorage.removeItem("token");
        dispatch(clearCredentials());
        dispatch(clearPermissions());
        navigate("/");
    };
    const userData = useSelector((state) => state?.credential?.credentialData);

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-widget="pushmenu"
                            href="#"
                            role="button"
                        >
                            <i className="fas fa-bars"></i>
                        </a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="" className="nav-link">
                            Home
                        </a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">
                            Contact
                        </a>
                    </li>
                </ul>
                {/* <!-- Right navbar links --> */}
                <ul className="navbar-nav ml-auto d-flex justify-content-end">
                    <li className="nav-item" style={{ margin: "auto" }}>
                        <a
                            className="nav-link d-flex"
                            data-widget="fullscreen"
                            href="#"
                            role="button"
                        >
                            <i className="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <div
                                    className="nav-link user-panel mt-3 pb-3 mb-3 d-flex row"
                                    data-toggle="dropdown"
                                    href="#"
                                >
                                    <div className="image col-3">
                                        <img
                                            src="/backend/dist/img/user2-160x160.jpg"
                                            className="img-circle elevation-2 bg-primary"
                                            alt="User Image"
                                        />
                                    </div>
                                    <div className="text-muted col-8">
                                        <a href="#" className="text-muted">
                                            {" "}
                                            {userData.name}{" "}
                                        </a>
                                        <i className="text-black fas fa-angle-down right"></i>
                                    </div>
                                </div>
                                <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right bg-primary ">
                                    <a
                                        href={`/user-edit/${userData.user_id}`}
                                        className="dropdown-item btn text-primary text-center"
                                    >
                                        <i className="fas fa-solid fa-user "></i>{" "}
                                        Profile
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a
                                        className="dropdown-item btn text-primary text-center"
                                        onClick={handleLogout}
                                    >
                                        <i className="nav-icon fas fa-sign-out-alt"></i>{" "}
                                        Logout
                                    </a>
                                    <form
                                        id="logout-form"
                                        action="{{ route('logout') }}"
                                        method="POST"
                                        className="d-none"
                                    >
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
