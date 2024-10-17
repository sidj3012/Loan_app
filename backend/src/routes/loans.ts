import  express from "express";
import * as LoansController from "../controllers/loans";

const router = express.Router();

router.get("/", LoansController.getLoans);
router.post("/", LoansController.createLoan);

export default router;