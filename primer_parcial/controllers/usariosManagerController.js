import Usuario from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret_key = process.env.SECRET_KEY;
const salt = 10;

const getUsuarios = async(  req,  res) => {
    try 
    {
        const users = await Usuario.find();

        users.length > 0 ? res.status(200).json({ msg: "Usuario encontrado", data: users}) : res.status(404).json({msg: "Usuario no encontrado."});

    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error tratando de acceder al servidor", data: []});
    }
}


const getUsuarioById = async(  req,  res) => {
    try 
    {
        const user = await Usuario.findById(req.params.id);
        if (user)
        {
             res.status(200).json({ msg: "Usuario encontrado", data: user});
        } 
        else 
        {
             res.status(404).json({ msg: "No se encontro el usuario", data: {}});
        }
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error del servidor", data: []});
    }
}

const setUsuario = async(  req,  res) =>{
    try 
    {
        const { nombre, email, password } =  req.body;

        const user = await Usuario.findOne({ email: email });
        if( user )
        {
            return  res.status(404).json({msg:"Error, el usuario ya existe."});
        }
        const passwordHash = await bcrypt.hash( password, salt);
        
        await new Usuario( {nombre, email, password: passwordHash}).save(); 
   
         res.status(202).json({msg: "Usuario creado con exito." } );
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({error: "Error intentando crear el usuario." + error});
    }
}

const deleteUsuarioById = async( req,  res) => {
    try 
    {
        const status = await Usuario.findByIdAndDelete(req.params.id);
        if (status)
        {
             res.status(200).json({ msg: "Usuario eliminado con exito.", data: []});
        } 
        else
        {
             res.status(404).json({ msg: "Usuario no encontrado.", data: []});
        }
    } 
    catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error intentando eliminar el usuario.", data: []});
    }
}

const updateUsuarioById = async(  req,  res) => {
    try 
    {
        const user =  req.body;
        const usuarioNuevo = await User.findByIdAndUpdate(req.params.id, user, { new: true});
        
        if (usuarioNuevo)
        {
             res.status(200).json({ msg: "Usuario actualizado con exito.", data: usuarioNuevo});
        } 
        else 
        {
             res.status(404).json({ msg: "Usuario no encontrado.", data: usuarioNuevo});
        }
    } catch (error) 
    {
        console.error({error});
         res.status(500).json({msg: "Error del servidor", data: []});
    }
}

const auth = async(  req,  res ) => {
    const { email, password } =  req.body;

    const user = await Usuario.findOne({email});
    
    if(!user)
    {
        return  res.status(404).json({msg: "El email no existe en sistema."});
    }
    const status = await bcrypt.compare( password, user.password );
    
    if( !status)
    {
        return  res.status(404).json({msg: "Contraseña Invalida"});
    }
    
    const data = {
        id: user._id,
        email: user.email
    }
    // Generamos el token
    const token = jwt.sign( data, secret_key, { expiresIn: "1h"});
     res.json({msg: "Usuario logueado con exito.", token: token});
}
export { getUsuarios, getUsuarioById, setUsuario, deleteUsuarioById, updateUsuarioById, auth };