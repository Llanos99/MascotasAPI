import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary().unsigned()
      table.string('nombre_usuario', 100).notNullable()
      table.string('email_usuario', 100).notNullable()
      table.integer('telefono_usuario',10).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
