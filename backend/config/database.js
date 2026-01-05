const mongoose= require("mongoose")

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://sakshitidme_db_user:!A2nZiD_$GLS9sj@cluster0.mogog8t.mongodb.net/bkSportsAcademy");

};


 module.exports=connectDB;

