import XLSX from "xlsx"
import { Income } from "../models/Income.js"
// Add Income Source
export const addIncome = async (req, res) => {
    const userId = req.user.id

    try {
        const { icon, source, amount, date } = req.body

        // Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }

        // Create new income source
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        })
        await newIncome.save()

        res.status(201).json({
            message: "Income source added successfully",
            income: newIncome,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
    }
}

// Get All Income Sources
export const getAllIncome = async (req, res) => {
    const userId = req.user.id
    // Get all income sources for the user
    try {
        const income = await Income.find({ userId }).sort({ date: -1 })
        res.status(200).json({
            message: "All income sources",
            income,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
        
    }
}
// Delete Income Source
export const deleteIncome = async (req, res) => {
    const incomeId = req.params.id
    // Delete income source by ID
    try {
        await Income.findByIdAndDelete(incomeId)
        res.status(200).json({
            message: "Income source deleted successfully",
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
        
    }
}
// Download Income Sources as Excel File
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id

    // Insert all income sources for the user into an Excel file
    try {
        const income = await Income.find({ userId }).sort({ date: -1 })

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }))
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(workbook, worksheet, "Income")
        XLSX.writeFile(workbook, "income.xlsx")
        res.download("income.xlsx")
        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
        
    }
}
