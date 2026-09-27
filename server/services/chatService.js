async function gemini(message){
 if(!process.env.GEMINI_API_KEY)return null;
 const model=process.env.GEMINI_MODEL||"gemini-2.0-flash";
 const url=`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
 const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:`You are CareerPath AI. Give practical student-friendly career advice. Question: ${message}`}]}]})});
 if(!r.ok)return null; const d=await r.json(); return d.candidates?.[0]?.content?.parts?.[0]?.text||null;
}
export async function getChatReply(message){
 if(process.env.AI_PROVIDER==="gemini"){const r=await gemini(message);if(r)return r}
 const q=message.toLowerCase();
 if(q.includes("data science"))return "For Data Science, prioritize Python, SQL, statistics, machine learning, data visualization and one end-to-end portfolio project. Your highest-impact current gap is Statistics, followed by ML and deployment.";
 if(q.includes("machine learning")||q.includes("ml"))return "A practical ML path is Python → statistics → supervised learning → evaluation → feature engineering → deployment. Build a small project after each stage.";
 if(q.includes("interview"))return "Prepare three layers: Python/SQL fundamentals, ML/statistics cases, and two projects you can explain end-to-end. Practice a 60-second project story.";
 if(q.includes("project"))return "Build an end-to-end project: data collection → preprocessing → EDA → model → evaluation → API → dashboard → README. This demonstrates integrated skills.";
 return "A useful learning rule is 60% hands-on practice, 25% structured learning and 15% reflection/documentation. Tell me your target role and I can turn it into a focused roadmap.";
}
