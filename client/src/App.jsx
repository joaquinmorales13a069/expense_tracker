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
import UserProvider from "./context/UserContext.jsx";


const App = () => {
    return (
        <UserProvider>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<Root />} />
                        <Route path={'/login'} exact element={<Login /> } />
                        <Route path={'/signUp'} exact element={<SignUp />} />
                        <Route path={'/dashboard'} exact element={<Home />} />
                        <Route path={'/income'} exact element={<Income />} />
                        <Route path={'/expense'} exact element={<Expense />} />
                    </Routes>
                </Router>
            </div>
        </UserProvider>
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
