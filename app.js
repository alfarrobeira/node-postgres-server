import express from "express";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/user", userRoutes);
app.use("/order", orderRoutes);

app.listen(port, () => {
    console.log("Listening on port " + port);
})