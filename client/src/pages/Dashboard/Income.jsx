import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";



const Income = () => {
    useUserAuth();

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    // Function to fetch income data
    const fetchIncomeDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET}`);
            if (response.data) {
                // Check if response.data is an array or has an income property
                const data = Array.isArray(response.data) ? response.data : 
                            (response.data.income || []);
                setIncomeData(data);
            }
            console.log("Income data fetched:", response.data);
        } catch (error) {
            console.log("Error fetching income data:", error);
            setError("Failed to load income data");
        } finally {
            setLoading(false);
        }
    }
    
    // Handle add Income
    const handleAddIncome = async (income) => {
        const { source, amount, date, icon} = income;

        // Validate the input
        if (!source || !amount || !date) {
            alert("Please fill in all fields");
            return;
        }

        // Send data to the server
        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD, {
                source,
                amount,
                date,
                icon
            })

            setOpenAddIncomeModal(false);
            console.log("Income added successfully");
            // Fetch the updated income data
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error adding income:", error.response?.data?.message || error.message);
            
            
        }
    }
    
    // Handle delete income
    const handleDeleteIncome = async (incomeId) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE(incomeId))

            setOpenDeleteAlert({show: false, data: null});
            console.log("Income deleted successfully");
            fetchIncomeDetails();

        } catch (error) {
            console.error("Error deleting income:", error.response?.data?.message || error.message);
        }
    }
    
    // Handle download income
    const handleDownloadIncome = async () => {
        // Your implementation here
    }

    useEffect(() => {
        fetchIncomeDetails();
        return () => {
            // Any cleanup if needed
        }
    }, [])
    
    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                            isLoading={loading}
                            error={error}
                        />
                    </div>
                    <IncomeList transactions={incomeData} onDelete={(id)=> {setOpenDeleteAlert({show: true, data: id})}} onDownload={handleDownloadIncome} />
                </div>
                <Modal isOpen={openAddIncomeModal} onClose={()=> setOpenAddIncomeModal(false)} title="Add Income">
                    <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>

                <Modal isOpen={openDeleteAlert.show} onClose={()=> setOpenDeleteAlert({show: false, data: null})} title="Delete Income">
                    <DeleteAlert content="Are you sure?" onDelete={handleDeleteIncome(openDeleteAlert.data)}/>
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Income;
