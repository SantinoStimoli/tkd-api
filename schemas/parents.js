import z from 'zod'
import { ParentsLinkValues } from '../enums/parentsLink.js'

export const parentSchema = z.object({
  link: z.enum(ParentsLinkValues),
  name: z.string(),
  lastName: z.string().optional(),
  phone: z.number().int().positive()
})

export function validateParent (object) {
  return parentSchema.safeParse(object)
}

export function validateModificationParent (object) {
  return parentSchema.partial().safeParse(object)
}
