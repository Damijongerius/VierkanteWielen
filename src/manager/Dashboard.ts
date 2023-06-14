import { app, redisClient } from "../App";
import {Request,Response} from 'express';
import { CarManager } from "../DataBase/CarManager";
import { UserManager } from "../DataBase/UserManager";
import { AnnouncementManager } from "../DataBase/AnnouncementManager";

const autos : CarManager = new CarManager();
const user : UserManager = new UserManager();
const announcment : AnnouncementManager = new AnnouncementManager();

export class Dashboard{

    async dashboard(req : Request,res : Response){
        hasPermissions(req.session.id,res,'dashboard');
    }

    async autos(req : Request,res : Response){
        if(hasPermission(req.session.id)){
            const currAutos = await autos.getCars();
            res.render('dashboardautos', currAutos);
        }
    }

    async autosAdd(req: Request, res: Response){
        if(await hasPermission(req.session.id)){
            const autoInfo = req.body;
            autos.addCar(autoInfo.kenteken,autoInfo.fabrikant,autoInfo.kleur);
            res.redirect('dashboard/autos');
        }
    }

    async autosRemove(req: Request, res: Response){
        if(await hasPermission(req.session.id)){
            const autoInfo = req.body;
            autos.removeCar(autoInfo.kenteken);
            res.redirect('dashboard/autos');
        }
    }

    async studenten(req : Request,res : Response){
        hasPermissions(req.session.id,res,'dashboardStudenten');
    }

    async studentenRemove(req: Request, res: Response){
        if(await hasPermission(req.session.id)){
            const UserInfo = req.body;
            user.deleteUser(UserInfo.id);
            res.redirect('dashboard/studenten');
        }
    }

    async studentenToDocent(req: Request, res: Response){
        if(await hasPermission(req.session.id)){
            const UserInfo = req.body;
            res.redirect('dashboard/studenten');
        }
    }

    async docenten(req : Request,res : Response){
        hasPermissions(req.session.id,res,'dashboardDocenten');
    }

    async docentenRemove(req: Request, res: Response){
        if(await hasPermission(req.session.id)){
            const UserInfo = req.body;
            user.deleteUser(UserInfo.id);
            res.redirect('dashboard/docenten');
        }
    }

    async aankondigingen(req : Request,res : Response){
        hasPermissions(req.session.id,res,'dashboardAankondigingen');
    }

    async aankondegingenRemove(req: Request, res: Response){
        if(await hasPermission(req.session.id)){
            const aankondiging = req.body;
            announcment.removeAnnouncement(aankondiging.id);
            res.redirect('dashboard/aankondigingen');
        }
    }

    async aankondegingenAdd(req: Request, res: Response){
        if(await hasPermission(req.session.id)){
            const aankondiging = req.body;
            announcment.addAnnouncement(aankondiging.title,aankondiging.content,aankondiging.footer);
            res.redirect('dashboard/aankondigingen');
        }
    }

}

async function hasPermission(id : string){
    const data = await redisClient.hGetAll(id);
    const permissionLevel = parseInt(data.permissionLevel);
    if(permissionLevel == 3){
       return true;
    }
    return false
}

async function hasPermissions(id : string, res : Response, render : string , extra? : object): Promise<void>{
    const data = await redisClient.hGetAll(id);
    console.log(data);
    const permissionLevel = parseInt(data.permissionLevel);
    console.log(permissionLevel);
    if(permissionLevel == 3){
        if(extra){
            res.render(render, extra);
        }else{
            res.render(render);
        }
    }else{
        res.redirect('/');
    }
}