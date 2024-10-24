import userServices from "../Services/userServices.js";

class UserController {
  async isUserNameTaken(req, res) {
    try {
      const { name } = req.params;
      const userName = await userServices.isUserNameTaken(name);
      res.status(200).send(userName);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }
  async createUser(req, res) {
    try {
      const user = await userServices.createUser(req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const user = await userServices.loginUser(req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }

  async getUserData(req, res) {
    try {
      const { id } = req.params;
      const user = await userServices.getUserData(id);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }
}

export default new UserController();
