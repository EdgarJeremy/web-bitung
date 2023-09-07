export async function up(knex) {
  await knex.schema.createTable('announcements', (table) => {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.integer('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('announcements');
}
