export async function up(knex) {
  await knex.schema.createTable('events', (table) => {
    table.increments('id');
    table.string('image');
    table.string('title');
    table.string('description');
    table.integer('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  })
}

export async function down(knex) {
  await knex.schema.dropTable('events')
}
