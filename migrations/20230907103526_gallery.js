/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('gallery', (table) => {
    table.increments('id');
    table.string('file');
    table.string('title');
    table.text('description');
    table.enum('type', ['photo', 'video']);
    table.integer('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('gallery');
}
