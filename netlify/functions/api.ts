import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";
import robotRoutes from "../../src/routes/robots.routes";
import missionRoutes from "../../src/routes/missions.routes";

const api = express();

const router = Router();

router.get("/", (req, res) => res.send("APIs for Taurob project"));

api.use(cors());
api.use("/robots", robotRoutes);
api.use("/missions", missionRoutes);

api.use("/api/", router);

export const handler = serverless(api);
