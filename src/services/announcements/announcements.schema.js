// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const announcementsSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    description: Type.String(),
    user_id: Type.Number(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' }),
  },
  { $id: 'Announcements', additionalProperties: false }
)
export const announcementsValidator = getValidator(announcementsSchema, dataValidator)
export const announcementsResolver = resolve({
  user: virtual(async (data, context) => {
    if (data.user_id)
      return await context.app.service('users').get(data.user_id);
    return null;
  }),
})

export const announcementsExternalResolver = resolve({})

// Schema for creating new entries
export const announcementsDataSchema = Type.Pick(announcementsSchema, ['title', 'description'], {
  $id: 'AnnouncementsData'
})
export const announcementsDataValidator = getValidator(announcementsDataSchema, dataValidator)
export const announcementsDataResolver = resolve({
  user_id: async (value, data, context) => context.params.user.id
})

// Schema for updating existing entries
export const announcementsPatchSchema = Type.Partial(announcementsSchema, {
  $id: 'AnnouncementsPatch'
})
export const announcementsPatchValidator = getValidator(announcementsPatchSchema, dataValidator)
export const announcementsPatchResolver = resolve({})

// Schema for allowed query properties
export const announcementsQueryProperties = Type.Pick(announcementsSchema, ['id', 'text'])
export const announcementsQuerySchema = Type.Intersect(
  [
    querySyntax(announcementsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const announcementsQueryValidator = getValidator(announcementsQuerySchema, queryValidator)
export const announcementsQueryResolver = resolve({})
