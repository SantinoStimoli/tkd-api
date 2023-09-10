import z from 'zod'

const studentSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  phone: z.number().int().positive()
})

export function validateStudent (object) {
  return studentSchema.safeParse(object)
}

export function validateModificationStudent (object) {
  return studentSchema.partial().safeParse(object)
}
