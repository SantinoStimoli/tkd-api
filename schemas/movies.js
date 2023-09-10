const z = require('zod')

const studentSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  phone: z.number().int().positive()
})

function validateStudent (object) {
  return studentSchema.safeParse(object)
}

function validateModificationStudent (object) {
  return studentSchema.partial().safeParse(object)
}

module.exports = {
  validateStudent,
  validateModificationStudent
}
