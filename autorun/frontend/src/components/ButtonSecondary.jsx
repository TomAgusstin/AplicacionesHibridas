import { useNavigate } from "react-router-dom";

function ButtonSecondary(props){
    const navigate = useNavigate();

    const {to, label} = props;
    return(
        <>
            <button className="btn btn-primary" onClick={ () => {navigate(`${to}`)}} >
                {label}
            </button>
        
        
        </>
    )

}

export default ButtonSecondary;