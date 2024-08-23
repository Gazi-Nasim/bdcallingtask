import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import Footer from "../layouts/Footer";
import { useSelector } from "react-redux";

const Role_edit = () => {
    const param = useParams();
    const [name, setName] = useState("");
    const userData = useSelector((state) => state?.credential?.credentialData);
    const [prePermissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelPermissions] = useState([]);
    const [groupsAndpermissions, setpermissionGroups] = useState([]);
    const [error, seterror] = useState("");
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    const permissionData = useSelector(
        (state) => state?.credential.permissionData
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        let id = param.id;
        try {
            const response = await axios.post(
                `/api/update-role/`,
                {
                    id:id,
                    name: name,
                    permissions: selectedPermissions,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            navigate("/roles");
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        }
    };

    // Handle individual permission change
    const handlePermissionChange = (event) => {
        const { checked, value } = event.target;
        const numericValue = Number(value);
        if (checked) {
            setSelPermissions((prev) => [...prev, numericValue]);
        } else {
            setSelPermissions((prev) =>
                prev.filter((id) => id !== numericValue)
            );
        }
    };

    // Handle check all permissions
    const handleCheckAllPermissions = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            const allPermissionIds = groupsAndpermissions.flatMap((group) =>
                group.permissions.map((permission) => permission.id)
            );
            setSelPermissions(allPermissionIds);
        } else {
            setSelPermissions([]);
        }
    };

    // Handle check/uncheck group permissions
    const checkPermissionByGroup = (groupName) => {
        const groupPermissions = groupsAndpermissions
            .find((group) => group.name === groupName)
            .permissions.map((permission) => permission.id);

        if ($(`#${groupName}_Management`).is(":checked")) {
            setSelPermissions((prev) => [
                ...new Set([...prev, ...groupPermissions]),
            ]);
        } else {
            setSelPermissions((prev) =>
                prev.filter((id) => !groupPermissions.includes(id))
            );
        }
    };

    const getPermissionAndGroup = async () => {
        try {
            const response = await axios.get("/api/permissions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setpermissionGroups(response.data[0]);
        } catch (error) {
            seterror("Token Expired Login Again");
            setTimeout(() => {
                seterror("");
            }, 3000);
            console.error("Login error:", error);
        }
    };

    const getRoles = async () => {
        let id = param.id;
        try {
            const response = await axios.get(`/api/get-role/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = response.data[0];
            setName(data.role);
            const ids = data.permissions.map((item) => item.id);
            setPermissions(ids);
            setSelPermissions(ids);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        if (token !== null) {
            if (!permissionData.includes("role.edit")) {
                history.back();
            } 
        } else {
            navigate("/login");
        }
        getPermissionAndGroup();
        getRoles();
    }, []);

    return (
        <>
            <Sidebar />
            <Navbar />
            <div className="content-wrapper">
                {/* ... page title area (can be implemented using appropriate components) */}

                <div className="main-content-inner">
                    <div className="row">
                        <div className="col-12 mt-5">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Edit Role</h4>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Role Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Enter a Role Name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Permissions
                                            </label>

                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="checkPermissionAll"
                                                    onChange={
                                                        handleCheckAllPermissions
                                                    }
                                                    checked={
                                                        selectedPermissions.length ===
                                                        groupsAndpermissions.flatMap(
                                                            (group) =>
                                                                group.permissions
                                                        ).length
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="checkPermissionAll"
                                                >
                                                    All
                                                </label>
                                            </div>
                                            <hr />
                                            {groupsAndpermissions.map(
                                                (group, index) => (
                                                    <div
                                                        key={index}
                                                        className="row"
                                                        style={{
                                                            marginTop: "2%",
                                                        }}
                                                    >
                                                        <div className="col-3">
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`${group.name}_Management`}
                                                                    value={
                                                                        group.name
                                                                    }
                                                                    onChange={() =>
                                                                        checkPermissionByGroup(
                                                                            group.name
                                                                        )
                                                                    }
                                                                    checked={group.permissions.every(
                                                                        (
                                                                            permission
                                                                        ) =>
                                                                            selectedPermissions.includes(
                                                                                permission.id
                                                                            )
                                                                    )}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`${index}Management`}
                                                                >
                                                                    {group.name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-9">
                                                            {group.permissions.map(
                                                                (
                                                                    permission
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            permission.id
                                                                        }
                                                                        className="form-check"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            className={`form-check-input ${group.name}`}
                                                                            id={`checkPermission${permission.id}`}
                                                                            value={
                                                                                permission.id
                                                                            }
                                                                            checked={selectedPermissions.includes(
                                                                                permission.id
                                                                            )}
                                                                            onChange={
                                                                                handlePermissionChange
                                                                            }
                                                                        />
                                                                        <label
                                                                            className="form-check-label"
                                                                            htmlFor={`checkPermission${permission.id}`}
                                                                        >
                                                                            {
                                                                                permission.name
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}

                                            <div className="col-12 form-group d-flex justify-content-end">
                                                <input
                                                    type="submit"
                                                    value="Save Role"
                                                    className="btn btn-success"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Role_edit;
