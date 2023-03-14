import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import Usuario from "../../usuarios/domain/Usuario";

const SECRET_KEY: Secret = "mySecretKey"

const createToken = (usuario: Usuario): string => {
  console.log(usuario)
  
  const payload = {
    usuario: {
      id: usuario.id,
      alias: usuario.alias,
      email: usuario.email
    },
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 days" })
}

const isAuth = (req: Request, response: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"]
    const token: string | undefined = authHeader && authHeader.split(" ")[1]
    if (token) {
      const decoded: any = jwt.verify(token, SECRET_KEY)
      req.body.auth = decoded.usuario
      next()
    }
  } catch (err) {
    console.error(err)
    response.status(401).json("Not authorized")
  }
};

export { createToken, isAuth }
