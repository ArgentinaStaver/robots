import { Router, Request, Response } from "express";
import { Robot } from "../models/Robots";

const robotRoutes = Router();
let robots: Robot[] = [{ id: 1, name: "robot 1", model: "robot model 1" }];

// get all robots
robotRoutes.get("/", (req: Request, res: Response) => {
  res.json(robots);
});

// get robot by id 
robotRoutes.get("/:id", (req: Request, res: Response) => {
  const robot = robots.find((robot) => robot.id === parseInt(req.params.id));

  if (!robot) res.status(404).send("Robot not found");
  res.json(robot);
});

// create a robot
robotRoutes.post("/", (req: Request, res: Response) => {
  const robot: Robot = {
    id: robots.length + 1,
    name: req.body.name,
    model: req.body.model,
  };

  robots.push(robot);
  res.status(201).json(robot);
});

//update a robot
robotRoutes.put("/:id", (req: Request, res: Response) => {
  const robot = robots.find((robot) => robot.id === parseInt(req.params.id));

  if (!robot) {
    res.status(404).send("Robot not found");
  } else {
    robot.name = req.body.name || robot.name;
    robot.model = req.body.model || robot.model;

    res.json(robot);
  }
});

// delete a robot
robotRoutes.delete("/:id", (req: Request, res: Response) => {
  const index = robots.findIndex(
    (robot) => robot.id === parseInt(req.params.id)
  );

  if (index === -1) {
    res.status(404).send("Robot not found");
  } else {
    robots.splice(index, 1);
    res.status(204).send();
  }
});

export default robotRoutes;
