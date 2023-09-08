// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  galleryDataValidator,
  galleryPatchValidator,
  galleryQueryValidator,
  galleryResolver,
  galleryExternalResolver,
  galleryDataResolver,
  galleryPatchResolver,
  galleryQueryResolver
} from './gallery.schema.js'
import { GalleryService, getOptions } from './gallery.class.js'

export const galleryPath = 'gallery'
export const galleryMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './gallery.class.js'
export * from './gallery.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const gallery = (app) => {
  // Register our service on the Feathers application
  app.use(galleryPath, new GalleryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: galleryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(galleryPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(galleryExternalResolver),
        schemaHooks.resolveResult(galleryResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(galleryQueryValidator), schemaHooks.resolveQuery(galleryQueryResolver)],
      find: [],
      get: [],
      create: [authenticate('jwt'), schemaHooks.validateData(galleryDataValidator), schemaHooks.resolveData(galleryDataResolver)],
      patch: [authenticate('jwt'), schemaHooks.validateData(galleryPatchValidator), schemaHooks.resolveData(galleryPatchResolver)],
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
