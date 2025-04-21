import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../charts/CustomLineChart";


function ExpenseOverview({ transactions, onExpenseIncome }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log("Transactions received:", transactions); // Log what's received
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
        console.log("Chart data:", result); 
    }, [transactions]);

    return (
        <div className="card">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-5">
                <div className="">
                    <h5 className="text-lg">Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Track your expenses</p>
                </div>
                <button className="add-btn" onClick={onExpenseIncome}>
                    <LuPlus className="text-lg"/>
                    Add Expense
                </button>
            </div>
            
            {/* Chart Section - separate from header section */}
            <div className="w-full mt-5">
                {transactions && transactions.length > 0 ? (
                    <CustomLineChart data={chartData} />
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No expense data available to display
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExpenseOverview;
