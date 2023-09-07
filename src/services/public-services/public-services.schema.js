// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const publicServicesSchema = Type.Object(
  {
    id: Type.Number(),
    image: Type.String(),
    name: Type.String(),
    description: Type.String(),
    link: Type.String(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'PublicServices', additionalProperties: false }
)
export const publicServicesValidator = getValidator(publicServicesSchema, dataValidator)
export const publicServicesResolver = resolve({})

export const publicServicesExternalResolver = resolve({})

// Schema for creating new entries
export const publicServicesDataSchema = Type.Pick(publicServicesSchema, ['image', 'name', 'description', 'link'], {
  $id: 'PublicServicesData'
})
export const publicServicesDataValidator = getValidator(publicServicesDataSchema, dataValidator)
export const publicServicesDataResolver = resolve({})

// Schema for updating existing entries
export const publicServicesPatchSchema = Type.Partial(publicServicesSchema, {
  $id: 'PublicServicesPatch'
})
export const publicServicesPatchValidator = getValidator(publicServicesPatchSchema, dataValidator)
export const publicServicesPatchResolver = resolve({})

// Schema for allowed query properties
export const publicServicesQueryProperties = Type.Pick(publicServicesSchema, ['id', 'image', 'name', 'description', 'link'])
export const publicServicesQuerySchema = Type.Intersect(
  [
    querySyntax(publicServicesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const publicServicesQueryValidator = getValidator(publicServicesQuerySchema, queryValidator)
export const publicServicesQueryResolver = resolve({})
