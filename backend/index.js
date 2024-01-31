const express = require('express')
// const collection = require("./mongo")
const cors =require('cors')
const mongoose =require('mongoose')
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended :true}))
const PORT = process.env.PORT || 8080

//Schema
const schemaData = mongoose.Schema({
    id:String,
    name :String,
    status :String
})

const userModel = mongoose.model("tasks",schemaData)


//newschema for login
const newschema= new mongoose.Schema({
    email:{
        type :String,
        required :true
    },
    password:{
        type :String,
        required :true
    }
})

const userDetails =mongoose.model("Logindetails",newschema)

//
app.post('/Login',async(req,res) =>{
    const {email,password} = req.body
    try{
        const check =  await userDetails.findOne({email:email})
        if(check){
            res.json("exist")
        }else{
            res.json("not exist")
        }
    }
    catch(e){
        res.json("not exist")
    }
})

app.post('/Signup',async(req,res) =>{
    const {email,password} = req.body

    const data ={
        email:email,
        password:password
    }
    try{
        const check =  await userDetails.findOne({email:email})
        if(check){
            res.json("exist")
        }else{
            res.json("not exist")
            await userDetails.insertMany([data])
        }
    }
    catch(e){
        res.json("not exist")
    }
})

//read
app.get("/",async(req,res) =>{
    const data = await userModel.find({})
    res.json({success : true , data : data})
})

//post
app.post("/create",async(req,res) =>{
    console.log(req.body)
    const data = new userModel(req.body)
    await userModel.insertMany([data])
    // await data.save()
    res.send({success:true , message : "data saved" ,data:data})
})
 
//edit
// app.put("/update",async(req,res) =>{
//     console.log(req.body)
//     const {id,...rest} =req.body
//     const data = await userModel.updateOne({id:id},rest)
//     res.send({success:true , message : "data updated" ,data : data})
// })


// app.post("/create", async (req, res) => {
//     try {
//       const { id, name, status } = req.body;
//       const data = new userModel({ id, name, status });
//       await userModel.insertMany([data]);
  
//       res.send({ success: true, message: "data saved", data: data });
//     } catch (error) {
//       console.error("Error creating task:", error);
//       res.status(500).send({ success: false, message: "Internal server error" });
//     }
//   });

app.put("/update/:id", async (req, res) => {
    const taskId = req.params.id;
    const { name } = req.body;
  
    try {
      const data = await userModel.updateOne({ id: taskId }, { name: name });
      res.send({ success: true, message: "Task updated successfully", data: data });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).send({ success: false, message: "Internal server error" });
    }
  });
  
//delete
app.delete("/delete/:id", async (req, res) => {
    const taskId = req.params.id;
  
    try {
      // Assuming you're using Mongoose for MongoDB interaction
      const data = await userModel.deleteOne({ id: taskId });
  
      if (data.deletedCount === 1) {
        res.send({ success: true, message: "Task deleted successfully" });
      } else {
        res.status(404).send({ success: false, message: "Task not found" });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).send({ success: false, message: "Internal server error" });
    }
  });
  
// app.delete("/delete/:id" ,async(req,res) =>{
//     const id=req.params.id
//     console.log(id)
//     const data =await userModel.deleteOne({id:id})
//     res.send({success:true , message : "data deleted" ,data : data})
// })
mongoose.connect("mongodb+srv://yashwanth:flWKq2SpUuvOdJiL@cluster0.haukof7.mongodb.net/?retryWrites=true&w=majority")
.then(() =>{
    console.log("connected to database")
    app.listen(PORT,()=>console.log("server is running"))
})
.catch((err) =>console.log(err))


