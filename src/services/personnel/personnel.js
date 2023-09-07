// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  personnelDataValidator,
  personnelPatchValidator,
  personnelQueryValidator,
  personnelResolver,
  personnelExternalResolver,
  personnelDataResolver,
  personnelPatchResolver,
  personnelQueryResolver
} from './personnel.schema.js'
import { PersonnelService, getOptions } from './personnel.class.js'

export const personnelPath = 'personnel'
export const personnelMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './personnel.class.js'
export * from './personnel.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const personnel = (app) => {
  // Register our service on the Feathers application
  app.use(personnelPath, new PersonnelService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: personnelMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(personnelPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(personnelExternalResolver),
        schemaHooks.resolveResult(personnelResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(personnelQueryValidator),
        schemaHooks.resolveQuery(personnelQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(personnelDataValidator),
        schemaHooks.resolveData(personnelDataResolver)
      ],
      patch: [
        schemaHooks.validateData(personnelPatchValidator),
        schemaHooks.resolveData(personnelPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
