import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())
const allowedOrigins = ["http://localhost:3000"]
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options))

//Routers:
import { routerUsuario } from "./usuarios/infrastructure/rest/usuarios.router";
import { routerServicios } from "./servicios/infraestructure/rest/servicios.router";
import { routerCategorias } from "./servicios/infraestructure/rest/categorias.router";
//Router implementation:
app.use("/usuario", routerUsuario)
app.use("/servicios", routerServicios)
app.use("/categorias", routerCategorias)

//Port configuration and message check ok:
app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`)
});
