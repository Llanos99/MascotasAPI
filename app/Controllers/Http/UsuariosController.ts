import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Usuario from "App/Models/Usuario";
export default class UsuariosController {

  public async registrarUsuario({request, response}: HttpContextContract) {

    const dataUsuario = request.only(['id', 'nombre_usuario', 'email_usuario', 'telefono_usuario'])
    try {
      const id = dataUsuario.id;
      const usuarioExistente: Number = await this.validarUsuario(id)
      if (usuarioExistente === 0) {
        await Usuario.create(dataUsuario)
        response.status(200).json({"msg": "Usuario registrado con exito"})
      } else {
        response.status(400).json({"msg": "El usuario ya se encuentra registrado"})
      }
    } catch (error) {
      response.status(500).json({"msg": "Server side error"})
    }

  }

  public async obtenerUsuario({request}: HttpContextContract) {
    const id = request.param('id');
    const usuario = await Usuario.find(id);
    return usuario;
  }

  public async actualizarUsuario({request}: HttpContextContract) {

    const id = request.param('id');
    /* Recibe todos los campos del JSON en el request. */
    const user = request.all();
    try {
      await Usuario.query().where('id', id).update({
          id: user.id,
          nombre_usuario: user.nombre_usuario,
          contrasena: user.contrasena,
          email: user.email,
          telefono: user.telefono
        }
      );
      return {"msg": "Usuario actualizado con exito"};
    } catch (error) {
      return {"msg": "Server side error"};
    }


  }

  public async eliminarUsuario({request}: HttpContextContract) {

    const id = request.param('id');
    try {
      await Usuario.query().where('id', id).delete();
      return {"msg": "Usuario eliminado con exito"};
    } catch (error) {
      return {"msg": "Server side error"};
    }

  }

  private async validarUsuario(id: Number): Promise<Number> {
    const ptr = await Usuario.query().where({"id": id}).count('*').from('usuarios');
    return parseInt(ptr[0]["count(*)"])
  }


}
