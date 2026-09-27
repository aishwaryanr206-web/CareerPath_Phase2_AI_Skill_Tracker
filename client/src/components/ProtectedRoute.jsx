import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
export default function ProtectedRoute({children}){
 const {user,loading}=useAuth();
 if(loading)return <div className="loader-page"><div className="spinner"/><b>Loading CareerPath AI…</b></div>;
 return user?children:<Navigate to="/login" replace/>;
}
