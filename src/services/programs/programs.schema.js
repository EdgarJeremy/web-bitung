// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const programsSchema = Type.Object(
  {
    id: Type.Number(),
    cover: Type.String(),
    name: Type.String(),
    content: Type.String(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'Programs', additionalProperties: false }
)
export const programsValidator = getValidator(programsSchema, dataValidator)
export const programsResolver = resolve({})

export const programsExternalResolver = resolve({})

// Schema for creating new entries
export const programsDataSchema = Type.Pick(programsSchema, ['cover', 'name', 'content'], {
  $id: 'ProgramsData'
})
export const programsDataValidator = getValidator(programsDataSchema, dataValidator)
export const programsDataResolver = resolve({})

// Schema for updating existing entries
export const programsPatchSchema = Type.Partial(programsSchema, {
  $id: 'ProgramsPatch'
})
export const programsPatchValidator = getValidator(programsPatchSchema, dataValidator)
export const programsPatchResolver = resolve({})

// Schema for allowed query properties
export const programsQueryProperties = Type.Pick(programsSchema, ['id', 'text'])
export const programsQuerySchema = Type.Intersect(
  [
    querySyntax(programsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const programsQueryValidator = getValidator(programsQuerySchema, queryValidator)
export const programsQueryResolver = resolve({})
