import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function PrivateRoute( {children} )
{
    const {token} = useContext(AuthContext);

    if(token)
    {
        return (children);
    }
    else
    {
        return(<Navigate to='/login'/>)
    }
}
export default PrivateRoute;