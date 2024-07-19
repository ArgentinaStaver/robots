import { Robot } from "./Robots";

export interface Mission {
  id: number;
  name: string;
  description: string;
  robot: Robot;
}
