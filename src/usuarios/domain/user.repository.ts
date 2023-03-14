import User from "./Usuario"

export default interface UsuariosRepository {
  regist(user: User): Promise<String>
  login(user: User): Promise<User | undefined>
}