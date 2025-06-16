import Categoria from "../models/categoriaModel.js";
import dotenv from "dotenv";

dotenv.config();

const getCategorias = async(  req,  res) => {
    try 
    {
        const categoria = await Categoria.find();

        categoria.length > 0 ? res.status(200).json({ msg: "Se encontraron categorias.", data: categoria}) : res.status(404).json({msg: "No se encontraron categorias."});

    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error tratando de acceder al servidor", data: []});
    }
}


const getCategoriaById = async(  req,  res) => {
    try 
    {
        const categoria = await Categoria.findById(req.params.id);
        if (categoria)
        {
             res.status(200).json({ msg: "Categorias encontradas", data: categoria});
        } 
        else 
        {
             res.status(404).json({ msg: "No se encontraron categorias", data: {}});
        }
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error del servidor", data: []});
    }
}

const setCategoria = async(  req,  res) =>{
    try 
    {
        const { titulo, estado } =  req.body;
        await new Categoria( {titulo, estado}).save(); 
   
         res.status(202).json({msg: "Categoria creado con exito." } );
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({mgs: "Error intentando crear la categoria.", data: error});
    }
}

const deleteCategoriaById = async( req,  res) => {
    try 
    {
        const status = await Categoria.findByIdAndDelete(req.params.id);
        if (status)
        {
             res.status(200).json({ msg: "Categoria eliminada con exito.", data: []});
        } 
        else
        {
             res.status(404).json({ msg: "Categoria no encontrada.", data: []});
        }
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error intentando eliminar la categoria.", data: []});
    }
}

const updateCategoriaById = async(  req,  res) => {
    try 
    {
        const categoria =  req.body;
        const categoriaNueva = await Categoria.findByIdAndUpdate(req.params.id, categoria, { new: true});
        
        if (categoriaNueva)
        {
             res.status(200).json({ msg: "Categoria actualizada con exito.", data: categoriaNueva});
        } 
        else 
        {
             res.status(404).json({ msg: "No se encontraron categorias.", data: categoriaNueva});
        }
    } catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error del servidor", data: []});
    }
}

export { getCategorias, getCategoriaById, setCategoria, deleteCategoriaById, updateCategoriaById };