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
router.get("/suscriptores/:categoria", isAuth, async (req: Request, res: Response) => {
  try {
    const categoria = req.params.categoria
    const result: any = await serviciosUseCases.showSuscribers(categoria)
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
    }
})

router.get("/interesados/:servicio/:usuario",isAuth, async (req: Request, res: Response) => {
  try {
    const titulo = req.params.servicio
    const alias = req.params.usuario
    const result: any = await serviciosUseCases.showInteresed(titulo, alias)
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
    }
})

router.get("/filter", async (req: Request, res: Response) => {
  try {
    const servicio: Servicio = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fechafin: req.body.fechafin,
      provincia: req.body.provincia,
      categoria: req.body.categoria
    }
    const result: any = await serviciosUseCases.filter(servicio)
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
    }
})

router.post("/create", isAuth, async (req: Request, res: Response) => {
  try {
    const servicio: Servicio = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fechafin: req.body.fechafin,
      provincia: req.body.provincia,
      categoria: req.body.categoria
    }
    const result = await serviciosUseCases.create(servicio)    
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.post("/addUsuario", isAuth, async (req: Request, res: Response) => {
  try {
    const alias = req.body.alias
    const titulo = req.body.titulo
    const result = await serviciosUseCases.addInteresed(alias, titulo)  
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.post("/delUsuario", isAuth, async (req: Request, res: Response) => {
  try {
    const alias = req.body.alias
    const titulo = req.body.titulo
    const result = await serviciosUseCases.delInteresed(alias, titulo)  
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

export { router as routerServicios };