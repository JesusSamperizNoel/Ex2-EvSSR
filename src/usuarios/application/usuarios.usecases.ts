import Usuario from "../domain/Usuario";
import UsuariosRepository from "../domain/user.repository";

export default class UsuariosUseCases {

  usuariosRepository: UsuariosRepository;

  constructor(userRepository: UsuariosRepository) {
    this.usuariosRepository = userRepository;
  }

  regist(usuario: Usuario): Promise<String> {
    return this.usuariosRepository.regist(usuario);
  }

  login(usuario: Usuario): Promise<Usuario | undefined> {
    return this.usuariosRepository.login(usuario);
  }
}