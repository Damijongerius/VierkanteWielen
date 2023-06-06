import { Database } from "./DataBase/Database.js";
import { UserManager } from './DataBase/UserManager.js';
import { app } from "./App.js";
import  path from "path";
import { Logger } from "./Logger.js";

Database.connect("localhost", "dami", "dami", "vierkantewielen"); 

const userManager = new UserManager(); 
const logger = new Logger("index");

app.get("/", function(req,res){
    res.render("index");
})

app.post("/register", function(req,res){
    console.log(req.body)
})

app.post("/login", function(req,res){
    {

    }
})

app.post("/logout", function(req,res){

})