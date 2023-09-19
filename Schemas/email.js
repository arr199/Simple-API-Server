import * as z from 'zod'

const emailSchema = z.object({
    message: z.string().max(100)

})

export function validateEmail(object) {
   //returns an object with a data key that have our validated object
    return emailSchema.safeParse(object)
}