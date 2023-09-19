import z  from 'zod'

const userSchema = z.object({
    user : z.string().maxLength(3),
    age :  z.number().int().positive().min(1).max(120 , { message : 'int numbers between 1 and 120' }) ,
 

})

export function validateUser (object) {
    return userSchema.safeParse(object)

}