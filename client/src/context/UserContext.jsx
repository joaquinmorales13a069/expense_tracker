import React, { createContext, useState } from "react";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

//     Function to update user data
    const updatedUser = (userData) => {
        setUser(userData)
    }

//     Function to clear user data (e.g. on logout)
    const clearUser = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{
            user,
            updatedUser,
            clearUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider