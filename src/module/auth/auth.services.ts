import { pool } from "../../common/config/db.js";
import type { LoginBody, RegisterBody, Tokens } from "./auth.types.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const saltRounds = 12

export async function registerService(data:RegisterBody){

    const {username , password } = data

    const hashedPassword = bcrypt.hash(password , saltRounds)


    try{
        await pool.query("INSERT INTO users(username , role , hashedPassword) VALUES ($1 , $2)" , [username  , hashedPassword])
    }
    catch(err){
        console.log("Something went wrong in registerService")
        console.log(err)
    }
}

export async function loginService(data:LoginBody):Promise<Tokens>{

    const {username , password} = data

    

    const usersQuery = await pool.query("SELECT * FROM users where username = $1" , [username])

    if(usersQuery.rowCount===0){
        console.log("User not found!")

        return {
            ACCESS_TOKEN: "",
            REFRESH_TOKEN: ""
        }

    }

    const user = usersQuery.rows[0]
    
    

    const isPasswordCorrect = bcrypt.compare(password , user.hashedPassword)

    if(!isPasswordCorrect){
        console.log("Incorrect Password")

        return {
            ACCESS_TOKEN : "",
            REFRESH_TOKEN : ""
        }
    }

    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_SECRET
    const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_SECRET
    const accessToken = jwt.sign({username:username , id:user.id} , ACCESS_TOKEN_KEY! , {expiresIn:"15m"})
    const refreashToken = jwt.sign({username:username , id:user.id} , REFRESH_TOKEN_KEY! , {expiresIn:"7d"})

    const tokens = {
        ACCESS_TOKEN : accessToken , 
        REFRESH_TOKEN : refreashToken
    }
    
    return tokens
}