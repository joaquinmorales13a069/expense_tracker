import express from "express";
import {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel,
} from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Income routes
router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/delete/:id", protect, deleteIncome);

export { router as incomeRoutes };
