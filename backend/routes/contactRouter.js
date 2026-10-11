import express from "express";
import { sendContactMessage } from "../controllers/ContactController.js";
import { validateContactSchema } from "../middlewares/validateRequest.js";

const contactRouter = express.Router();

contactRouter.post("/", validateContactSchema, sendContactMessage);

export default contactRouter;
