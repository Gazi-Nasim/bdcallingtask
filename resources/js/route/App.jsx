import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Example from "../components/Example";
import NotFound from "../components/NotFound";
import About from "../components/About";
import Dashboard from "../admin/Dashboard";
import Login from "../components/LoginComponent";


import Roles from "../admin/role/Roles";
import Role_create from "../admin/role/Role_create";
import Role_edit from "../admin/role/Role_edit";

import CreateUser from "../admin/users/User";
import User_list from "../admin/users/User_list";
import Edituser from "../admin/users/Edit_user";
import Navbar from "../layout/Navbar";
import Sidebar from "../admin/layouts/Sidebar";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/example" element={<Example />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/user-create" element={<CreateUser />} />
            <Route path="/user-edit/:id" element={<Edituser />} />
            <Route path="/users" element={<User_list />} />

            <Route path="/roles" element={<Roles />} />
            <Route path="/role-create" element={<Role_create />} />
            <Route path="/role-edit/:id" element={<Role_edit />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
