import "dotenv/config"; import express from "express"; import cors from "cors"; import mongoose from "mongoose"; import bcrypt from "bcryptjs"; import jwt from "jsonwebtoken"; import path from "path"; import {fileURLToPath} from "url";
import User from "./models/User.js"; import Goal from "./models/Goal.js"; import {auth} from "./middleware/auth.js"; import {getRecommendations,getSkillGap} from "./services/recommendationEngine.js"; import {getChatReply} from "./services/chatService.js";
const app=express();app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173"}));app.use(express.json());
const __filename=fileURLToPath(import.meta.url); const __dirname=path.dirname(__filename);
let mongoReady=false;const demo={id:"demo-user",name:"Aishwarya",email:"demo@careerpath.ai",targetCareer:"Data Science",skills:["Python","SQL","Machine Learning","Pandas"],interests:["AI","Data","Problem Solving"]};
const demoGoals=[{id:1,title:"Complete Statistics foundations",category:"Skill",due:"Sep 08, 2026",progress:72,status:"active"},{id:2,title:"Finish SQL portfolio project",category:"Project",due:"Sep 14, 2026",progress:82,status:"active"}];
async function db(){if(!process.env.MONGO_URI){console.log("ℹ Demo fallback mode: MONGO_URI not configured.");return}try{await mongoose.connect(process.env.MONGO_URI);mongoReady=true;console.log("✓ MongoDB connected")}catch(e){console.log("⚠ MongoDB unavailable — demo fallback mode.")}}
const token=u=>jwt.sign({id:u._id||u.id,email:u.email,name:u.name},process.env.JWT_SECRET||"dev-secret",{expiresIn:"7d"});
app.get("/api/health",(q,s)=>s.json({ok:true,mongo:mongoReady,phase:2}));
app.post("/api/auth/login",async(q,s)=>{const {email,password}=q.body;if(!mongoReady&&email===demo.email&&password==="Demo@123")return s.json({user:demo,token:"demo-token"});if(!mongoReady)return s.status(401).json({message:"Demo mode: use demo@careerpath.ai / Demo@123"});const u=await User.findOne({email});if(!u||!(await bcrypt.compare(password,u.password)))return s.status(401).json({message:"Invalid credentials"});s.json({user:{id:u._id,name:u.name,email:u.email,targetCareer:u.targetCareer,skills:u.skills,interests:u.interests},token:token(u)})});
app.post("/api/auth/register",async(q,s)=>{const {name,email,password}=q.body;if(!name||!email||!password)return s.status(400).json({message:"Required fields missing"});if(!mongoReady)return s.json({user:{...demo,name,email},token:"demo-token"});if(await User.findOne({email}))return s.status(409).json({message:"Email already registered"});const u=await User.create({name,email,password:await bcrypt.hash(password,10)});s.status(201).json({user:{id:u._id,name:u.name,email:u.email,targetCareer:u.targetCareer,skills:u.skills,interests:u.interests},token:token(u)})});
app.get("/api/auth/me",auth,async(q,s)=>{if(!mongoReady||q.user.id==="demo-user")return s.json(demo);const u=await User.findById(q.user.id).select("-password");s.json(u)});
app.get("/api/recommendations",auth,async(q,s)=>{const u=mongoReady&&q.user.id!=="demo-user"?await User.findById(q.user.id):demo;s.json({recommendations:getRecommendations(u)})});
app.get("/api/recommendations/skill-gap",auth,async(q,s)=>{const u=mongoReady&&q.user.id!=="demo-user"?await User.findById(q.user.id):demo;s.json(getSkillGap(u))});
const learningResources=[
 {id:"stats-01",type:"Course",title:"Statistics for Data Science",provider:"Khan Academy",skill:"Statistics",duration:"6h 20m",progress:64,url:"https://www.khanacademy.org/math/statistics-probability"},
 {id:"ml-01",type:"Video",title:"Machine Learning Foundations",provider:"freeCodeCamp",skill:"Machine Learning",duration:"4h 10m",progress:32,url:"https://www.youtube.com/@freecodecamp"},
 {id:"sql-01",type:"Course",title:"SQL for Data Analysis",provider:"DataCamp",skill:"SQL",duration:"3h 45m",progress:82,url:"https://www.datacamp.com/"},
 {id:"python-01",type:"Certification",title:"Applied Data Science with Python",provider:"Coursera",skill:"Python",duration:"18h",progress:18,url:"https://www.coursera.org/"}
];
app.get("/api/learning",auth,(q,s)=>s.json({resources:learningResources}));
app.patch("/api/learning/:id",auth,(q,s)=>{const item=learningResources.find(x=>x.id===q.params.id);if(item)item.progress=Math.max(0,Math.min(100,Number(q.body.progress)||0));s.json({success:true,progress:item?.progress||0});});
app.get("/api/goals",auth,async(q,s)=>{if(!mongoReady||q.user.id==="demo-user")return s.json({goals:demoGoals});s.json({goals:await Goal.find({userId:q.user.id}).sort({createdAt:-1})})});
app.post("/api/goals",auth,async(q,s)=>{if(!mongoReady||q.user.id==="demo-user"){const goal={...q.body,id:Date.now()};demoGoals.unshift(goal);return s.status(201).json({goal})}s.status(201).json({goal:await Goal.create({...q.body,userId:q.user.id})})});
app.get("/api/analytics/overview",auth,(q,s)=>s.json({progress:{overall:72,completed:8,streak:6,hours:31},weekly:[{day:"Mon",hours:1.8},{day:"Tue",hours:2.7},{day:"Wed",hours:1.5},{day:"Thu",hours:3.4},{day:"Fri",hours:2.8},{day:"Sat",hours:4.1},{day:"Sun",hours:2.9}],recommendations:getRecommendations(demo).slice(0,3)}));
app.post("/api/chat",auth,async(q,s)=>{if(!q.body.message)return s.status(400).json({message:"Message required"});s.json({reply:await getChatReply(String(q.body.message))})});
app.get("/api/report",auth,(q,s)=>s.json({readiness:72,targetCareer:"Data Science",skillsTracked:6,coursesCompleted:8,learningHours:31,topMatch:94,generated:"28 Aug 2026"}));
// When the React app is built, the same Express server can serve it on port 5000.
const clientDist=path.resolve(__dirname,"../client/dist");
app.use(express.static(clientDist));
app.get("/",(q,s)=>{s.sendFile(path.join(clientDist,"index.html"),err=>{if(err)s.json({name:"CareerPath AI",phase:2,status:"API online",message:"Run the client with npm run dev or build client/dist to serve the UI here.",frontend:"http://localhost:5173",health:"/api/health"})})});
app.use((q,s,n)=>{if(q.path.startsWith("/api/"))return n();s.sendFile(path.join(clientDist,"index.html"),err=>{if(err)n()})});
app.use((e,q,s,n)=>{console.error(e);s.status(500).json({message:"Internal server error"})});
const PORT=process.env.PORT||5000;db().finally(()=>app.listen(PORT,()=>console.log(`✓ CareerPath Phase 2 API: http://localhost:${PORT}`)));
