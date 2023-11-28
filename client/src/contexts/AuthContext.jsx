import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext()

export function AuthProvider(props) {

    const { children } = props
    const [ user, setUser ] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {

    })

    const login = async (accessToken) => {
        try{
            setUser({username: "Danny"})
            setToken(accessToken)
        } catch (error) {
            console.log(error)
        }
    }

    const data = {
        accessToken: token,
        user,
        login,
    }

    return <AuthContext.Provider value={data}></AuthContext.Provider>
}