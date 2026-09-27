import mongoose from "mongoose";
const schema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,unique:true,lowercase:true},password:String,targetCareer:{type:String,default:"Data Science"},skills:{type:[String],default:[]},interests:{type:[String],default:[]}},{timestamps:true});
export default mongoose.model("User",schema);
