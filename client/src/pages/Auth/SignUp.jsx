import React, {useState} from 'react';
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import {validateEmail} from "../../utils/helper.js";
import ProfilePicSelector from "../../components/inputs/ProfilePicSelector.jsx";

function SignUp() {
    const [profilePic, setProfilePic] = useState(null)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    // HANDLE SIGN UP FORM SUBMIT
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = ''

        if (!fullName) {
            setError('Please enter your full name');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!password) {
            setError('Please enter your password');
            return;
        }

        setError("");

        //    Sign Up API CALL
    }

    return (
        <AuthLayout>
            <div className={' lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'}>
                <h3 className={' text-xl font-semibold text-black'}>Create an Account</h3>
                <p className={' text-xs text-slate-700 mt-[5px] mb-6'}>Join us Today by entering your details below</p>

                <form onSubmit={handleSignUp}>
                    {/*Profile Photo Selector*/}
                    <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
                    {/*User information form*/}
                    <div className={' grid grid-cols-1 md:grid-cols-2 gap-4'}>
                        {/*full name input*/}
                        <Input value={fullName} onChange={({target}) => setFullName(target.value)} label={"Full Name"}
                               placeholder={'John Smith'} type={'text'}/>
                        {/*email input*/}
                        <Input value={email} onChange={({target}) => setEmail(target.value)} label={'Email Address'}
                               placeholder={'john@example.com'} type={'text'}/>
                        <div className={' col-span-2'}>
                            {/*password input*/}
                            <Input value={password} onChange={({target}) => setPassword(target.value)} label={'Password'}
                                   placeholder={'Min 8 characters'} type={'password'}/>
                        </div>
                    </div>

                    {/*error handling*/}
                    {error && <p className={' text-red-500 text-xs pb-2.5'}>{error}</p>}

                    <button type={'submit'} className={' btn-primary'}>Sign Up</button>

                    <p className={' text-[13px] text-slate-800 mt-3'}>Have an account? <Link to={'/login'} className={' font-medium text-primary underline'}>Log In</Link></p>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignUp;