import knex from '../database/connections'

export const listItemsRepository = async () => {
    return await knex('items').select('*')
}
