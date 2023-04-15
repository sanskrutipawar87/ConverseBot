import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import Login from '../Pages/Authentication/Login'
import Register from '../Pages/Authentication/Register'
import ForgotPassword from '../Pages/Authentication/ForgotPassword'

const AuthRoutes = () => {
    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    )
}

export default AuthRoutes
