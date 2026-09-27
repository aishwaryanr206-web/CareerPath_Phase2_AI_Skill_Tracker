import React from "react";
export default function Metric({label,value,change,icon:Icon}){
 return <div className="metric"><div className="metric-icon"><Icon size={19}/></div><div><span>{label}</span><b>{value}</b><small>{change}</small></div></div>
}
