//Application entities:
import Usuario from "../../domain/Usuario";
import UsuariosRepository from "../../domain/user.repository";
//security:
import { compare, hash } from "../../../context/security/encrypter";
//SQL:
import executeQuery from "../../../context/db/postgres.connector";

export default class UsuariosRepositoryPostgres implements UsuariosRepository {
    async regist(usuario: Usuario): Promise<String> {
        try {
            if (usuario.alias && usuario.password) {
                await executeQuery(
                    `insert into usuarios(password, alias, email, profesional)
                    values (
                        '${hash(usuario.password)}',
                        '${usuario.alias}',
                        '${usuario.email}',
                        '${usuario.profesional}'
                    )`
                )
            }
            return `Usuario: ${usuario.alias}, se ha registrado correctamente`            
        } catch (error) {
            console.error(String(error))
            return 'Datos introducidos incorrectos o invalidos'
        }     
    }

    async login(usuario: Usuario): Promise<Usuario | undefined> {
        try {
            if (usuario.alias && usuario.email && usuario.password) {
                const result: any[] = await executeQuery(`
                        select * 
                        from usuarios 
                        where alias = '${usuario.alias}' OR email = '${usuario.email}'
                    `)
                const userFromDB = result[0]                
                if (userFromDB && compare(usuario.password, userFromDB.password)) {
                    const userOK : Usuario = {
                        id: userFromDB.id,
                        alias: userFromDB.alias,
                        email: userFromDB.email,
                        profesional: userFromDB.profesional,
                        password: userFromDB.password
                    }                                
                return userOK
            }
        } 
        }catch (error) {
            return undefined            
        }
    }
}