import express from "express";
const router = express.Router();
import { addSchool, listsSchools } from "../controllers/school.controller.js";

router.post("/addSchool", addSchool);
router.get("/listSchools", listsSchools);

export default router;
