export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name');
    table.string('username').unique();
    table.string('password');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users');
}
