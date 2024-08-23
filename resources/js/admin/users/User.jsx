import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateUser() {
    let token = localStorage.getItem("token");
    const navigate = useNavigate();
    const permissionData = useSelector(
        (state) => state?.credential.permissionData
    );
    const [Roles, setRoles] = useState([]);
    const [returnError, setReturnError] = useState([]);
    const userData = useSelector((state) => state?.credential?.credentialData);

    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        picture: null,
    });
    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        if (!user.name.trim()) newErrors.name = "Name is required";
        if (!user.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!user.role) newErrors.role = "Role is required";
        if (!user.password) newErrors.password = "Password is required";
        if (user.password && user.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            picture: e.target.files[0],
        }));
        console.log('what :'+user.picture);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // console.log("Form submitted:", user);
            saveUser();
        }
    };

    const getRoles = async () => {
        try {
            const response = await axios.post(
                `/api/get-user/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setRoles(response.data.roles);
        } catch (error) {
            setReturnError("Token Expired Login Again !!");
            setTimeout(() => {
                setReturnError("");
            }, 10000);
            console.log(error.response ? error.response.data : error.message);
        }
    };

    const saveUser = async () => {
        try {
            const response = await axios.post(`/api/user`,
                {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    password: user.password,
                    picture: user.picture,
                },
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
            if (!permissionData.includes("admin.create")) {
                navigate("/dashboard");
            }
        } else {
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
                            <div className="col-sm-4">
                                <h1>Add User</h1>
                            </div>
                            <div className="col-sm-4">
                                <h1 style={{ color: "red" }}>{returnError}</h1>
                            </div>
                            <div className="col-sm-4">
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
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">General</h3>
                                    <div className="card-tools">
                                        <button
                                            type="button"
                                            className="btn btn-tool"
                                            data-card-widget="collapse"
                                            title="Collapse"
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="row"
                                        encType="multipart/form-data"
                                    >
                                        <div className="form-group col-6">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={user.name}
                                                onChange={handleChange}
                                                className={`form-control ${
                                                    errors.name
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                required
                                            />
                                            {errors.name && (
                                                <span className="text-danger">
                                                    {errors.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="email">
                                                E-mail
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}
                                                className={`form-control ${
                                                    errors.email
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                required
                                            />
                                            {errors.email && (
                                                <span className="text-danger">
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="role">Role</label>
                                            <select
                                                name="role"
                                                id="role"
                                                value={user.role}
                                                onChange={handleChange}
                                                className={`form-control ${
                                                    errors.role
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                required
                                            >
                                                <option value="">Select</option>
                                                {Roles.map((role, index) => (
                                                    <option
                                                        selected={
                                                            user.role ===
                                                            role.name
                                                        }
                                                        value={role.name}
                                                        key={index}
                                                    >
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.role && (
                                                <span className="text-danger">
                                                    {errors.role}
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={user.password}
                                                onChange={handleChange}
                                                className={`form-control ${
                                                    errors.password
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                required
                                            />
                                            {errors.password && (
                                                <span className="text-danger">
                                                    {errors.password}
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="picture">
                                                Picture
                                            </label>
                                            <input
                                                type="file"
                                                id="picture"
                                                name="picture"
                                                onChange={handleFileChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-12 form-group d-flex justify-content-end">
                                            <input
                                                type="submit"
                                                value="Save"
                                                className="btn btn-success"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default CreateUser;
