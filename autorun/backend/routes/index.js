import autosRouter from "./autosRouter.js";
import userRoutes from "./usersRouter.js";
import categoriasRoutes from "./categoriasRouter.js";

export default function routerAPI(app){
    app.use('/autos', autosRouter);
    app.use('/users', userRoutes);
    app.use('/categorias', categoriasRoutes);
}