import { Database } from "./DataBase/Database";
import { UserManager } from './DataBase/UserManager';
import { app } from "./App";
import  path from "path";

Database.connect("localhost", "root", "", "vierkantewielen"); 

const userManager = new UserManager(); 

app.get("/", function(req,res){
    res.render("index");
})
