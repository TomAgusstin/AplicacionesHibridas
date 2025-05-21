import Puntuaciones from "../models/puntuacionesModel.js";
import dotenv from "dotenv";

dotenv.config();

const getPuntuaciones = async(  req,  res) => {
    try 
    {
        const puntuaciones = await Puntuaciones.find().populate('recetaId');

        puntuaciones.length > 0 ? res.status(200).json({ msg: "Se encontraron Puntuaciones.", data: puntuaciones}) : res.status(404).json({msg: "No se encontraron puntuaciones."});

    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error tratando de acceder al servidor", data: []});
    }
}


const getPuntuacionesById = async(  req,  res) => {
    try 
    {
        const puntuaciones = await Puntuaciones.findById(req.params.id).populate('recetaId');
        if (puntuaciones)
        {
             res.status(200).json({ msg: "Puntuaciones encontrado", data: puntuaciones});
        } 
        else 
        {
             res.status(404).json({ msg: "No se encontraron Puntuaciones", data: {}});
        }
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error del servidor", data: []});
    }
}

const setPuntuaciones = async(  req,  res) =>{
    try 
    {
        const { puntaje, descripcion, recetaId } =  req.body;
        await new Puntuaciones( {puntaje, descripcion, recetaId}).save(); 
   
         res.status(202).json({msg: "Puntuacion creado con exito." } );
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({error: "Error intentando crear la Puntuacion." + error});
    }
}

const deletePuntuacionesById = async( req,  res) => {
    try 
    {
        const status = await Puntuaciones.findByIdAndDelete(req.params.id);
        if (status)
        {
             res.status(200).json({ msg: "Puntuaciones eliminado con exito.", data: []});
        } 
        else
        {
             res.status(404).json({ msg: "Puntuaciones no encontrado.", data: []});
        }
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error intentando eliminar el Puntuaciones.", data: []});
    }
}

const updatePuntuacionesById = async(  req,  res) => {
    try 
    {
        const puntuaciones =  req.body;
        const PuntuacionesNuevo = await puntuaciones.findByIdAndUpdate(req.params.id, puntuaciones, { new: true});
        
        if (PuntuacionesNuevo)
        {
             res.status(200).json({ msg: "Puntuacion actualizada con exito.", data: PuntuacionesNuevo});
        } 
        else 
        {
             res.status(404).json({ msg: "No se encontraron puntuaciones.", data: PuntuacionesNuevo});
        }
    } catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error del servidor", data: []});
    }
}

export { getPuntuaciones, getPuntuacionesById, setPuntuaciones, deletePuntuacionesById, updatePuntuacionesById };