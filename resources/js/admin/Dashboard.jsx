import React, { useEffect, useState } from "react";
import Navbar from "./layouts/Navbar";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Footer from "./layouts/Footer";
import Sidebar from "./layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addPermissions } from "../redux/slices/credentialSlice";

function Dashboard() {
    let token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [returnError, setReturnError] = useState([]);
    const userData = useSelector((state) => state?.credential?.credentialData);
    const dispatch = useDispatch();

    const getRoles = async () => {
        try {
            const response = await axios.get(
                `/api/get-roles/${userData.user_role}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data[0];
            const permssionAry = data.permissions.map((item) => item.name);
            dispatch(addPermissions(permssionAry));
            // console.log(data);
        } catch (error) {
            setReturnError("Token Expired Login Again !!");
            setTimeout(() => {
                setReturnError("");
            }, 10000);
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token === null) {
            navigate("/login");
        }
        getRoles();
    }, [navigate]);

    return (
        <>
            <Sidebar />
            <Navbar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Home Page</h1>
                            </div>
                            <div className="col-sm-6">
                                <div className="">
                                    <h1 style={{ color: "red" }}>
                                        {returnError}
                                    </h1>
                                </div>
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Page
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title"></h3>
                            <div className="card-tools">
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="collapse"
                                    title="Collapse"
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="remove"
                                    title="Remove"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <h1>Welcome to home page</h1>
                                <div className="col-3">
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>finalProfit</h3>
                                            <p>Monthly Total Profit</p>
                                        </div>
                                        <div className="icon">
                                            <i className="fas fa-solid fa-wallet"></i>
                                        </div>
                                        <a
                                            href="#"
                                            className="small-box-footer"
                                        >
                                            More info{" "}
                                            <i className="fas fa-arrow-circle-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
