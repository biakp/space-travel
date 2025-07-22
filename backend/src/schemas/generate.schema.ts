import { z } from "zod"

// AI Generation Schema
export const generateSchema = z.object({
  text: z.string().min(1, "Text is required") // Ensure the text field is a non-empty string
})

// Auth Schemas
export const createUserSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required")
})

// Planet Schemas
export const addPlanetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  story: z.string().min(1, "Story is required"),
  visitedPlanet: z.array(z.string()).min(1, "At least one visited planet is required"),
  imageUrl: z.string().url().optional(),
  visitedDate: z.string().min(1, "Visited date is required")
})

export const updatePlanetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  story: z.string().min(1, "Story is required"),
  visitedPlanet: z.array(z.string()).min(1, "At least one visited planet is required"),
  imageUrl: z.string().url().optional(),
  visitedDate: z.string().min(1, "Visited date is required")
})

export const planetParamsSchema = z.object({
  id: z.string().min(1, "Planet ID is required")
})

export const searchPlanetsSchema = z.object({
  query: z.string().min(1, "Query parameter is required"),
})

export const updateFavoritePlanetSchema = z.object({
  isFavorite: z.boolean()
})

// Type exports
export type GenerateSchema = z.infer<typeof generateSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type LoginUserSchema = z.infer<typeof loginUserSchema>
export type AddPlanetSchema = z.infer<typeof addPlanetSchema>
export type UpdatePlanetSchema = z.infer<typeof updatePlanetSchema>
export type PlanetParamsSchema = z.infer<typeof planetParamsSchema>
export type SearchPlanetsSchema = z.infer<typeof searchPlanetsSchema>
export type UpdateFavoritePlanetSchema = z.infer<typeof updateFavoritePlanetSchema>