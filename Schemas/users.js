import  * as z  from 'zod'

const userSchema = z.object({
    user : z.string(),
    age :  z.number().int().positive().min(1).max(120 , { message : 'int numbers between 1 and 120' }) ,
 

})

export function validateUser (object) {
    return userSchema.safeParseAsync(object)

}