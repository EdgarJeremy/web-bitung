export async function up(knex) {
  await knex.schema.createTable('databank', (table) => {
    table.increments('id');
    table.date('date');
    table.string('name');
    table.string('source');
    table.string('description');
    table.string('link');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('databank')
}
