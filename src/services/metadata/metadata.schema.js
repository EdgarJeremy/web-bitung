// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const metadataSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    value: Type.String(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'Metadata', additionalProperties: false }
)
export const metadataValidator = getValidator(metadataSchema, dataValidator)
export const metadataResolver = resolve({})

export const metadataExternalResolver = resolve({})

// Schema for creating new entries
export const metadataDataSchema = Type.Pick(metadataSchema, ['text'], {
  $id: 'MetadataData'
})
export const metadataDataValidator = getValidator(metadataDataSchema, dataValidator)
export const metadataDataResolver = resolve({})

// Schema for updating existing entries
export const metadataPatchSchema = Type.Partial(metadataSchema, {
  $id: 'MetadataPatch'
})
export const metadataPatchValidator = getValidator(metadataPatchSchema, dataValidator)
export const metadataPatchResolver = resolve({})

// Schema for allowed query properties
export const metadataQueryProperties = Type.Pick(metadataSchema, ['id', 'text'])
export const metadataQuerySchema = Type.Intersect(
  [
    querySyntax(metadataQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const metadataQueryValidator = getValidator(metadataQuerySchema, queryValidator)
export const metadataQueryResolver = resolve({})
