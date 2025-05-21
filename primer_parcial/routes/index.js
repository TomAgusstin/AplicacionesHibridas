import recetasRouter from "./recetasRouter.js";
import userRoutes from "./usersRouter.js";
import puntuacionesRoutes from "./puntuacionesRouter.js";

export default function routerAPI(app){
    app.use('/recetas', recetasRouter);
    app.use('/users', userRoutes);
    app.use('/puntuaciones', puntuacionesRoutes);
}