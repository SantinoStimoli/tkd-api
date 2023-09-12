import z from 'zod'

const graduationSchema = z.object({
  graduation: z.string()
})

export function validateGraduation (object) {
  return graduationSchema.safeParse(object)
}

export function validateGraduationModification (object) {
  return graduationSchema.partial().safeParse(object)
}
