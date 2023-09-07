
 export async function up(knex) {
    await knex.schema.createTable('legals', table => {
        table.increments('id');
        table.string('type');
        table.string('year');
        table.string('number');
        table.string('file');

        table.timestamps(true, true);
    });
}

 export async function down(knex) {
    await knex.schema.dropTable('legals');
}
