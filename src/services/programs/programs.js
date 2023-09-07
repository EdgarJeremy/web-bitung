// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  programsDataValidator,
  programsPatchValidator,
  programsQueryValidator,
  programsResolver,
  programsExternalResolver,
  programsDataResolver,
  programsPatchResolver,
  programsQueryResolver
} from './programs.schema.js'
import { ProgramsService, getOptions } from './programs.class.js'

export const programsPath = 'programs'
export const programsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './programs.class.js'
export * from './programs.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const programs = (app) => {
  // Register our service on the Feathers application
  app.use(programsPath, new ProgramsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: programsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(programsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(programsExternalResolver),
        schemaHooks.resolveResult(programsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(programsQueryValidator),
        schemaHooks.resolveQuery(programsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(programsDataValidator),
        schemaHooks.resolveData(programsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(programsPatchValidator),
        schemaHooks.resolveData(programsPatchResolver)
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
