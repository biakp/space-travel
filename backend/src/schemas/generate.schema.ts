import { z } from "zod"

// Reusable Validators
const trimmedString = (min: number, max: number, field: string) =>
  z.string()
    .min(min, `${field} must be at least ${min} characters`)
    .max(max, `${field} must be less than ${max} characters`)
    .trim()

const fullNameSchema = z.string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
  .trim()

const emailSchema = z.string().email("Invalid email format")
  .trim()
  .toLowerCase()

const passwordSchema = z.string()
  .min(6, "Password must be at least 6 characters long")
  .max(50, "Password must be less than 50 characters")
  .trim()

const visitedDateSchema = z.string().date()

// AI Generation Schema
export const generateSchema = z.object({
  text: trimmedString(1, 500, "Text")
})

// Auth Schemas
export const createUserSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export const loginUserSchema = z.object({
  email: emailSchema,
  password: trimmedString(1, 50, "Password")
})

// Planet Schemas
export const addPlanetSchema = z.object({
  title: trimmedString(1, 100, "Title"),
  story: trimmedString(10, 2000, "Story"),
  visitedPlanet: z.array(z.string().trim())
    .nonempty("At least one visited planet is required")
    .max(10, "Maximum 10 planets allowed"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  visitedDate: visitedDateSchema
})

export const updatePlanetSchema = addPlanetSchema

export const planetParamsSchema = z.object({
  id: trimmedString(1, 24, "Planet ID")
})

export const searchPlanetsSchema = z.object({
  query: trimmedString(1, 100, "Query")
})

export const updateFavoritePlanetSchema = z.object({
  isFavorite: z.boolean()
})

// Type Inference
export type GenerateSchema = z.infer<typeof generateSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type LoginUserSchema = z.infer<typeof loginUserSchema>
export type AddPlanetSchema = z.infer<typeof addPlanetSchema>
export type UpdatePlanetSchema = z.infer<typeof updatePlanetSchema>
export type PlanetParamsSchema = z.infer<typeof planetParamsSchema>
export type SearchPlanetsSchema = z.infer<typeof searchPlanetsSchema>
export type UpdateFavoritePlanetSchema = z.infer<typeof updateFavoritePlanetSchema>
export type VisitedDateSchema = z.infer<typeof visitedDateSchema>