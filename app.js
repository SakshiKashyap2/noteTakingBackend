const express=require('express')
const mongoose=require('mongoose')
const Note=require('./model/note')
const cors = require('cors')

const app=express()

require('dotenv').config()
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.DB)
.then(()=>console.log('Database Connected!'))
.catch(err=>console.log(err))

app.get("/AllNotes", function(req,res){
    const item=Note.find({})
    item.then((response)=>{
            res.send(response);
    })
    .catch((err=>{
        console.log(err);
    }))
    
  });
app.post("/searchByTitle",function(req,res){
    const Title=Note.find({title: req.body.title})
    Title.then((response)=>{
        res.send(response);
    })
})

app.post("/deleteById",function(req,res){
    const Id=Note.deleteOne({_id: req.body.id})
    Id.then((response)=>{
        res.send(response);
    })
   
})

app.post("/Notes",function(req,res){
    const newNote=new Note({
        title:req.body.title,
        content:req.body.content
    })
    newNote.save(); 
    console.log(req.body)
    res.send("Kumari")
})


const port = 5000 || process.env.PORT
app.listen(port,function(){
    console.log("Server started on port:", port)
})