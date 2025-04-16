import React, { useState, useEffect } from "react";
import CustomBarChart from "../charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

// import icons
import { LuPlus } from "react-icons/lu";

function IncomeOverview({ transactions = [], onAddIncome, isLoading = false, error = null }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        try {
            const result = prepareIncomeBarChartData(transactions || []);
            setChartData(result);
            console.log("Chart data prepared:", result);
        } catch (err) {
            console.error("Error preparing chart data:", err);
            setChartData([]);
        }
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income
                        trends
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                {isLoading ? (
                    <div className="flex justify-center items-center h-[300px]">
                        <p className="text-gray-500">Loading income data...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-[300px]">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="flex justify-center items-center h-[300px]">
                        <p className="text-gray-500">No income data available. Add some income to see your overview.</p>
                    </div>
                ) : (
                    <CustomBarChart data={chartData} />
                )}
            </div>
        </div>
    );
}

export default IncomeOverview;
