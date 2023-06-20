import { redisClient } from "../App";
import { LessonManager } from "../DataBase/LessonManager";
import { UserManager } from "../DataBase/UserManager";
import { SubscriptionManager } from "./Subscription";

const user: UserManager = new UserManager();
const lesson : LessonManager = new LessonManager();

export class Profiel {
  async render(req, res) {
    if (hasPermissions(req.session.id)) {
      const data = await redisClient.hGetAll(req.session.id);
      const id: number = parseInt(data.id);
      const thisUser = await user.getUser(id);
      const results = await lesson.getResultWithUser(id);
      console.log(results);
      res.render("profiel", { thisUser, results });
    }
  }
}

async function hasPermissions(id: string) {
  const data = await redisClient.hGetAll(id);
  const permissionLevel = parseInt(data.permissionLevel);
  if (permissionLevel != null) {
    return true;
  } else {
    return false;
  }
}
