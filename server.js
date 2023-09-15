import express from "express"
import cors from 'cors'
import * as dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.SERVER_PORT ?? 8080
app.use(cors())
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
        age : 16123
    },
  
]

// middleware
app.use(express.json())
app.get('/' , ( req , res ) => {
    res.send('Hello There')

} )
app.get('/api/v1/prompt' , (req, res) => {

    res.status(201).json(info)
}  )

app.use( (req, res ) => {
    res.status(404).send("<h1>LEAVE ME ALONE , THERE IS NO PAGE HERE</h1>")
})

app.listen(PORT, () => {
    console.log(`The server is up on http://localhost:${PORT}`)

})

