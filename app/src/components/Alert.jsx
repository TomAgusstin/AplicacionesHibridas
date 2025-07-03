function Alert(props)
{
    const {tipoAlerta, texto, dismissAlert} = props;


    return(
        <><div className="d-flex justify-content-center mt-3"><div className={`text-center w-50 alert ${tipoAlerta} alert-dismissible`}>{texto}<button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => dismissAlert('')}
                                ></button></div></div>
            
        </>
    )
    
}

export default Alert;