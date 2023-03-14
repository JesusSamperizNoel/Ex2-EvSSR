import Usuario from "../../usuarios/domain/Usuario"
import Servicio from "../domain/Servicio"
import ServiciosRepository from "../domain/servicios.repository"

export default class ServiciosUseCases {

    serviciosRepository: ServiciosRepository

    constructor(serviciosRepository: ServiciosRepository) {
        this.serviciosRepository = serviciosRepository
    }

    async create (servicio: Servicio) {
        return await this.serviciosRepository.create(servicio)
    }
    
    async filter (servicio: Servicio) {
        return await this.serviciosRepository.filter(servicio)
    }

    async addUsuario (alias: String, categoria: String) {
        return await this.serviciosRepository.addUsuario(alias, categoria)
    }

    async delUsuario (alias: String, categoria: String) {
        return await this.serviciosRepository.delUsuario(alias, categoria)
    }

    async addInteresed (alias: String, titulo: String) {
        return await this.serviciosRepository.addInteresed(alias, titulo)
    }

    async delInteresed (alias: String, titulo: String) {
        return await this.serviciosRepository.delInteresed(alias, titulo)
    }

    async showSuscribers (categoria: String) {
        return await this.serviciosRepository.showSuscribers(categoria)
    }

    async showInteresed (titulo: String, alias: String) {
        return await this.serviciosRepository.showInteresed(titulo, alias)
    }
}