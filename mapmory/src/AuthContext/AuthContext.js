import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

/**
 * @description Provide context for all 'children' wrapped in it; the context is 'authorized' variable that let...
 * ... the 'children' know the value of 'authorized', aka if the user is logged in
 * 
 * Make an API call to back end to see if the user is logged in; if its not, then direct to '/' route
 */

export const AuthProvider = ({children}) => {
    const [authorized, setAuthorized] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:4000/api/verified', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success'){
                console.log(data.message)
                setAuthorized(true)
            }else{
                console.log(data.message)
                setAuthorized(false)
                navigate('/', {replace:true})
            }
        })
    },[])

    return <AuthContext.Provider value={{authorized}}>{children}</AuthContext.Provider>
}

