// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  achievementsDataValidator,
  achievementsPatchValidator,
  achievementsQueryValidator,
  achievementsResolver,
  achievementsExternalResolver,
  achievementsDataResolver,
  achievementsPatchResolver,
  achievementsQueryResolver
} from './achievements.schema.js'
import { AchievementsService, getOptions } from './achievements.class.js'

export const achievementsPath = 'achievements'
export const achievementsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './achievements.class.js'
export * from './achievements.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const achievements = (app) => {
  // Register our service on the Feathers application
  app.use(achievementsPath, new AchievementsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: achievementsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(achievementsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(achievementsExternalResolver),
        schemaHooks.resolveResult(achievementsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(achievementsQueryValidator),
        schemaHooks.resolveQuery(achievementsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(achievementsDataValidator),
        schemaHooks.resolveData(achievementsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(achievementsPatchValidator),
        schemaHooks.resolveData(achievementsPatchResolver)
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
