import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import {validateEmail} from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import {UserContext} from "../../context/UserContext.jsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { updateUser } = userContext(UserContext)

    const navigate = useNavigate()

    // handle login form submit
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!password) {
            setError('Please enter your password');
            return;
        }

        setError("");

    //    Login API CALL
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            })
            const { token, user } = response.data

            if (token){
                localStorage.setItem("token", token)
                updateUser(user)
                navigate("/dashboard")
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("Something went wrong. Please try again")
            }
        }
    }

    return <AuthLayout>
        <div className={' lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'}>
            <h3 className={' text-xl font-semibold text-black'}>Welcome Back</h3>
            <p className={' text-xs text-slate-700 mt-[5px] mb-6'}>Please enter your details to log in</p>

            <form onSubmit={handleLogin}>
                {/*email input*/}
                <Input value={email} onChange={({target}) => setEmail(target.value)} label={'Email Address'} placeholder={'john@example.com'} type={'text'}/>
                {/*password input*/}
                <Input value={password} onChange={({target}) => setPassword(target.value)} label={'Password'} placeholder={'Min 8 characters'} type={'password'}/>

            {/*error handling*/}
                {error && <p className={' text-red-500 text-xs pb-2.5'}>{error}</p>}

                <button type={'submit'} className={' btn-primary'}>Login</button>

                <p className={' text-[13px] text-slate-800 mt-3'}>Don't have an account? <Link to={'/signup'} className={' font-medium text-primary underline'}>Sign Up</Link></p>
            </form>
        </div>
    </AuthLayout>;
};

export default Login;
