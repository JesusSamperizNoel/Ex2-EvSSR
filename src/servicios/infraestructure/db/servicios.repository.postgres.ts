//Application entities:
import Servicio from "../../domain/Servicio"
//SQL:
import executeQuery from "../../../context/db/postgres.connector"
import ServiciosRepository from "../../domain/servicios.repository"
import Usuario from "../../../usuarios/domain/Usuario"

export default class ServiciosRepositoryPostgres implements ServiciosRepository {
        
    async create(servicio: Servicio): Promise<String> {
        try {
            if (servicio) {
                await executeQuery(
                    `insert into servicios(titulo, descripcion, fechafin, provincia, categoria)
                    values (
                        '${servicio.titulo}',
                        '${servicio.descripcion}',
                        '${servicio.fechafin}',
                        '${servicio.provincia}',
                        '${servicio.categoria}'
                    )`
                )
            }
            return `Se ha creado el servicio correctamente`            
        } catch (error) {                        
            return 'The necessary data has not been correctly provided'
        }     
    }

    async filter(servicio: Servicio): Promise<Servicio[] | String> {     
        try {

            const results: any[] = [];

            if (servicio.titulo) {
                const resultTitulo: any[] = await executeQuery(
                    `select * 
                    from servicios 
                    where titulo LIKE '${servicio.titulo}' AND categoria = '${servicio.categoria} AND provincia = '${servicio.provincia}'`
                )
                results.push(...resultTitulo)
            } else if (servicio.categoria) {
                const resultCategoria: any[] = await executeQuery(
                    `select * 
                    from servicios 
                    where categoria = '${servicio.categoria}'`
                )
                results.push(...resultCategoria)
            } else if (servicio.provincia) {
                const resultProvincia: any[] = await executeQuery(
                    `select * 
                    from servicios 
                    where provincia = '${servicio.provincia}'`
                )
                results.push(...resultProvincia)
            } else if (servicio.fechafin) {
                const resultFecha: any[] = await executeQuery(
                    `select * 
                    from servicios 
                    where fechafin between '2022-01-01' and '${servicio.provincia}'`
                )
                results.push(...resultFecha)
            }
            return results//lo devuelve todo en una misma matriz

        } catch (error) {
            return 'Han sucedidos problemas en la busqueda de servicios con filtrado'
        }
    }

    async addUsuario(alias: String, categoria: String): Promise<String> {      
        const usuarioidRes = await executeQuery(
            `select id 
            from usuarios 
            where alias = '${alias}'`
        )
           
        const newSuscriber = await executeQuery(
            `insert into suscripcionescategorias (categoria, usuario)
            values ('${categoria}', ${Number(usuarioidRes[0].id)})`
        )    
        if (newSuscriber) {
            return `Usuario: ${alias}, se ha suscrito correctamente a la categoria: ${categoria}` 
        } else {
            return "Error al añadir suscripcion"
        }
    }

    async delUsuario(alias: String, categoria: String): Promise<String> {              
        const usuarioidRes = await executeQuery(
            `select id 
            from usuarios 
            where alias = '${alias}'`
        )
        const newSuscriber = await executeQuery(
            `delete from suscripcionescategorias 
            where usuario = ${Number(usuarioidRes[0].id)}
            AND categoria = '${categoria}'`
        )        
        if (newSuscriber) {
            return `Usuario: ${alias}, ha elimindo la suscripcion correctamente de la categoria: ${categoria}` 
        } else {
            return "Error al eliminar suscpricion"
        }
    }

    async addInteresed(alias: String, titulo: String): Promise<String> {      
        const usuarioidRes = await executeQuery(
            `select id 
            from usuarios 
            where alias = '${alias}'`
        )
        const servicioidRes = await executeQuery(
            `select id 
            from servicios 
            where titulo = '${titulo}'`
        )
        const newSuscriber = await executeQuery(
            `insert into interesservicios (servicio, usuario)
            values ('${Number(servicioidRes[0].id)}', ${Number(usuarioidRes[0].id)})`
        )        
        if (newSuscriber) {
            return `Usuario: ${alias}, se ha suscrito correctamente al servicio: ${titulo}` 
        } else {
            return "Error al añadir suscripcion a un servicio profesional"
        }
    }

    async delInteresed(alias: String, titulo: String): Promise<String> {              
        const usuarioidRes = await executeQuery(
            `select id 
            from usuarios 
            where alias = '${alias}'`
        )
        const servicioidRes = await executeQuery(
            `select id 
            from servicios 
            where titulo = '${titulo}'`
        )
        const newSuscriber = await executeQuery(
            `delete from interesservicios 
            where usuario = ${Number(usuarioidRes[0].id)}
            AND servicio = '${Number(servicioidRes[0].id)}'`
        )        
        if (newSuscriber) {
            return `Usuario: ${alias}, ha elimindo la suscripcion correctamente de la categoria: ${titulo}` 
        } else {
            return "Error al eliminar suscripcion a un servicio profesional"
        }
    }

    async showSuscribers(categoria: String): Promise<Usuario[]> {        
        const result: any[] = await executeQuery(
            `select * from suscripcionescategorias where categoria = '${categoria}'`
        )        
        return result
    }

    async showInteresed(titulo: String, alias: String): Promise<Usuario[] | String> {        
        const usuarioProRes = await executeQuery(
            `select profesional
            from usuarios 
            where alias = '${alias}'`
        )        
        const servicioIdRes = await executeQuery(
            `select id
            from servicios 
            where titulo = '${titulo}'`
        )   
        //devuelve un booleano que determina el condicional (si es profesional)
        if (usuarioProRes[0].profesional) { 
            const result: any[] = await executeQuery(
                `select usuario from interesservicios where servicio = ${servicioIdRes[0].id}`
            )        
            return result
        } else {
            return 'No es un profesional o ha habido un error en la aplicación'
        }
        
        
    }
}