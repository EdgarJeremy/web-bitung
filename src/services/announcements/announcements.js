// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  announcementsDataValidator,
  announcementsPatchValidator,
  announcementsQueryValidator,
  announcementsResolver,
  announcementsExternalResolver,
  announcementsDataResolver,
  announcementsPatchResolver,
  announcementsQueryResolver
} from './announcements.schema.js'
import { AnnouncementsService, getOptions } from './announcements.class.js'

export const announcementsPath = 'announcements'
export const announcementsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './announcements.class.js'
export * from './announcements.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const announcements = (app) => {
  // Register our service on the Feathers application
  app.use(announcementsPath, new AnnouncementsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: announcementsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(announcementsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(announcementsExternalResolver),
        schemaHooks.resolveResult(announcementsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(announcementsQueryValidator),
        schemaHooks.resolveQuery(announcementsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        authenticate('jwt'),
        schemaHooks.validateData(announcementsDataValidator),
        schemaHooks.resolveData(announcementsDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        schemaHooks.validateData(announcementsPatchValidator),
        schemaHooks.resolveData(announcementsPatchResolver)
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
