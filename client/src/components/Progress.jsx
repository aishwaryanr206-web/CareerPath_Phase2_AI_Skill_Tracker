import React from "react";
export default function Progress({value,label}){
 const v=Math.max(0,Math.min(100,Number(value)||0));
 return <div className="progress">{label&&<div><span>{label}</span><b>{v}%</b></div>}<em><i style={{width:`${v}%`}}/></em></div>
}
