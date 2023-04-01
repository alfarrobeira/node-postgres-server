import { Router } from "express";
import {
  getOrders,
  createOrder,
  getOrder,
  editOrder,
  deleteOrder,
} from "../controllers/order.js";

const orderRoutes = Router();

orderRoutes
  .get("/", (req, res) => {
    getOrders().then((result) => res.json(result));
  })

  .post("/", (req, res) => {
     // send new item with special status code
    createOrder(req, res).then((result) => res.status(201).json(result));
  })

  .get("/:id", (req, res) => {
    getOrder(req, res).then((result) => res.json(result));
  })

  .put("/:id", (req, res) => {
    editOrder(req, res).then((result) => res.json(result));
  })

  .delete("/:id", (req, res) => {
    deleteOrder(req, res).then((result) => res.json(result));
  })

export default orderRoutes;
