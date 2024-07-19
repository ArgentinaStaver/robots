import express, { Request, Response } from "express";
import robotRoutes from "./routes/robots.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/robots', robotRoutes);


// define a route:
app.get("/", (req: Request, res: Response) => {
  res.send("APIs for Taurob project");
});

// start the serrver:
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
