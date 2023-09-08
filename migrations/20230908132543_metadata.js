export async function up(knex) {
  await knex.schema.createTable('metadata', (table) => {
    table.increments('id');
    table.string('name');
    table.string('value');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('metadata');
}
