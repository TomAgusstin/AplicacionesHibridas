import autosRouter from "./autosRouter.js";
import userRoutes from "./usersRouter.js";
import categoriasRoutes from "./categoriasRouter.js";
import clienteRoutes from './clientesRouter.js';
import planesRoutes from './planClienteRouter.js'

export default function routerAPI(app){
    app.use('/autos', autosRouter);
    app.use('/users', userRoutes);
    app.use('/categorias', categoriasRoutes);
    app.use('/clientes', clienteRoutes);
    app.use('/planes', planesRoutes);
}