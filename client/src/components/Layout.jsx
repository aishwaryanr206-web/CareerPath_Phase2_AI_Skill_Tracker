import React from "react";
import {NavLink} from "react-router-dom";
import {Bell,BarChart3,BookOpen,BrainCircuit,CheckCircle2,FileText,LayoutDashboard,LogOut,MessageCircle,Search,Sparkles,Target,UserRound} from "lucide-react";
import {useAuth} from "../context/AuthContext";

const nav=[
 ["/dashboard","Overview",LayoutDashboard],[ "/recommendations","AI Recommendations",Sparkles],
 ["/skills","Skill Gap",Target],["/learning","Learning Hub",BookOpen],["/goals","Goals & Progress",CheckCircle2],
 ["/chat","Career AI",MessageCircle],["/analytics","Analytics",BarChart3],["/report","Report",FileText],["/profile","Profile",UserRound]
];

export default function Layout({title,subtitle,children}){
 const {user,logout}=useAuth();
 return <div className="shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-icon"><BrainCircuit size={21}/></div><div><b>CareerPath</b><small>AI • PHASE 02</small></div></div>
   <div className="mini-user"><div className="avatar">{user?.name?.[0]||"A"}</div><div><b>{user?.name||"Student"}</b><small>{user?.targetCareer||"Career Explorer"}</small></div></div>
   <span className="nav-label">Workspace</span>
   <nav>{nav.map(([to,label,Icon])=><NavLink key={to} to={to} className={({isActive})=>isActive?"nav active":"nav"}><Icon size={17}/><span>{label}</span></NavLink>)}</nav>
   <div className="side-bottom"><div className="online"><i/> <div><b>AI Engine Online</b><small>Personalization active</small></div></div><button className="logout" onClick={logout}><LogOut size={16}/> Sign out</button></div>
  </aside>
  <main className="main">
   <header className="top"><div><span className="eyebrow"><Sparkles size={12}/> PERSONALIZED LEARNING OS</span><h1>{title}</h1><p>{subtitle}</p></div><div className="top-icons"><button><Search size={18}/></button><button><Bell size={18}/><i/></button></div></header>
   <div className="content">{children}</div>
  </main>
 </div>
}
