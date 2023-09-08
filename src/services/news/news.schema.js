// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import slug from 'slug'

// Main data model schema
export const newsSchema = Type.Object(
  {
    id: Type.Number(),
    slug: Type.String(),
    banner: Type.String(),
    title: Type.String(),
    content: Type.String(),
    content_raw: Type.String(),
    category_id: Type.Number(),
    user_id: Type.Number(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'News', additionalProperties: false }
)
export const newsValidator = getValidator(newsSchema, dataValidator)
export const newsResolver = resolve({
  user: virtual(async (data, context) => {
    if (data.user_id)
      return await context.app.service('users').get(data.user_id);
    return null;
  }),
  category: virtual(async (data, context) => {
    if (data.category_id)
      return await context.app.service('categories').get(data.category_id);
    return null;
  })
})

export const newsExternalResolver = resolve({})

// Schema for creating new entries
export const newsDataSchema = Type.Pick(newsSchema, ['title', 'content', 'content_raw', 'category_id'], {
  $id: 'NewsData'
})
export const newsDataValidator = getValidator(newsDataSchema, dataValidator)
export const newsDataResolver = resolve({
  user_id: async (value, data, context) => context.params.user.id,
  slug: async (value, data, context) => slug(data.title)
})

// Schema for updating existing entries
export const newsPatchSchema = Type.Partial(newsSchema, {
  $id: 'NewsPatch'
})
export const newsPatchValidator = getValidator(newsPatchSchema, dataValidator)
export const newsPatchResolver = resolve({})

// Schema for allowed query properties
export const newsQueryProperties = Type.Pick(newsSchema, ['id', 'text'])
export const newsQuerySchema = Type.Intersect(
  [
    querySyntax(newsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const newsQueryValidator = getValidator(newsQuerySchema, queryValidator)
export const newsQueryResolver = resolve({})
