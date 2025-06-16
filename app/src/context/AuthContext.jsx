import { useState, createContext } from "react";

const AuthContext = createContext();

function AuthProvider( {children} )
{
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    function login(user, token)
    {
        setUser(user);
        setToken(token);
        localStorage.setItem('token', token);
    }

    function logout()
    {
        setToken(null);
        localStorage.removeItem('token');
    }


    return(

            <AuthContext.Provider value={{user, token, login, logout}}>
                {children}    
            </AuthContext.Provider>
    )

}

export { AuthProvider, AuthContext } ;