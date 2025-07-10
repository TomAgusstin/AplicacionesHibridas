import { useNavigate } from "react-router-dom";

function ButtonPrimary(props){
    const navigate = useNavigate();

    const {to, label} = props;
    return(
        <>
            <div className="d-flex justify-content-center">
                      <button className="btn btn-primary" onClick={ () => {navigate(`${to}`)}} >
                {label}
            </button>
            </div>
      
        
        
        </>
    )

}

export default ButtonPrimary;