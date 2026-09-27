import React,{useState} from "react";
import {ArrowRight,BrainCircuit,Sparkles} from "lucide-react";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import api from "../services/api";

export default function Register(){
  const {saveAuth}=useAuth();
  const nav=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:"",targetCareer:"Data Science"});
  const [err,setErr]=useState("");

  async function submit(e){
    e.preventDefault();
    setErr("");
    try{
      const payload={
        name:form.name.trim(),
        email:form.email.trim().toLowerCase(),
        password:form.password,
        targetCareer:form.targetCareer.trim() || "Data Science"
      };
      const r=await api.post("/auth/register",payload);
      saveAuth(r.data);
      nav("/dashboard");
    }catch(e){
      setErr(e?.response?.data?.message||"Registration failed. Please try again.");
    }
  }

  return <div className="login">
    <section className="login-art">
      <div className="orbit a"/><div className="orbit b"/>
      <div className="big-logo"><BrainCircuit size={42}/></div>
      <span className="kicker"><Sparkles size={14}/> PHASE 02</span>
      <h1>Build a career<br/><em>with direction.</em></h1>
      <p>Turn your assessment into an intelligent learning path, measurable skills and confident career decisions.</p>
      <div className="float-card"><b>94%</b><span>career fit confidence</span></div>
    </section>
    <section className="login-form">
      <div className="login-brand"><div className="brand-icon"><BrainCircuit size={18}/></div><b>CareerPath AI</b></div>
      <div className="form-box">
        <span className="eyebrow">CREATE ACCOUNT</span>
        <h2>Start your learning path</h2>
        <p>Create your free profile and let the AI career assistant personalize your roadmap.</p>
        <form onSubmit={submit}>
          <label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /></label>
          <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></label>
          <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required minLength="6" /></label>
          <label>Target Career<input value={form.targetCareer} onChange={e=>setForm({...form,targetCareer:e.target.value})} required /></label>
          {err&&<div className="error">{err}</div>}
          <button className="primary wide">Create account <ArrowRight size={16}/></button>
        </form>
        <div className="or"><span>or</span></div>
        <Link className="secondary wide link-button" to="/login">I already have an account</Link>
      </div>
    </section>
  </div>;
}
