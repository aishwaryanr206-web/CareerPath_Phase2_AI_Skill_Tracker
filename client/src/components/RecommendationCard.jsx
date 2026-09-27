import React from "react";
import {ArrowUpRight,BrainCircuit,CheckCircle2} from "lucide-react";
export default function RecommendationCard({item}){
 return <article className="rec-card"><div className="rec-top"><div className="rec-icon"><BrainCircuit size={19}/></div><span>{item.match}% match</span></div>
 <h3>{item.title}</h3><p>{item.description}</p><div className="tags">{item.skills.map(s=><label key={s}>{s}</label>)}</div>
 <footer><span><CheckCircle2 size={14}/>{item.reason}</span><ArrowUpRight size={16}/></footer></article>
}
