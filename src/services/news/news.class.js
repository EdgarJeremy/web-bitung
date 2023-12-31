import { KnexService } from '@feathersjs/knex'
import { NotFound } from '@feathersjs/errors'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class NewsService extends KnexService {
  async get(slug) {
    const news = (await super.find({ query: { slug } })).data[0];
    if (!news) throw new NotFound('News not found');
    return news;
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'news'
  }
}
