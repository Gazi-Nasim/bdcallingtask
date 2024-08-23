import React, { useState } from "react";

const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePasswordStrength = (password) => {
        if (password.length < 6) {
            return "Weak";
        } else if (password.length < 10) {
            return "Moderate";
        } else {
            return "Strong";
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(validatePasswordStrength(newPassword));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert(`Registration successful!\nEmail: ${email}`);
            // Here, you would typically send the data to your backend for further processing
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        required
                    />
                    {errors.email && <div style={{ color: "red", marginTop: "5px" }}>{errors.email}</div>}
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        required
                    />
                    <div style={{ marginTop: "5px", color: passwordStrength === "Weak" ? "red" : passwordStrength === "Moderate" ? "orange" : "green" }}>
                        Password strength: {passwordStrength}
                    </div>
                    {errors.password && <div style={{ color: "red", marginTop: "5px" }}>{errors.password}</div>}
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        required
                    />
                    {errors.confirmPassword && <div style={{ color: "red", marginTop: "5px" }}>{errors.confirmPassword}</div>}
                </div>
                <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
