import express from "express"
import cors from 'cors'
import * as dotenv from "dotenv"
import { usersRouter } from "./Routes/users.js"
import { emailRouter } from "./Routes/email.js"
import { rootRouter } from "./Routes/root.js"
import { codyRouter } from "./Routes/cody.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 8080

export let info = [
    {  
        username : "lola" , 
        age : 22 ,
        id: "9122e387-39eb-4159-bbdc-4bc2f21899e2"
    },
    {  
        username : "peter" , 
        age : 92,
        id: "1122e387-12fb-4168-aadc-4bc2f66669e2"
    },
    {  
        username : "ana" , 
        age : 16,
        id: "80412e387-39cb-1209-aadc-4bc2f99999e2"
    },
]

// MIDDLEWARE

app.use(cors())
app.use(express.json())

/////   ROUTES   //////

app.use('/' , rootRouter )
app.use('/users' , usersRouter)
app.use('/email' , emailRouter)
app.use("/cody" , codyRouter)

// ERROR HANDLING
app.use( (req, res ) => {
    res.status(404).send("<h1>LEAVE ME ALONE! , THERE IS NOTHING HERE</h1>")
})

// START SERVER
app.listen(PORT, () => {
    console.log(`The server is up on ${process.env.PUBLIC_SERVER_URL}`)
    
})


