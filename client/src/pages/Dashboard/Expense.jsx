import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import ExpenseList from "../../components/expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
    useUserAuth();

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    // API calls
    // Function to fetch expense data
    const fetchExpenseDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET}`
            );
            if (response.data) {
                // Correctly extract the expense array from the response
                const data = response.data.expense || [];
                setExpenseData(data);
                console.log("Expense data fetched:", data); // Debug log
            }
        } catch (error) {
            console.log("Error fetching expense data:", error);
            setError("Failed to load expense data");
        } finally {
            setLoading(false);
        }
    };

    // Handle add Expense
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        // Validate the input
        if (!category || !amount || !date) {
            alert("Please fill in all fields");
            return;
        }

        // Send data to the server
        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD, {
                category,
                amount,
                date,
                icon,
            });

            setOpenAddExpenseModal(false);
            console.log("Expense added successfully");
            // Fetch the updated income data
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error adding income:",
                error.response?.data?.message || error.message
            );
        }
    };

    // Handle delete expense
    const handleDeleteExpense = async (expenseId) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE(expenseId));

            setOpenDeleteAlert({ show: false, data: null });
            console.log("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error deleting expense: ",
                error.response?.data?.message || error.message
            );
        }
    };

    // Handle download expense
    const handleDownloadExpenseDetails = async () => {
        // Your implementation here
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD, {
                responseType: "blob", // Important for downloading files
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx"); // Specify the file name
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link); // Clean up
            window.URL.revokeObjectURL(url); // Release the object URL
        } catch (error) {
            console.error(
                "Error downloading expense details: ",
                error.response?.data?.message || error.message
            );
            alert("Failed to download expense details");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();

        return () => {};
    }, []);

    return (
        <DashboardLayout activeMenu={"Expense"}>
            <div className=" my-5 mx-auto">
                <div className=" grid grid-cols-1 gap-6">
                    <div className=" ">
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => {
                                setOpenAddExpenseModal(true);
                            }}
                        />
                    </div>
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id });
                        }}
                        onDownload={handleDownloadExpenseDetails}
                    />
                </div>

                {/* Add Expense Modal */}
                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>

                <Modal isOpen={openDeleteAlert.show} onClose={()=> setOpenDeleteAlert({show: false, data: null})} title="Delete Expense">
                    <DeleteAlert content="Are you sure?" onDelete={handleDeleteExpense(openDeleteAlert.data)}/>
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Expense;
