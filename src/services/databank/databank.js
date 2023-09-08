// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  databankDataValidator,
  databankPatchValidator,
  databankQueryValidator,
  databankResolver,
  databankExternalResolver,
  databankDataResolver,
  databankPatchResolver,
  databankQueryResolver
} from './databank.schema.js'
import { DatabankService, getOptions } from './databank.class.js'

export const databankPath = 'databank'
export const databankMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './databank.class.js'
export * from './databank.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const databank = (app) => {
  // Register our service on the Feathers application
  app.use(databankPath, new DatabankService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: databankMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(databankPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(databankExternalResolver),
        schemaHooks.resolveResult(databankResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(databankQueryValidator),
        schemaHooks.resolveQuery(databankQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        authenticate('jwt'),
        schemaHooks.validateData(databankDataValidator),
        schemaHooks.resolveData(databankDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        schemaHooks.validateData(databankPatchValidator),
        schemaHooks.resolveData(databankPatchResolver)
      ],
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
