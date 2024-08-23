import React from "react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="" className="brand-link">
                    <img
                        src="/backend/dist/img/hsbl.png"
                        alt="AdminLTE Logo"
                        className="brand-image img-circle elevation-3"
                        style={{ opacity: "0.8" }}
                    />
                    <span className="brand-text font-weight-light">HSBLCO</span>
                </a>

                <div className="sidebar">
                    <div className="form-inline">
                        <div
                            className="input-group"
                            data-widget="sidebar-search"
                        >
                            <input
                                className="form-control form-control-sidebar"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul
                            className="nav nav-pills nav-sidebar flex-column"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            {/* <li className="nav-item  ">
                                <a href="#" className="nav-link  ">
                                    <i
                                        className="nav-icon fa fa-info-circle"
                                        aria-hidden="true"
                                    ></i>
                                    <p>
                                        General Info
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Add</p>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            <li className="nav-item  ">
                                <a href="#" className="nav-link  ">
                                    <i className="nav-icon fas fa-users mr-2"></i>
                                    <p>
                                        Users
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink
                                            to="/user-create"
                                            className="nav-link "
                                        >
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Add</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item ">
                                        <NavLink to="/users" className="nav-link ">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>User List</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="nav-icon fas fa-users mr-2"></i>
                                    <p>
                                        Roles & Permissions
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink
                                            to="/role-create"
                                            className="nav-link"
                                        >
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Add</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/roles" className="nav-link ">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>All Roles</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
