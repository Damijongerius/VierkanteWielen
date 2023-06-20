import { redisClient } from "../App";
import { UserManager } from "../DataBase/UserManager";

const user: UserManager = new UserManager();

export class Profiel {
  async render(req, res) {
    if (hasPermissions(req.session.id)) {
      const data = await redisClient.hGetAll(req.session.id);
      const id: number = parseInt(data.id);
      const thisUser = await user.getUser(id);
      console.log(thisUser);
      res.render("profiel", { thisUser });
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
