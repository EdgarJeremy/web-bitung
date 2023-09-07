/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('achievements', (table) => {
    table.increments('id');
    table.date('date');
    table.string('year');
    table.string('location');
    table.string('level');
    table.string('achievement');
    table.string('given_by');
    table.string('receive_by');
    table.string('owner');
    table.timestamps(true, true);
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('achievements')
}
