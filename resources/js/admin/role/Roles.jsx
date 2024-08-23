import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import { useSelector } from "react-redux";
// import 'datatables.net-dt/css/jquery.dataTables.css';
// import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
// import 'datatables.net-responsive-bs4/css/responsive.bootstrap.min.css';
// import $ from 'jquery';
// import 'datatables.neta';
// import 'datatables.net-bs4';
// import 'datatables.net-responsive-bs4';

const Roles = () => {    
    let token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [roleAndpermiss, SetRoleAndpermiss] = useState([]);
    const [returnError, setReturnError] = useState([]);
    const permissionData = useSelector(
        (state) => state?.credential.permissionData
    );
    const verifyToken = async () => {
        if (token === null) {
            navigate("/login");
        }
    };

    const getRoles = async () => {
        try {
            const response = await axios.get("/api/get-roles", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = response.data;
            SetRoleAndpermiss(data);
        } catch (error) {
            setReturnError("Token Expired Login Again !!");
            setTimeout(() => {
                setReturnError("");
            }, 10000);
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        if (token !== null) {
            if (!permissionData.includes("role.view")) {
                history.back();
            } 
        } else {
            navigate("/login");
        }

        if ($.fn.DataTable.isDataTable("#dataTable")) {
            $("#dataTable").DataTable().destroy();
        }
        $("#dataTable").DataTable({
            responsive: true,
        });
        getRoles();
    }, []);

    const handleDelete = async (roleId) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            try {
                await axios.post(
                    `api/role-delete/`,
                    { id: roleId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                window.location.reload(); // reload page to see the updated data
            } catch (error) {
                console.error("There was an error deleting the role!", error);
            }
        }
    };

    const roles = []; // Replace with actual data fetching logic

    return (
        <>
            <Sidebar />
            <Navbar />
            <div className="content-wrapper">
                <div className="page-title-area">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="breadcrumbs-area clearfix">
                                <h4 className="page-title pull-left">Roles</h4>

                                <ul className="breadcrumbs pull-left">
                                    <li>
                                        <Link to="/">Dashboard</Link>
                                    </li>
                                    <li>
                                        <span>All Roles</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-content-inner">
                    <div className="row">
                        <div className="col-12 mt-5">
                            <div className="card">
                                <div className="card-header d-flex justify-content-center">
                                    <h1 style={{ color: "red" }}>
                                        {returnError}
                                    </h1>
                                </div>
                                <div className="card-body">
                                    <h4 className="header-title float-left">
                                        Roles List
                                    </h4>
                                    <p className="float-right mb-2">
                                        {/* Assuming user can create a role */}
                                        <Link
                                            className="btn btn-primary text-white"
                                            to="/roles/create"
                                        >
                                            Create New Role
                                        </Link>
                                    </p>
                                    <div className="clearfix"></div>
                                    <div className="data-tables">
                                        <table
                                            id="dataTable"
                                            className="text-center"
                                        >
                                            <thead className="bg-light text-capitalize">
                                                <tr>
                                                    <th width="5%">Sl</th>
                                                    <th width="10%">Name</th>
                                                    <th width="60%">
                                                        Permissions
                                                    </th>
                                                    <th width="15%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roleAndpermiss.map(
                                                    (role, index) => (
                                                        <tr key={role.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{role.role}</td>
                                                            <td>
                                                                {role.permissions.map(
                                                                    (perm) => (
                                                                        <span
                                                                            key={
                                                                                perm.id
                                                                            }
                                                                            className="badge badge-info mr-1"
                                                                        >
                                                                            {
                                                                                perm.name
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </td>
                                                            <td>
                                                                {/* Assuming user can edit or delete a role */}
                                                                <Link
                                                                    className="btn btn-success text-white"
                                                                    to={`/role-edit/${role.id}`}
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    className="btn btn-danger text-white"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            role.id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Roles;
