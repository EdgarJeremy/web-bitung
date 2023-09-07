// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  publicServicesDataValidator,
  publicServicesPatchValidator,
  publicServicesQueryValidator,
  publicServicesResolver,
  publicServicesExternalResolver,
  publicServicesDataResolver,
  publicServicesPatchResolver,
  publicServicesQueryResolver
} from './public-services.schema.js'
import { PublicServicesService, getOptions } from './public-services.class.js'

export const publicServicesPath = 'public-services'
export const publicServicesMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './public-services.class.js'
export * from './public-services.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const publicServices = (app) => {
  // Register our service on the Feathers application
  app.use(publicServicesPath, new PublicServicesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: publicServicesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(publicServicesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(publicServicesExternalResolver),
        schemaHooks.resolveResult(publicServicesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(publicServicesQueryValidator),
        schemaHooks.resolveQuery(publicServicesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(publicServicesDataValidator),
        schemaHooks.resolveData(publicServicesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(publicServicesPatchValidator),
        schemaHooks.resolveData(publicServicesPatchResolver)
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
