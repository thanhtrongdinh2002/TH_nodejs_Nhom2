import dotenv from "dotenv"
import express from 'express'
import initRouter from "./src/routes/webRouter.js"
import configViewEngine from "./src/configs/viewEngine.js"
const app = express()
dotenv.config()
const port = process.env.PORT || 8080
configViewEngine(app)
initRouter(app)
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})