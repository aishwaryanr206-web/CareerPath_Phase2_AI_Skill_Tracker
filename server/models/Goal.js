import mongoose from "mongoose";
const schema=new mongoose.Schema({userId:String,title:String,category:{type:String,default:"Personal"},due:String,progress:{type:Number,default:0},status:{type:String,default:"active"}},{timestamps:true});
export default mongoose.model("Goal",schema);
