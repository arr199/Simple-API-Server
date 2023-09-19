import * as z from 'zod'

const emailSchema = z.object({
    message: z.string().max(5)

})

export function validateEmail(object) {
    return emailSchema.safeParse(object)
}