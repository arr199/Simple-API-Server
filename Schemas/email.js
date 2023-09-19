import * as z from 'zod'

const emailSchema = z.object({
    message: z.string().maxLength(5)

})

export function validateEmail(object) {
    return emailSchema.safeParseAsync+(object)
}