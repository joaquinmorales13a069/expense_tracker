import XLSX from "xlsx"
import { Expense } from "../models/Expense.js"


// Add Expense Source
export const addExpense = async (req, res) => {
    const userId = req.user.id

    try {
        const { icon, category, amount, date } = req.body

        // Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }

        // Create new income source
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        })
        await newExpense.save()

        res.status(201).json({
            message: "Expense added successfully",
            income: newExpense,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
    }
}

// Get All Expense Sources
export const getAllExpense = async (req, res) => {
    const userId = req.user.id
    // Get all income sources for the user
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 })
        res.status(200).json({
            message: "All expense sources",
            expense,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
        
    }
}
// Delete Income Source
export const deleteExpense = async (req, res) => {
    const expenseId = req.params.id
    // Delete income source by ID
    try {
        await Expense.findByIdAndDelete(expenseId)
        res.status(200).json({
            message: "Expense source deleted successfully",
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
        
    }
}
// Download Income Sources as Excel File
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id

    // Insert all income sources for the user into an Excel file
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 })

        // Prepare data for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expense")
        XLSX.writeFile(workbook, "expense.xlsx")
        res.download("expense.xlsx")
        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
        
    }
}
