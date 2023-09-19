// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const personnelSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    position: Type.String(),
    class: Type.String(),
    rank: Type.String(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'Personnel', additionalProperties: false }
)
export const personnelValidator = getValidator(personnelSchema, dataValidator)
export const personnelResolver = resolve({})

export const personnelExternalResolver = resolve({})

// Schema for creating new entries
export const personnelDataSchema = Type.Pick(personnelSchema, ['name', 'position', 'class', 'rank'], {
  $id: 'PersonnelData'
})
export const personnelDataValidator = getValidator(personnelDataSchema, dataValidator)
export const personnelDataResolver = resolve({})

// Schema for updating existing entries
export const personnelPatchSchema = Type.Partial(personnelSchema, {
  $id: 'PersonnelPatch'
})
export const personnelPatchValidator = getValidator(personnelPatchSchema, dataValidator)
export const personnelPatchResolver = resolve({})

// Schema for allowed query properties
export const personnelQueryProperties = Type.Pick(personnelSchema, ['id', 'name', 'position', 'class', 'rank'])
export const personnelQuerySchema = Type.Intersect(
  [
    querySyntax(personnelQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const personnelQueryValidator = getValidator(personnelQuerySchema, queryValidator)
export const personnelQueryResolver = resolve({})
