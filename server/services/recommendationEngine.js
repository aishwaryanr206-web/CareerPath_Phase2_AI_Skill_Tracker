const careers=[
{title:"Data Science",description:"Use statistics, Python and machine learning to turn data into decisions.",skills:["Python","Statistics","Machine Learning","SQL"],interests:["AI","Data","Problem Solving","Analytics"],reason:"Strong analytical and AI alignment"},
{title:"Machine Learning Engineer",description:"Build, evaluate and deploy machine learning systems.",skills:["Python","Machine Learning","APIs","Cloud"],interests:["AI","Coding","Problem Solving","Systems"],reason:"Strong technical growth path"},
{title:"Data Analyst",description:"Translate business questions into dashboards and measurable insights.",skills:["SQL","Excel","Data Visualization","Python"],interests:["Data","Business","Analytics","Problem Solving"],reason:"Fast conversion of existing skills"},
{title:"Business Analytics",description:"Combine data analysis and business thinking to improve decisions.",skills:["SQL","Statistics","Data Visualization","Business"],interests:["Business","Data","Analytics","Communication"],reason:"Balanced business + data fit"},
{title:"UI/UX Designer",description:"Design intuitive digital experiences through research and prototyping.",skills:["Figma","UX Research","Prototyping","Visual Design"],interests:["Design","Creativity","Communication","Problem Solving"],reason:"Creative problem-solving route"},
{title:"Cybersecurity Analyst",description:"Protect systems and data through monitoring and risk reduction.",skills:["Networking","Linux","Security","Python"],interests:["Security","Systems","Problem Solving","Technology"],reason:"Good systems-oriented path"}];
const overlap=(a,b)=>b.filter(x=>a.map(y=>y.toLowerCase()).includes(x.toLowerCase())).length;
export function getRecommendations(u={}){
 const skills=u.skills?.length?u.skills:["Python","SQL","Machine Learning","Pandas"], interests=u.interests?.length?u.interests:["AI","Data","Problem Solving"];
 return careers.map(c=>{const ss=overlap(skills,c.skills)/c.skills.length*100,is=overlap(interests,c.interests)/c.interests.length*100,boost=u.targetCareer?.toLowerCase()===c.title.toLowerCase()?12:0;return {...c,match:Math.min(98,Math.round(ss*.58+is*.30+boost+8))}}).sort((a,b)=>b.match-a.match);
}
export function getSkillGap(u={}){
 const target=u.targetCareer||"Data Science";
 const base=[["Python",86,85],["SQL",78,80],["Statistics",54,82],["Machine Learning",61,84],["Data Visualization",68,80],["Model Deployment",38,70]];
 const skills=base.map(([name,current,target])=>({name,current,target,status:current>=target?"strong":current>=target-12?"near":"gap"}));
 const readiness=Math.round(skills.reduce((s,x)=>s+x.current/x.target,0)/skills.length*100);
 return {target,readiness:Math.min(98,readiness),skills};
}
