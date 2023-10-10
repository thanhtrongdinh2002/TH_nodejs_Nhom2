import dotenv from "dotenv"
import express from 'express'
import initRouter from "./src/routes/webRouter.js"
import session from "express-session"
import configViewEngine from "./src/configs/viewEngine.js"
const app = express()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
dotenv.config()
const port = process.env.PORT || 5000
configViewEngine(app)
app.use(express.urlencoded({extended: false}))
app.use(express.json())
initRouter(app)
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})