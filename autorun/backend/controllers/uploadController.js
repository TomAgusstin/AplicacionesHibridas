const uploadController = (req, res) => {
    try{
        if(!req.file)
        {
            return res.status(401).json({msg: 'No se subio el archivo'});
        }
        return res.status(200).json({msg: 'Archivo subido'}); 
    }
    catch(er)
    {
        return res.status(500).json({msg: 'Error en el servidor', data: er});
    }
}

export {uploadController}