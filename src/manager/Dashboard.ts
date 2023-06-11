import { app, redisClient } from "../App";
import {Request,Response} from 'express';
export class DashboardManager{

    async dashboard(req : Request,res : Response){
        if(await hasPermissions(req.session.id)){
            res.render("dashboard");
        }else{
            res.redirect("/");
        }
    }

    async dashboardAutos(req : Request,res : Response){
        if(await hasPermissions(req.session.id)){
            res.render('dashboardAutos');
        }else{
            res.redirect('/');
        }
    }

    async dashboardStudenten(req : Request,res : Response){
        if(await hasPermissions(req.session.id)){
            res.render('dashboardStudenten');
        }else{
            res.redirect('/');
        }
    }

    async dashboardDocenten(req : Request,res : Response){
        if(await hasPermissions(req.session.id)){
            res.render('dashboardDocenten');
        }else{
            res.redirect('/');
        }
    }

    async dashboardAankondigingen(req : Request,res : Response){
        if(await hasPermissions(req.session.id)){
            res.render('dashboardAankondigingen');
        }else{
            res.redirect('/');
        }
    }
}


async function hasPermissions(id : string):Promise<boolean>{
    const data = await redisClient.hGetAll(id);
    const permissionLevel = parseInt(data.permissionLevel);
    if(permissionLevel == 3){
      return true;
    }else{
      return false;
    }
}