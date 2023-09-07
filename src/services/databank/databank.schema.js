// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const databankSchema = Type.Object(
  {
    id: Type.Number(),
    date: Type.String({ format: 'date' }),
    name: Type.String(),
    source: Type.String(),
    description: Type.String(),
    link: Type.String(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'Databank', additionalProperties: false }
)
export const databankValidator = getValidator(databankSchema, dataValidator)
export const databankResolver = resolve({})

export const databankExternalResolver = resolve({})

// Schema for creating new entries
export const databankDataSchema = Type.Pick(databankSchema, ['date', 'name', 'source', 'description', 'link'], {
  $id: 'DatabankData'
})
export const databankDataValidator = getValidator(databankDataSchema, dataValidator)
export const databankDataResolver = resolve({})

// Schema for updating existing entries
export const databankPatchSchema = Type.Partial(databankSchema, {
  $id: 'DatabankPatch'
})
export const databankPatchValidator = getValidator(databankPatchSchema, dataValidator)
export const databankPatchResolver = resolve({})

// Schema for allowed query properties
export const databankQueryProperties = Type.Pick(databankSchema, ['id', 'date', 'name', 'source', 'description', 'link'])
export const databankQuerySchema = Type.Intersect(
  [
    querySyntax(databankQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const databankQueryValidator = getValidator(databankQuerySchema, queryValidator)
export const databankQueryResolver = resolve({})
