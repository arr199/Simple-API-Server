import express from "express"
import cors from 'cors'
import * as dotenv from "dotenv"
import crypto from 'node:crypto'

dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 8080
const info = [
    {  
        username : "lola" , 
        age : 22
    },
    {  
        username : "peter" , 
        age : 92
    },
    {  
        username : "ana" , 
        age : 16
    },
]




// middleware
app.use(cors())
app.use(express.json())
app.get('/' , ( req , res ) => {

    res.send('Hello There')

} )

app.get('/users' , (req, res) => {
    res.status(201).json(info)
}  )

app.get('/users/:id' , (req, res) => {
    res.status(201).json(info)
}  )


app.post('/users' , (req , res ) => {
    const newUser = {...req.body, id : crypto.randomUUID()} 
    info.push(newUser)
    res.status(201).json(newUser)

})

app.use( (req, res ) => {
    res.status(404).send("<h1>LEAVE ME ALONE , THERE IS NO PAGE HERE</h1>")

  
})

app.listen(PORT, () => {
    console.log(`The server is up on http://localhost:${PORT}`)
    
})

