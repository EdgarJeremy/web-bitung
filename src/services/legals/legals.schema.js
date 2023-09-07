// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const legalsSchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.String(),
    year: Type.String(),
    number: Type.String(),
    file: Type.String(),

    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'Legals', additionalProperties: false }
)
export const legalsValidator = getValidator(legalsSchema, dataValidator)
export const legalsResolver = resolve({})

export const legalsExternalResolver = resolve({})

// Schema for creating new entries
export const legalsDataSchema = Type.Pick(legalsSchema, ['type', 'year', 'number', 'file'], {
  $id: 'LegalsData'
})
export const legalsDataValidator = getValidator(legalsDataSchema, dataValidator)
export const legalsDataResolver = resolve({})

// Schema for updating existing entries
export const legalsPatchSchema = Type.Partial(legalsSchema, {
  $id: 'LegalsPatch'
})
export const legalsPatchValidator = getValidator(legalsPatchSchema, dataValidator)
export const legalsPatchResolver = resolve({})

// Schema for allowed query properties
export const legalsQueryProperties = Type.Pick(legalsSchema, ['id', 'type', 'year', 'number', 'file'])
export const legalsQuerySchema = Type.Intersect(
  [
    querySyntax(legalsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const legalsQueryValidator = getValidator(legalsQuerySchema, queryValidator)
export const legalsQueryResolver = resolve({})
