import React,{useState} from "react";
import {ArrowRight,BrainCircuit,Sparkles} from "lucide-react";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import api from "../services/api";

export default function Login(){
 const {saveAuth}=useAuth();
 const nav=useNavigate();
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [err,setErr]=useState("");

 async function submit(e){
   e.preventDefault();
   setErr("");
   try{
     const r=await api.post("/auth/login",{email:email.trim().toLowerCase(),password});
     saveAuth(r.data);
     nav("/dashboard");
   }catch(e){
     setErr(e?.response?.data?.message||"Login failed. Please check your email and password.");
   }
 }

 return <div className="login">
  <section className="login-art"><div className="orbit a"/><div className="orbit b"/><div className="big-logo"><BrainCircuit size={42}/></div><span className="kicker"><Sparkles size={14}/> PHASE 02</span><h1>Build a career<br/>with <em>direction.</em></h1><p>Turn your assessment into an intelligent learning path, measurable skills and confident career decisions.</p><div className="float-card"><b>94%</b><span>career fit confidence</span></div></section>
  <section className="login-form"><div className="login-brand"><div className="brand-icon"><BrainCircuit size={18}/></div><b>CareerPath AI</b></div><div className="form-box"><span className="eyebrow">WELCOME BACK</span><h2>Continue your journey</h2><p>Sign in to see your latest recommendations and progress.</p><form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>{err&&<div className="error">{err}</div>}<button className="primary wide">Sign in <ArrowRight size={16}/></button></form><div className="or"><span>or</span></div><Link className="secondary wide link-button" to="/register">Create a free account</Link></div></section></div>
}
