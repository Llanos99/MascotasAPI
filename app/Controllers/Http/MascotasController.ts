import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Mascota from "App/Models/Mascota";

export default class MascotasController {

  public async registrarMascota({request, response}: HttpContextContract) {
    const dataMascota = request.only(['codigo_animal', 'nombre_animal', 'especie', 'raza', 'genero', 'edad'])
    try {
      const id = dataMascota.codigo_animal;
      const mascotaExistente: Number = await this.validarMascota(id)
      if (mascotaExistente === 0) {
        await Mascota.create(dataMascota)
        response.status(200).json({"msg": "Mascota registrada con exito"})
      } else {
        response.status(400).json({"msg": "La mascota ya se encuentra registrada"})
      }
    } catch (error) {
      response.status(500).json({"msg": "Server side error"})
    }
  }

  private async validarMascota(id: Number): Promise<Number> {
    const ptr = await Mascota.query().where({"codigo_animal": id}).count('*').from('mascotas');
    return parseInt(ptr[0]["count(*)"])
  }

  public async listadoMascotas(): Promise<Mascota[]> {
    const mascotas = await Mascota.all()
    return mascotas;
  }

  public async filtrarMascotas({request}: HttpContextContract): Promise<Mascota[]> {
    const especie = request.param('especie');
    const mascotas = await Mascota.query().where('especie', especie);
    return mascotas;
  }

  public async mascotasMenores({request}: HttpContextContract): Promise<Mascota[]> {
    const edad = request.param('edad');
    const mascotas_menores_8 = await Mascota.query().where('edad', '<=', edad);
    return mascotas_menores_8;
  }

  public async actualizarMascote({request}: HttpContextContract) {
    const id = request.param('id')
    const mascota = request.all()
    await Mascota.query().where('codigo_animal', id).update({
      nombre_animal: mascota.nombre_animal,
      especie: mascota.especie,
      raza: mascota.raza,
      genero: mascota.genero,
      edad: mascota.edad
    });
    return ("Registro de mascota actualizada con exito");
  }

  public async eliminarMascota({request}: HttpContextContract) {
    const id = request.param('id');
    await Mascota.query().where('codigo_animal', id).delete();
    return ("Registro de mascota eliminado");
  }


}
