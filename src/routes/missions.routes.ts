import { Router, Request, Response } from "express";
import { Mission } from "../models/Missions";
import { Robot } from "../models/Robots";

const missionRoutes = Router();
let robotsDB: Robot[] = [{ id: 1, name: "robot 1", model: "robot model 1" }];
let missions: Mission[] = [
  {
    id: 1,
    name: "Misiune 1",
    description: "about Misiunes 1",
    robot: robotsDB[0],
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
    id: missions.length + 1,
    name: req.body.name,
    description: req.body.description,
    robot: req.body.robot,
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
    mission.robot = req.body.robot || mission.robot;

    res.json(mission);
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
    res.status(204).send();
  }
});

export default missionRoutes;
