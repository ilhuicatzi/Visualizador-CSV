import { Request, Response, Router } from "express";


const router = Router();

router.get("/users", (_req: Request, res: Response) => {
    res.status(200).json({ data: [] });
  });

export default router;