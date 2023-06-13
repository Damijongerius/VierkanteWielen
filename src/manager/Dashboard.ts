import { app, redisClient } from "../App";
import {Request,Response} from 'express';
import { CarManager } from "../DataBase/CarManager";

const autos : CarManager = new CarManager();
export class Dashboard{

    async dashboard(req : Request,res : Response){
        hasPermissions(req.session.id,res,'dashboard');
    }

    async Autos(req : Request,res : Response){
        const currautos = await autos.getCars();
        console.log(currautos);
        hasPermissions(req.session.id,res,'dashboardAutos');
    }

    async AutosAdd(req: Request, res: Response){
        console.log(req.body);
        await hasPermissions(req.session.id,res,'dashboardAutos');
    }

    async dashboardStudenten(req : Request,res : Response){
        hasPermissions(req.session.id,res,'dashboardStudenten');
    }

    async dashboardDocenten(req : Request,res : Response){
        hasPermissions(req.session.id,res,'dashboardDocenten');
    }

    async dashboardAankondigingen(req : Request,res : Response){
        hasPermissions(req.session.id,res,'dashboardAankondigingen');
    }

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