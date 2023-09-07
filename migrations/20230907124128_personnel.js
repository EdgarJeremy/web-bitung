export async function up(knex) {
  await knex.schema.createTable('personnel', (table) => {
    table.increments('id');
    table.string('name');
    table.string('position');
    table.string('class');
    table.string('rank');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('personnel');
}
