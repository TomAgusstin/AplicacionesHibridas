import Auto from "../models/autosModel.js";

const getAutos = async (req, res) => {

    try {
        const autos = await Auto.find().populate('categoriaId');
        autos.length > 0 ? res.status(200).json({ msg: "Se encontraron autos...", data: autos }) : res.status(404).json({ msg: "No se encontraron autos." });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "No se encontraron autos", data: e });
    }

};

const addAuto = async (req, res) => {
    try {
        const { marca, modelo, categoriaId, infoPrecio, alicuota, img, alt } = req.body;
        // img = req.file.path;
        if (!marca || marca.trim() === '') {
            return res.status(400).json({ msg: "El item 'marca' no puede estar vacío, es obligatorio." });
        }
        if (!modelo || modelo.trim() === '') {
            return res.status(400).json({ msg: "El item 'modelo' no puede estar vacío, es obligatorio." });
        }
        if (!categoriaId || categoriaId.trim() === '') {
            return res.status(400).json({ msg: "El item 'categoríaId' no puede estar vacío, es obligatorio." });
        }

        if (!infoPrecio || !Array.isArray(infoPrecio) || infoPrecio.length === 0) {
            return res.status(400).json({ msg: "El item 'infoPrecio' no puede estar vacío, es obligatorio." });
        }

        if (!alicuota) {
            return res.status(400).json({ msg: "El item 'alicuota' no puede estar vacío, es obligatorio." });
        }

        if (!img || img.trim() === '') {
            return res.status(400).json({ msg: "El item 'img' no puede estar vacío, es obligatorio." });
        }
        if (!alt || alt.trim() === '') {
            return res.status(400).json({ msg: "El item 'alt' no puede estar vacío, es obligatorio." });
        }

        // img: req.file.path;
        const auto = await Auto.findOne({ marca: marca, modelo: modelo });
        if (auto) {
            return res.status(404).json({ msg: "El auto ya existe." });
        }
        // img = req.file.path;  
        
        const agregado = new Auto({ marca, modelo, categoriaId, infoPrecio, alicuota, img, alt }).save();
        agregado ?  res.status(202).json({ msg: 'Auto agregada exitosamente', data: agregado }) : res.status(404).json({ msg: 'No se pudo agregar el auto', data: agregado })
        
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al intentar agregar el auto", data: e });

    }
}
// Busqueda por ID
const getAutosById = async (req, res) => {

    try {
        const auto = await Auto.findById(req.params.id).populate('categoriaId');
        auto ? res.status(200).json({ msg: "Se encontro el auto", data: auto }) : res.status(404).json({ msg: "No se encontro ningun auto con ese ID", data: auto })

    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al querer buscar el auto.", data: e });
    }

};


// Busqueda por Marca
const getAutosByMarca = async (req, res) => {

    try {
        const auto = await Auto.findOne({ marca: req.params.marca }).populate('categoriaId');
        auto ? res.status(200).json({ msg: "Se encontraron autos", data: auto }) : res.status(404).json({ msg: "No se encontro ningun auto", data: auto })

    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al querer buscar autos.", data: e });
    }

};

// Busqueda por Modelo
const getRecetasByModelo = async (req, res) => {

    try {
        const auto = await Auto.find({ modelo: req.params.modelo }).populate('categoriaId');
        auto ? res.status(200).json({ msg: "Se encontraron autos", data: auto }) : res.status(404).json({ msg: "No se encontro ningun auto", data: auto })

    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al querer buscar el auto.", data: e });
    }

};

// Busqueda por Marca
const getAutosByCategoria = async (req, res) => {

    try {
        const auto = await Auto.findOne({ categoriaId: req.params.categoriaId }).populate('categoriaId');
        auto ? res.status(200).json({ msg: "Se encontraron autos", data: auto }) : res.status(404).json({ msg: "No se encontro ningun auto", data: auto })

    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al querer buscar autos.", data: e });
    }

};


const updateAutoById = async (req, res) => {
    try {

        const auto = await Auto.findOne({ _id: req.params.id }).populate('categoriaId');
        const { marca, modelo, categoriaId, infoPrecio, alicuota, img, alt } = req.body;
        // img = req.file.path;
        if (auto) {
            if (!marca || marca.trim() === '') {
                return res.status(400).json({ msg: "El item 'marca' no puede estar vacío, es obligatorio." });
            }
            if (!modelo || modelo.trim() === '') {
                return res.status(400).json({ msg: "El item 'modelo' no puede estar vacío, es obligatorio." });
            }
            if (!categoriaId || categoriaId.trim() === '') {
                return res.status(400).json({ msg: "El item 'categoríaId' no puede estar vacío, es obligatorio." });
            }

            if (!infoPrecio || !Array.isArray(infoPrecio) || infoPrecio.length === 0) {
                return res.status(400).json({ msg: "El item 'infoPrecio' no puede estar vacío, es obligatorio." });
            }

            if (!alicuota) {
                return res.status(400).json({ msg: "El item 'alicuota' no puede estar vacío, es obligatorio." });
            }

            if (!img || img.trim() === '') {
                return res.status(400).json({ msg: "El item 'img' no puede estar vacío, es obligatorio." });
            }
            if (!alt || alt.trim() === '') {
                return res.status(400).json({ msg: "El item 'alt' no puede estar vacío, es obligatorio." });
            }

            auto.marca = marca;
            auto.modelo = modelo;
            auto.categoriaId = categoriaId;
            auto.infoPrecio = infoPrecio;
            auto.alicuota = alicuota;
            auto.img = img;
            auto.alt = alt;

            await auto.save();

            return res.status(200).json({ msg: "Auto actualizado correctamente", auto });

        }
        else {
            return res.status(404).json({ msg: "Auto no encontrado", data: e });
        }


    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al intentar editar el producto.", data: e });

    }
}

const deleteAutoById = async (req, res) => {
    try {
        const { id } = req.params
        const status = await Auto.findByIdAndDelete(id);
        if (status) {
            res.status(200).json({ msg: 'Auto eliminado', data: [] });
        } else {
            res.status(404).json({ msg: 'No se encontro el auto a eliminar ' + id, data: [] });
        }

    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "No se pudo eliminar el auto", data: e });

    }
}


export { addAuto, getAutos, getAutosByMarca, getAutosById, getRecetasByModelo, updateAutoById, deleteAutoById, getAutosByCategoria};