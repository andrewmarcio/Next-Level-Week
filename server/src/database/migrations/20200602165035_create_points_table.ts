import Knex from "knex";


export async function up(knex: Knex): Promise<any>{
    return knex.schema.createTable("points", table => {
        table.engine("InnoDB");

        table.increments("id").primary();
        table.string("image").notNullable();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("whatsapp").notNullable();
        table.decimal("latitude", 8, 6).notNullable();
        table.decimal("longitude", 9, 6).notNullable();
        table.string("city").notNullable();
        table.string("uf", 2).notNullable();
    });
}


export async function down(knex: Knex): Promise<any>{
    return knex.schema.dropTable("points");
}

