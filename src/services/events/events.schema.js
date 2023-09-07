// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const eventsSchema = Type.Object(
  {
    id: Type.Number(),
    image: Type.String(),
    title: Type.String(),
    description: Type.String(),
    user_id: Type.Number(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' }),
  },
  { $id: 'Events', additionalProperties: false }
)
export const eventsValidator = getValidator(eventsSchema, dataValidator)
export const eventsResolver = resolve({
  user: virtual(async (data, context) => {
    if (data.user_id)
      return await context.app.service('users').get(data.user_id);
    return null;
  }),
})

export const eventsExternalResolver = resolve({})

// Schema for creating new entries
export const eventsDataSchema = Type.Pick(eventsSchema, ['image', 'title', 'description'], {
  $id: 'EventsData'
})
export const eventsDataValidator = getValidator(eventsDataSchema, dataValidator)
export const eventsDataResolver = resolve({
  user_id: async (value, data, context) => context.params.user.id
})

// Schema for updating existing entries
export const eventsPatchSchema = Type.Partial(eventsSchema, {
  $id: 'EventsPatch'
})
export const eventsPatchValidator = getValidator(eventsPatchSchema, dataValidator)
export const eventsPatchResolver = resolve({})

// Schema for allowed query properties
export const eventsQueryProperties = Type.Pick(eventsSchema, ['id', 'text'])
export const eventsQuerySchema = Type.Intersect(
  [
    querySyntax(eventsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const eventsQueryValidator = getValidator(eventsQuerySchema, queryValidator)
export const eventsQueryResolver = resolve({})
