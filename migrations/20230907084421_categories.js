export async function up(knex) {
  await knex.schema.createTable('categories', (table) => {
    table.increments('id');
    table.string('name');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('categories');
}
