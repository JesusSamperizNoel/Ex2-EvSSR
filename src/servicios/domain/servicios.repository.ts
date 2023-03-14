import Servicio from "./Servicio"
import Usuario from "../../usuarios/domain/Usuario"

export default interface ServiciosRepository {
  create(servicio: Servicio): Promise<String>
  filter(servicio: Servicio): Promise<Servicio[] | String>
  addUsuario(alias: String, categoria: String): Promise<String>
  delUsuario(alias: String, categoria: String): Promise<String>
  addInteresed(alias: String, titulo: String): Promise<String>
  delInteresed(alias: String, titulo: String): Promise<String>
  showSuscribers(categoria: String): Promise<Usuario[]>
  showInteresed(titulo: String, alias: String): Promise<Usuario[] | String>
}