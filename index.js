import dotenv from "dotenv"
import express from 'express'
import initRouter from "./src/routes/webRouter.js"
import session from "express-session"
import configViewEngine from "./src/configs/viewEngine.js"
import fileUpload from "express-fileupload"
import cors from "cors"
const app = express()
app.use(cors()) // Use this after the variable declaration
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
dotenv.config()
app.use(fileUpload())
app.use(express.static('src/public'))
const port = process.env.PORT || 8080
app.use(express.urlencoded({extended: false}))
app.use(express.json())
configViewEngine(app)
initRouter(app)
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})
