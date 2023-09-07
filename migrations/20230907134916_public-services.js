export async function up(knex) {
  await knex.schema.createTable('public-services', (table) => {
    table.increments('id');
    table.string('image');
    table.string('name');
    table.string('description');
    table.string('link');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('public-services')
}
