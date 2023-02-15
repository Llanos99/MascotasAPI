/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {

  /* CRUD routes */

  Route.get('/get/:id', 'UsuariosController.obtenerUsuario')
  Route.post('/create', 'UsuariosController.registrarUsuario')
  Route.put('/update/:id', 'UsuariosController.actualizarUsuario')
  Route.delete('/delete/:id', 'UsuariosController.eliminarUsuario')

  /* Activity routes */

  Route.get('/listar/mascotas', 'MascotasController.listadoMascotas')
  Route.get('/listar/especies/:especie', 'MascotasController.filtrarMascotas')
  Route.get('/listar/edad/:edad', 'MascotasController.mascotasMenores')
  Route.post('/registrar/mascota', 'MascotasController.registrarMascota')
  Route.put('/actualizar/mascota/:id', 'MascotasController.actualizarMascote')
  Route.delete('/eliminar/mascota/:id', 'MascotasController.eliminarMascota')

}).prefix('/crud')
