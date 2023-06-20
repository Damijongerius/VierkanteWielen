import { app, redisClient } from "../App";
import { Request, Response } from "express";
import { CarManager } from "../DataBase/CarManager";
import { UserManager } from "../DataBase/UserManager";
import { AnnouncementManager } from "../DataBase/AnnouncementManager";
import { SubscriptionManager } from "./Subscription";
import { LessonManager } from "../DataBase/LessonManager";

const autos: CarManager = new CarManager();
const user: UserManager = new UserManager();
const lesson: LessonManager = new LessonManager();

const subscription: SubscriptionManager = new SubscriptionManager();
const announcment: AnnouncementManager = new AnnouncementManager();

export class Dashboard {
  async dashboard(req: Request, res: Response) {
    if (hasPermission(req.session.id)) {
        const activeUsers = await getActiveUsers();
        const slaagPercentage = await getSlaagPercentage();
        const sortSubs = await sortSubscriptions();

        res.render('dashboard', {activeUsers, slaagPercentage, sortSubs});
    }
  }

  async autos(req: Request, res: Response) {
    if (hasPermission(req.session.id)) {
      const currAutos = await autos.getCars();
      console.log(currAutos);
      res.render("dashboardautos", { currAutos });
    }
  }

  async autosAdd(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const autoInfo = req.body;
      autos.addCar(autoInfo.kenteken, autoInfo.fabrikant, autoInfo.kleur);
      res.redirect("/dashboard/autos");
    }
  }

  async autosRemove(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const autoInfo = req.body;
      autos.removeCar(autoInfo.licencePlate);
      res.redirect("/dashboard/autos");
    }
  }

  async studenten(req: Request, res: Response) {
    if (hasPermission(req.session.id)) {
      const currStudenten = await user.getUsers(1);
      console.log(currStudenten);
      res.render("DashboardStudenten", { currStudenten });
    }
  }

  async studentenRemove(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const UserInfo = req.body;
      user.deleteUser(UserInfo.id);
      res.redirect("/dashboard/studenten");
    }
  }

  async studentenModify(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const UserInfo = req.body;
      console.log(UserInfo);
      user.modifyUser(UserInfo.id, UserInfo.PermissionLevel);
      res.redirect("/dashboard/studenten");
    }
  }

  async studentenToDocent(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const UserInfo = req.body;
      res.redirect("/dashboard/studenten");
    }
  }

  async docenten(req: Request, res: Response) {
    if (hasPermission(req.session.id)) {
      const currDocenten = await user.getUsers(2);
      res.render("DashboardDocenten", { currDocenten });
    }
  }

  async docentenRemove(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const UserInfo = req.body;
      user.deleteUser(UserInfo.id);
      res.redirect("dashboard/docenten");
    }
  }

  async aankondigingen(req: Request, res: Response) {
    if (hasPermission(req.session.id)) {
      const currAankondegingen = await announcment.getAnnouncements();
      console.log(currAankondegingen);
      res.render("DashboardAankondigingen", { currAankondegingen });
    }
  }

  async aankondegingenRemove(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const aankondiging = req.body;
      announcment.removeAnnouncement(aankondiging.id);
      res.redirect("/dashboard/aankondegingen");
    }
  }

  async aankondegingenAdd(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const aankondiging = req.body;
      announcment.addAnnouncement(
        aankondiging.title,
        aankondiging.content,
        aankondiging.footer
      );
      res.redirect("/dashboard/aankondegingen");
    }
  }

  async aankondegingenModify(req: Request, res: Response) {
    if (await hasPermission(req.session.id)) {
      const aankondiging = req.body;
      announcment.modifyAnnouncement(
        aankondiging.id,
        aankondiging.title,
        aankondiging.content,
        aankondiging.footer
      );
      res.redirect("/dashboard/aankondegingen");
    }
  }
}

async function hasPermission(id: string) {
  const data = await redisClient.hGetAll(id);
  const permissionLevel = parseInt(data.permissionLevel);
  if (permissionLevel == 3) {
    return true;
  }
  return false;
}

async function hasPermissions(
  id: string,
  res: Response,
  render: string,
  extra?: object
): Promise<void> {
  const data = await redisClient.hGetAll(id);
  console.log(data);
  const permissionLevel = parseInt(data.permissionLevel);
  console.log(permissionLevel);
  if (permissionLevel == 3) {
    if (extra) {
      res.render(render, extra);
    } else {
      res.render(render);
    }
  } else {
    res.redirect("/");
  }
}

async function getActiveUsers(){
    const users = await user.getUsers(1);
    console.log(users.length);
    return users.length;
  }

  async function getSlaagPercentage(){
    const users = await user.getUsers(1);
    //get userLessons where is exam and not canceled
    let ids : number[] = [];
    users.forEach((user) =>{
      ids.push(user.id);
    })
    const result = await lesson.getExamsResults(ids);

    let geslaagde = 0;
    result.forEach((res) =>{
        if(res.geslaagd == 1){
            geslaagde ++;
        }
    })

    return (100 / result.length) * geslaagde;
  }

  async function sortSubscriptions() {
    const subscriptions: any[] = await user.getSubscriptions();
    const values = {
      Pakket1: 0,
      Pakket2: 0,
      Pakket3: 0,
      Totaal: 0,
    };
    if (subscriptions.length != 0) {
      subscriptions.forEach((sub) => {
        switch (sub.subscriptionLevel) {
          case 1:
            {
              const val = subscription.getSubscriptionPrice(
                sub.subscriptionLevel
              );
              values.Pakket1 += val;
              values.Totaal += val;
            }
            break;
          case 2:
            {
              const val = subscription.getSubscriptionPrice(
                sub.subscriptionLevel
              );
              values.Pakket1 += val;
              values.Totaal += val;
            }
            break;
          case 3:
            {
              const val = subscription.getSubscriptionPrice(
                sub.subscriptionLevel
              );
              values.Pakket1 += val;
              values.Totaal += val;
            }
            break;
        }
      });
    } else {
      return values;
    }
  }