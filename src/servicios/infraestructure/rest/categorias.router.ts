import express, { Request, Response } from "express";
//usecases
import ServiciosUseCases from "../../application/servicios.usecases";
//repository
import ServiciosRepository from "../../domain/servicios.repository";
import ServiciosRepositoryPostgres from "../db/servicios.repository.postgres";
//domain
import Servicio from "../../domain/Servicio";
//context:
import { isAuth } from "../../../context/security/auth";
//Router:
const router = express.Router()
//Implementation
const serviciosRepository: ServiciosRepository = new ServiciosRepositoryPostgres()
const serviciosUseCases: ServiciosUseCases = new ServiciosUseCases(serviciosRepository)
//Petitions:
router.get("/suscriptores/:categoria", async (req: Request, res: Response) => {
  try {
    //para ver las cateforias no considero necesario comprobar su autenticacion
    const categoria = req.params.categoria
    const result: any = await serviciosUseCases.showSuscribers(categoria)
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
    }
})

router.post("/addUsuario", isAuth, async (req: Request, res: Response) => {
  try {    
    const alias = req.body.alias
    const categoria = req.body.categoria
    const result = await serviciosUseCases.addUsuario(alias, categoria)  
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.post("/delUsuario", isAuth, async (req: Request, res: Response) => {
  try {
    const alias = req.body.alias
    const categoria = req.body.categoria
    const result = await serviciosUseCases.delUsuario(alias, categoria)  
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

export { router as routerCategorias };