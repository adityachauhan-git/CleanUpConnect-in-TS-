import express from "express";
import "dotenv/config";
import postRouter from "./module/posts/posts.route.js";
import authRouter from "./module/auth/auth.routes.js";
import roleRouter from "./module/role/role.route.js";

const app = express();
app.use(express.json());

app.use("/post", postRouter);
app.use("/auth", authRouter);
app.use("/points", roleRouter);

const PORT = process.env.PORT;

app.listen(PORT || 8080, () => {
  console.log("Server Started!");
});
