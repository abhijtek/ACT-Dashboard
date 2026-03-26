import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

// basic configurations
app.use(express.json({limit : "16kb"})) // middleware(app.use()) // 16kb of json data will be taken
app.use(express.urlencoded({extended: true, limit : "16kb"}))//accepting data from url
app.use(express.static("public")) // public part will be vidible to all

app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin : process.env.CORS_ORIGIN ?.split(",") || "http://localhost:5173",
    credentials : true,
    methods : ["GET","POST","PUT","PATCH","DELETE","OPTIONS"
    ],
    allowedHeaders : ["Content-Type","Authorization"],

})); 

// import routes

import  healthCheckRouter from "./routes/healthcheck.routes.js" // default export

import authRouter from "./routes/auth.routes.js"
app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
// take a obj
app.get("/",(req,res)=>{
    res.send("Welcome to Basecampy");
})
export default app;