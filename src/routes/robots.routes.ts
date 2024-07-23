import { Router, Request, Response } from "express";
import { Robot } from "../models/Robots";
import { getRandomInt } from "../utils/randomIds";

const robotRoutes = Router();
export const robots: Robot[] = [
  {
    id: getRandomInt(50, 2000),
    name: "Robot 1",
    model: "Robot model 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ea commodo consequat.",
  },
  {
    id: getRandomInt(50, 2000),
    name: "Robot 2",
    model: "Robot model 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: getRandomInt(50, 2000),
    name: "Robot 3",
    model: "Robot model 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: getRandomInt(50, 2000),
    name: "Robot 4",
    model: "Robot model 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
  },
];

// get all robots
robotRoutes.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json(robots);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// get robot by id
robotRoutes.get("/:id", (req: Request, res: Response) => {
  try {
    const robot = robots.find((robot) => robot.id === parseInt(req.params.id));

    if (!robot) res.status(404).send("Robot not found");
    res.json(robot);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// create a robot
robotRoutes.post("/", (req: Request, res: Response) => {
  const robot: Robot = {
    id: getRandomInt(50, 2000),
    name: req.body.name,
    model: req.body.model,
    description: req.body.description,
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
    robot.description = req.body.description || robot.description;

    res.status(200).json(robot);
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
    res.status(200).send("Robot is deleted");
  }
});

export default robotRoutes;
