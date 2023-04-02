import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  editUser,
  deleteUser,
  flagInactive
} from "../controllers/user.js";

const userRoutes = Router();

userRoutes
  .get("/", (req, res) => {
    getUsers().then((result) => res.json(result));
  })

  .post("/", (req, res) => {
    // send new item with special status code
    createUser(req, res).then((result) => res.status(201).json(result));
  })

  .get("/:id", (req, res) => {
    getUser(req, res).then((result) => res.json(result));
  })

  .put("/:id", (req, res) => {
    editUser(req, res).then((result) => res.json(result));
  })

  .delete("/:id", (req, res) => {
    deleteUser(req, res).then((result) => res.json(result));
  })

    // ToDo
  // // return all the orders of a user
  // .get("/:id/orders", (req, res) => {
  //   userOrders(req).then((result) => res.json(result));
  // });

    //  If a user has never ordered, he should be set as inactive
  .put("/:id/check-inactive", (req, res) => {
    flagInactive(req, res).then((result) => res.json(result));
  });

export default userRoutes;
