import { Database } from "./DataBase/Database";
import { UserManager } from './DataBase/UserManager';
import { app } from "./App";
import  path from "path";
import { Logger } from "./Logger";

Database.connect("localhost", "root", "", "vierkantewielen"); 

const userManager = new UserManager(); 
const logger = new Logger("index");

app.get("/", function(req,res){
    res.render("index");
})
