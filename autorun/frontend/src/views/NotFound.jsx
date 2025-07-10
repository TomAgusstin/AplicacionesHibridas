function NotFound()
{

    return(
        <>
                <div className="col-12 d-flex justify-content-center flex-column mt-5">
                    <h1 className="text-center">
                        Parece que te perdiste...
                    </h1>
                    <strong className="m-auto fs-4">
                        Paginado no encontrada
                        <i className="bi bi-emoji-frown-fill ms-3">

                        </i>
                    </strong>
                </div>

                <div className="col-12 d-flex flex-column mt-4">
                    <a className="m-auto btn btn-primary" href="/">Volver al inicio</a>
                </div>
        </>
    )

}

export default NotFound