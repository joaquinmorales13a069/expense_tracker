import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom"
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import Income from "./pages/Dashboard/Income.jsx";
import Expense from "./pages/Dashboard/Expense.jsx";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path={'/login'} exact element={<Login /> } />
                    <Route path={'/singUp'} exact element={<SignUp />} />
                    <Route path={'/dashboard'} exact element={<Home />} />
                    <Route path={'/income'} exact element={<Income />} />
                    <Route path={'/expenses'} exact element={<Expense />} />
                </Routes>
            </Router>
        </div>
    )
};

export default App;

const Root = () => {
//     Check if token exist in LocalStorage
    const token = localStorage.getItem('token');
    if (token) {
        return <Navigate to="/dashboard" />
    }
    return <Navigate to="/login" />
}
