import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function User_list() {
    let token = localStorage.getItem("token");
    const [Users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [returnError, setReturnError] = useState([]);
    const permissionData = useSelector(
        (state) => state?.credential.permissionData
    );
    
    const getUsers = async () => {
        
        try {
            const response = await axios.get("api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setUsers(response.data);
            // console.log('up :'+response);
        } catch (error) {
            setReturnError("Token Expired Login Again !!");
            setTimeout(() => {
                setReturnError("");
            }, 10000);
            console.log(error.response ? error.response.data : error.message);
        }
    };

    const deleteUser = async (id) => {        
        try {
            const response = await axios.post(
                `api/delete-user/`,
                { id: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            navigate("/users");
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {        
        if (token !== null) {
            if (!permissionData.includes("admin.view")) {
                navigate("/dashboard");
            } 
        } else {
            navigate("/login");
        }
        getUsers();
    }, [navigate]);

    return (
        <>
            <Sidebar />
            <Navbar />
            {/* <!-- Content Wrapper. Contains page content --> */}
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>User List </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Project Add
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>

                {/* <!-- Main content --> */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {/* {userData} */}
                                {/* <!-- /.card --> */}
                                <div className="card">
                                    <div className="card-header d-flex justify-content-center">
                                        <h1 style={{ color: "red" }}>
                                            {returnError}
                                        </h1>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    <div className="card-body">
                                        {/* @include('backend.layouts.messages') */}
                                        <table
                                            id="example1"
                                            className="table table-bordered table-striped"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>E-mail</th>
                                                    <th>Role</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Users.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role}</td>
                                                        <td>
                                                            <a
                                                                href={`/user-edit/${user.id}`}
                                                                style={{
                                                                    float: "left",
                                                                }}
                                                                className="btn btn-primary"
                                                            >
                                                                <i className="fas fa-pen-square"></i>
                                                            </a>

                                                            {/* @if(Auth::guard('web')->user()->name != $tData->name) */}
                                                            <div
                                                                style={{
                                                                    float: "left",
                                                                }}
                                                                className="left"
                                                            >
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() =>
                                                                        deleteUser(
                                                                            user.id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <!-- /.card-body --> */}
                                </div>
                                {/* <!-- /.card --> */}
                            </div>
                            {/* <!-- /.col --> */}
                        </div>
                        {/* <!-- /.row --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
                {/* <!-- /.content --> */}
            </div>
            {/* <!-- /.content-wrapper --> */}
        </>
    );
}

export default User_list;
