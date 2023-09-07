export async function up(knex) {
  await knex.schema.createTable('programs', (table) => {
    table.increments('id');
    table.string('cover');
    table.string('name');
    table.text('content');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('programs')
}
