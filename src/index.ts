import express from "express";
import "dotenv/config"

const app = express()

const PORT = process.env.PORT

app.listen(PORT||8080 , ()=>{
    console.log("Server Started!")
})