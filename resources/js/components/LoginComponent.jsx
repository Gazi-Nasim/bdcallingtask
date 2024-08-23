import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { addCredentials } from "../redux/slices/credentialSlice";

const Login = () => {
    let token = localStorage.getItem("token");
    const [mail, setmail] = useState("");
    const [pass, setpass] = useState("");
    const [error, seterror] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async () => {
        if (mail && pass) {
            try {
                const response = await axios.post(
                    "api/auth/login",
                    { email: mail, password: pass },
                    { headers: { "Content-Type": "application/json" } }
                );
                const data = response.data;
                localStorage.setItem("token", data.token);
                dispatch(
                    addCredentials({
                        name: data.user.name,
                        user_id: data.user.id,
                        user_role: data.user.role,
                    })
                );
                navigate("/dashboard");
                // console.log(data);
            } catch (error) {
                seterror("Credentials did not match");
                setTimeout(() => {
                    seterror("");
                }, 3000);
                console.error("Login error:", error);
            }
        } else {
            if (!mail) {
                seterror("E-mail is required");
            }
            if (!pass) {
                seterror("Password is required");
            }
        }
    };

    useEffect(() => {
        if (token != null) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#">
                            <b>Admin</b>Panel
                        </a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">
                                {" "}
                                Sign in to start your session{" "}
                            </p>
                            <p
                                className="login-box-msg"
                                style={{ color: "red" }}
                            >
                                {" "}
                                {error}{" "}
                            </p>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={(e) => setmail(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(e) => setpass(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary"></div>
                                </div>
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        onClick={login}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>Username: Super Admin</p>
                <p>Username: super@gmail.com</p>
                <p>Password: 12345678</p>
            </div>
        </>
    );
};

export default Login;
