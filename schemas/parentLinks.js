import z from 'zod'

const parentLinkSchema = z.object({
  link: z.string()
})

export function validateParentLink (object) {
  return parentLinkSchema.safeParse(object)
}

export function validateParentLinkModification (object) {
  return parentLinkSchema.partial().safeParse(object)
}
