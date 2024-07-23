import { Router, Request, Response } from "express";
import { Mission } from "../models/Missions";
import { getRandomInt } from "../utils/randomIds";
import { robots } from "./robots.routes";

const missionRoutes = Router();

let missions: Mission[] = [
  {
    id: getRandomInt(50, 2000),
    name: "Mission 1",
    description: "About Mission 1",
    robotId: robots[0].id,
    startDate: new Date("2024-7-20"),
    endDate: new Date(),
  },
  {
    id: getRandomInt(50, 2000),
    name: "Mission 2",
    description: "About Mission 2",
    robotId: robots[1].id,
    startDate: new Date("2024-7-20"),
    endDate: new Date(),
  },
  {
    id: getRandomInt(50, 2000),
    name: "Misiune 3",
    description: "About mission 3",
    robotId: robots[2].id,
    startDate: new Date("2024-7-20"),
    endDate: new Date(),
  },
  {
    id: getRandomInt(50, 2000),
    name: "Misiune 4",
    description:
      "About Misiunes 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    robotId: robots[3].id,
    startDate: new Date("2024-7-20"),
    endDate: new Date(),
  },
];

// get all missions
missionRoutes.get("/", (req: Request, res: Response) => {
  res.json(missions);
});

// get mission by id
missionRoutes.get("/:id", (req: Request, res: Response) => {
  const mission = missions.find(
    (mission) => mission.id === parseInt(req.params.id)
  );

  if (!mission) res.status(404).send("Mission not found");
  res.json(mission);
});

// create a mission
missionRoutes.post("/", (req: Request, res: Response) => {
  const mission: Mission = {
    id: getRandomInt(50, 2000),
    name: req.body.name,
    description: req.body.description,
    robotId: req.body.robotId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  missions.push(mission);
  res.status(201).json(mission);
});

//update a mission
missionRoutes.put("/:id", (req: Request, res: Response) => {
  const mission = missions.find(
    (mission) => mission.id === parseInt(req.params.id)
  );

  if (!mission) {
    res.status(404).send("Mission not found");
  } else {
    mission.name = req.body.name || mission.name;
    mission.description = req.body.description || mission.description;
    mission.robotId = req.body.robotId || mission.robotId;
    mission.startDate = req.body.startDate || mission.startDate;
    mission.endDate = req.body.endDate || mission.endDate;

    res.status(200).json(mission);
  }
});

// delete a mission
missionRoutes.delete("/:id", (req: Request, res: Response) => {
  const index = missions.findIndex(
    (mission) => mission.id === parseInt(req.params.id)
  );

  if (index === -1) {
    res.status(404).send("Mission not found");
  } else {
    missions.splice(index, 1);
    res.status(200).send("Mission is deleted");
  }
});

export default missionRoutes;
