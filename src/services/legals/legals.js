// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  legalsDataValidator,
  legalsPatchValidator,
  legalsQueryValidator,
  legalsResolver,
  legalsExternalResolver,
  legalsDataResolver,
  legalsPatchResolver,
  legalsQueryResolver
} from './legals.schema.js'
import { LegalsService, getOptions } from './legals.class.js'

export const legalsPath = 'legals'
export const legalsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './legals.class.js'
export * from './legals.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const legals = (app) => {
  // Register our service on the Feathers application
  app.use(legalsPath, new LegalsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: legalsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(legalsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(legalsExternalResolver),
        schemaHooks.resolveResult(legalsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(legalsQueryValidator), schemaHooks.resolveQuery(legalsQueryResolver)],
      find: [],
      get: [],
      create: [
        authenticate('jwt'), schemaHooks.validateData(legalsDataValidator), schemaHooks.resolveData(legalsDataResolver)],
      patch: [
        authenticate('jwt'), schemaHooks.validateData(legalsPatchValidator), schemaHooks.resolveData(legalsPatchResolver)],
      remove: [
        authenticate('jwt')]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
