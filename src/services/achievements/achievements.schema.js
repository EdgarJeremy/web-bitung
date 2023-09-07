// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const achievementsSchema = Type.Object(
  {
    id: Type.Number(),
    date: Type.String({ format: 'date' }),
    year: Type.String(),
    location: Type.String(),
    level: Type.String(),
    achievement: Type.String(),
    given_by: Type.String(),
    receive_by: Type.String(),
    owner: Type.String(),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' })
  },
  { $id: 'Achievements', additionalProperties: false }
)
export const achievementsValidator = getValidator(achievementsSchema, dataValidator)
export const achievementsResolver = resolve({})

export const achievementsExternalResolver = resolve({})

// Schema for creating new entries
export const achievementsDataSchema = Type.Pick(achievementsSchema, ['date', 'year', 'location', 'level', 'achievement', 'given_by', 'receive_by', 'owner'], {
  $id: 'AchievementsData'
})
export const achievementsDataValidator = getValidator(achievementsDataSchema, dataValidator)
export const achievementsDataResolver = resolve({})

// Schema for updating existing entries
export const achievementsPatchSchema = Type.Partial(achievementsSchema, {
  $id: 'AchievementsPatch'
})
export const achievementsPatchValidator = getValidator(achievementsPatchSchema, dataValidator)
export const achievementsPatchResolver = resolve({})

// Schema for allowed query properties
export const achievementsQueryProperties = Type.Pick(achievementsSchema, ['id', 'date', 'year', 'location', 'level', 'achievement', 'given_by', 'receive_by', 'owner'])
export const achievementsQuerySchema = Type.Intersect(
  [
    querySyntax(achievementsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const achievementsQueryValidator = getValidator(achievementsQuerySchema, queryValidator)
export const achievementsQueryResolver = resolve({})
