import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import Footer from "../layouts/Footer";

const Role_edit = () => {
    const param = useParams();
    const [name, setName] = useState("");
    const [prePermissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelPermissions] = useState([]);
    const [groupsAndpermissions, setpermissionGroups] = useState([]);
    const [error, seterror] = useState("");
    const navigate = useNavigate();
    let token = localStorage.getItem("token");


    const handlePermissionChange = (event) => {
        const allCheckedValues = [];
        $("input[type=checkbox]:checked").each(function () {
            const value = $(this).val();
            if (!isNaN(value)) {
                allCheckedValues.push(Number(value));
            }
        });
        console.log(allCheckedValues);
        setSelPermissions(allCheckedValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let id = param.id;
        try {
            const response = await axios.post(
                `/api/store_role/${id}`,
                {
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

    const handleCheckAllPermissions = async (event) => {
        if ($("#checkPermissionAll").is(":checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
        handlePermissionChange(event);
    };

    const checkPermissionByGroup = async (e) => {
        if ($(`#${e}_Management`).is(":checked")) {
            $(`.${e}`).prop("checked", true);
            $(`.${e}`).each(function () {
                let valu = $(this).val();
                setSelPermissions((selectedPermissions) => [
                    ...selectedPermissions,
                    valu,
                ]);
            });
        } else {
            $(`.${e}`).prop("checked", false);
        }
        handlePermissionChange();
    };

    const getPermissionAndGroup = async () => {
        let token = localStorage.getItem("token");
        try {
            const response = await axios.get("/api/permissions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = response.data[0];
            setpermissionGroups(data);
            // console.log(data);
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
            const response = await axios.get(`/api/get_roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = response.data[0];
            setName(data.role);
            const perdata = data.permissions;
            const ids = [];
            perdata.forEach((item) => {
                ids.push(item.id);
            });
            setPermissions(ids);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
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
                                    <h4 className="header-title">
                                        Create New Role
                                    </h4>

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
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="checkPermissionAll"
                                                >
                                                    All
                                                </label>
                                            </div>
                                            <hr />
                                            <hr />
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
                                                                    onClick={() =>
                                                                        checkPermissionByGroup(
                                                                            group.name
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`${index}Management`}
                                                                >
                                                                    {group.name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-3 role-{index}-management-checkbox">
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
                                                                            checked={prePermissions.includes(
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
                                                            )}{" "}
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
