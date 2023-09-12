import z from 'zod'
import { Graduations, GraduationsValues } from '../enums/graduations.js'
import { parentSchema } from './parents.js'

const studentSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  phone: z.number().int().positive().optional(),
  graduation: z.enum(GraduationsValues).default(Graduations.WHITE),
  parents: z.union([z.array(parentSchema), z.undefined()]).default(undefined),
  birthday: z.string(), // Cambiar a date
  startDate: z.string(), // Cambiar a date
  isActive: z.boolean().default(true)
})

export function validateStudent (object) {
  return studentSchema.safeParse(object)
}

export function validateStudentModification (object) {
  return studentSchema.partial().safeParse(object)
}

// !IMPORTANTE HACER TODAS LAS VALIDACIONES POR CANTIDADES DE CARACTERES
