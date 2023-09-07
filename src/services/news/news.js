// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  newsDataValidator,
  newsPatchValidator,
  newsQueryValidator,
  newsResolver,
  newsExternalResolver,
  newsDataResolver,
  newsPatchResolver,
  newsQueryResolver
} from './news.schema.js'
import { NewsService, getOptions } from './news.class.js'

export const newsPath = 'news'
export const newsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './news.class.js'
export * from './news.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const news = (app) => {
  // Register our service on the Feathers application
  app.use(newsPath, new NewsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: newsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(newsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(newsExternalResolver),
        schemaHooks.resolveResult(newsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(newsQueryValidator), schemaHooks.resolveQuery(newsQueryResolver)],
      find: [],
      get: [],
      create: [authenticate('jwt'), schemaHooks.validateData(newsDataValidator), schemaHooks.resolveData(newsDataResolver)],
      patch: [authenticate('jwt'), schemaHooks.validateData(newsPatchValidator), schemaHooks.resolveData(newsPatchResolver)],
      remove: [authenticate('jwt')]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
