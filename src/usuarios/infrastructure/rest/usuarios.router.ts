//express:
import express, { Request, Response } from "express";
//usecases:
import UsuariosUseCases from "../../application/usuarios.usecases";
//repository:
import UsuariosRepository from "../../domain/user.repository";
import UsuariosRepositoryPostgres from "../db/usuarios.repository.postgres";
//domain:
import Usuario from "../../domain/Usuario";
//context:
import Auth from "../../domain/Auth";
import { createToken } from "../../../context/security/auth";
//Router: 
const router = express.Router()
//Implementation:
const usuarioRepository: UsuariosRepository = new UsuariosRepositoryPostgres
const usuarioUseCases: UsuariosUseCases = new UsuariosUseCases(usuarioRepository)
//Petitions:
router.post("/regist", async (req: Request, res: Response) => {
  try {
    const usuario: Usuario = {
      alias: req.body.alias,
      email: req.body.email,
      profesional: req.body.profesional,
      password: req.body.password
    }    
    const result: Auth | String = await usuarioUseCases.regist(usuario)
    res.json(result)
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

router.post("/login", async (req: Request, res: Response) => {
  try {
    const usuario: Usuario = {
      alias: req.body.alias,
      email: req.body.email,
      password: req.body.password
    }
    const loginOK = await usuarioUseCases.login(usuario)    
    if (loginOK) {      
      const token = createToken(loginOK)
      res.json(
        {
          id: loginOK.id,
          token: token
        }
      )
    } else {
      res.status(404).send('user not registered on the platform')
    }
  } catch (error) {
    const stringResp: String = String(error)
    res.status(500).send(stringResp)
  }
})

export { router as routerUsuario }