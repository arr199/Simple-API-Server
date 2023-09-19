import z from 'zod'


const emailSchema = z.object({
    message: z.string().maxLength(100)

})

export function validateEmail(object) {
    return emailSchema.safeParseAsync(object)
}