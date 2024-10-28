const mongoose=require('mongoose');


const MemoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is Required"]
    },
    description:{
        type:String,
        required:[true,"Description is Required"]
    }
})

module.exports=mongoose.model("MemoData",MemoSchema);