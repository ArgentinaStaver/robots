import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";
import robotRoutes from "../../src/routes/robots.routes";
import missionRoutes from "../../src/routes/missions.routes";

const api = express();

const router = Router();
router.get("/", (req, res) => res.send("APIs for Taurob project"));

api.use(cors());

api.use("/api/", router);
api.use("/api/robots", robotRoutes);
api.use("/api/missions", missionRoutes);

export const handler = serverless(api);
