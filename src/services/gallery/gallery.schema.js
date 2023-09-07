// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const gallerySchema = Type.Object(
  {
    id: Type.Number(),
    file: Type.String(),
    title: Type.String(),
    description: Type.String(),
    type: Type.Union([Type.Literal('photo'), Type.Literal('video')]),
    user_id: Type.Number(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'Gallery', additionalProperties: false }
)
export const galleryValidator = getValidator(gallerySchema, dataValidator)
export const galleryResolver = resolve({
  user: virtual(async (data, context) => {
    if (data.user_id)
      return await context.app.service('users').get(data.user_id);
    return null;
  })
})

export const galleryExternalResolver = resolve({})

// Schema for creating new entries
export const galleryDataSchema = Type.Pick(gallerySchema, ['file', 'title', 'description', 'type'], {
  $id: 'GalleryData'
})
export const galleryDataValidator = getValidator(galleryDataSchema, dataValidator)
export const galleryDataResolver = resolve({
  user_id: async (value, data, context) => context.params.user.id
})

// Schema for updating existing entries
export const galleryPatchSchema = Type.Partial(gallerySchema, {
  $id: 'GalleryPatch'
})
export const galleryPatchValidator = getValidator(galleryPatchSchema, dataValidator)
export const galleryPatchResolver = resolve({})

// Schema for allowed query properties
export const galleryQueryProperties = Type.Pick(gallerySchema, ['id', 'text'])
export const galleryQuerySchema = Type.Intersect(
  [
    querySyntax(galleryQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const galleryQueryValidator = getValidator(galleryQuerySchema, queryValidator)
export const galleryQueryResolver = resolve({})
