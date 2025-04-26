import Receta from "../models/recetasModel.js";

const getRecetas = async(req, res) =>{

    try{
        const recetas = await Receta.find();
        recetas ? res.status(200).json({msg: "Se encontraron recetas...", data: recetas}) : res.status(404).json({msg: "No se encontraron recetas."});
    }
    catch(e)
    {
        console.error(e);
        res.status(500).json(e);
    }
       
};

const addReceta = async(req, res) =>{
    try{
        const {titulo, categoria, ingredientes, instrucciones, usuarioAlta} = req.body;

        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({ msg: "El item 'título' no puede estar vacío, es obligatorio." });
        }
        
        if (!categoria || categoria.trim() === '') {
            return res.status(400).json({ msg: "El item 'categoría' no puede estar vacío, es obligatorio." });
        }
        
        if (!ingredientes || !Array.isArray(ingredientes) || ingredientes.length === 0) {
            return res.status(400).json({ msg: "El item 'ingredientes' no puede estar vacío, es obligatorio." });
        }
        
        if (!instrucciones || !Array.isArray(instrucciones) || instrucciones.length === 0) {
            return res.status(400).json({ msg: "El item 'instrucciones' no puede estar vacío, es obligatorio." });
        }
        
        if (!usuarioAlta || usuarioAlta.trim() === '') {
            return res.status(400).json({ msg: "El item 'usuario de alta' no puede estar vacío, es obligatorio." });
        }

        
        const receta = await Receta.findOne({titulo: titulo});
        if(receta)
        {
            return res.status(404).json({msg: "La receta ya existe"});
        }
        new Receta({titulo, categoria, ingredientes, instrucciones, usuarioAlta}).save();
        res.status(202).json({msg: 'Receta agregada exitosamente'});

    }
    catch(e){
        console.error(e);       
        res.status(500).json({msg: "Error al intentar agregar la receta", data: e});

    }
}

const getRecetasByName= async(req, res) =>{

    try{
        const receta = await Receta.findOne({titulo: req.params.titulo});
        receta ? res.status(200).json({msg: "Se encontro la receta", data: receta}) : res.status(404).json({msg: "No se encontro ninguna receta", data: receta})
        
    }
    catch(e)
    {
        console.error(e);
        res.status(500).json({msg: "Error al querer buscar la receta.", data: e});
    }
       
};

const updateRecetaByName = async(req, res) =>{
    try{
        const {titulo, categoria, ingredientes, instrucciones, usuarioAlta} = req.body;
        const receta = await Receta.findOne({titulo: req.params.titulo});

        if(receta)
        {
            if (!titulo || titulo.trim() === '') {
                return res.status(400).json({ msg: "El item 'título' no puede estar vacío, es obligatorio." });
            }
            
            if (!categoria || categoria.trim() === '') {
                return res.status(400).json({ msg: "El item 'categoría' no puede estar vacío, es obligatorio." });
            }
            
            if (!ingredientes || !Array.isArray(ingredientes) || ingredientes.length === 0) {
                return res.status(400).json({ msg: "El item 'ingredientes' no puede estar vacío, es obligatorio." });
            }
            
            if (!instrucciones || !Array.isArray(instrucciones) || instrucciones.length === 0) {
                return res.status(400).json({ msg: "El item 'instrucciones' no puede estar vacío, es obligatorio." });
            }
            
            if (!usuarioAlta || usuarioAlta.trim() === '') {
                return res.status(400).json({ msg: "El item 'usuario de alta' no puede estar vacío, es obligatorio." });
            }

            receta.titulo = titulo;
            receta.categoria = categoria;
            receta.ingredientes = ingredientes;
            receta.instrucciones = instrucciones;
            receta.usuarioAlta = usuarioAlta;

            await receta.save();
    
            return res.status(200).json({ msg: "Receta actualizada correctamente", receta });

        }
        else{
            return res.status(404).json({ msg: "Receta no encontrada" });
        }

        
    }
    catch(e){
        console.error(e);       
        res.status(500).json({msg: "Error al intentar editar el producto.", data: e});

    }
}

const deleteRecetaByName = async(req, res) =>{
    try{
        const receta = await Receta.findOne({titulo: req.params.titulo});
        
        if(receta)
        {
            receta.delete({titulo: req.params.titulo});
            return res.status(200).json({ msg: "Receta eliminada correctamente", receta});
        }   
        else
        {
            return res.status(404).json({ msg: "Receta no encontrada" });
        }

    }
    catch(e){
        console.error(e);       
        res.status(500).json({msg: "No se pudo eliminar el producto", data: e});

    }
}


export {addReceta, getRecetas, getRecetasByName, updateRecetaByName, deleteRecetaByName};